import * as THREE from "three";

const FOV = 30;
const CAM_Z = 6;
const SUN_DIR = new THREE.Vector3(-1, 0.35, 0.25).normalize();

/* ------------------------------------------------------------------ shaders */

const earthVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vUv = uv;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vPosW = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

// Day texture on the lit side, city lights on the dark side, blue rim light.
const earthFrag = /* glsl */ `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform vec3 sunDir;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vec3 n = normalize(vNormalW);
    vec3 v = normalize(cameraPosition - vPosW);
    float ndl = dot(n, normalize(sunDir));
    float dayAmt = smoothstep(-0.12, 0.28, ndl);

    vec3 day = texture2D(dayMap, vUv).rgb;
    vec3 night = texture2D(nightMap, vUv).rgb;
    // mip-biased sample = cheap blur, used as a soft glow around each city
    vec3 glow = texture2D(nightMap, vUv, 3.5).rgb;

    // darker day side
    vec3 dayCol = day * (0.07 + 0.62 * max(ndl, 0.0));

    // city lights: strong, warm, and allowed to creep slightly past the terminator
    float lightMask = 1.0 - smoothstep(-0.02, 0.30, ndl);
    vec3 lights = (night * 2.8 + glow * 2.4) * vec3(1.0, 0.76, 0.45) * lightMask;

    vec3 col = dayCol * dayAmt + day * 0.035 * (1.0 - dayAmt) + lights;

    float rim = pow(1.0 - max(dot(n, v), 0.0), 3.0);
    col += vec3(0.25, 0.5, 1.0) * rim * (0.18 + 0.4 * smoothstep(-0.3, 0.5, ndl));

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

const cloudFrag = /* glsl */ `
  uniform sampler2D cloudMap;
  uniform vec3 sunDir;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    float a = texture2D(cloudMap, vUv).a;
    float ndl = dot(normalize(vNormalW), normalize(sunDir));
    float light = 0.04 + 1.0 * smoothstep(-0.1, 0.5, ndl);
    gl_FragColor = vec4(vec3(light), a * 0.75);
    #include <colorspace_fragment>
  }
`;

const atmoVert = /* glsl */ `
  varying vec3 vN;
  void main() {
    vN = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmoFrag = /* glsl */ `
  varying vec3 vN;
  void main() {
    // back faces: -dot is 0 at the outer rim and grows toward the planet limb,
    // so the glow fades smoothly to nothing at the edge.
    float i = pow(clamp(-dot(vN, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 1.5) * 2.2;
    gl_FragColor = vec4(0.30, 0.58, 1.0, clamp(i, 0.0, 0.9));
  }
`;

/* ------------------------------------------------------------------ helpers */

function makeStars(count = 1600) {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = 35 + Math.random() * 25;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    // soft round sprite so stars aren't squares
    const c = document.createElement("canvas");
    c.width = c.height = 32;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(200,220,255,0.6)");
    grad.addColorStop(1, "rgba(200,220,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 32, 32);

    const mat = new THREE.PointsMaterial({
        size: 0.22,
        map: new THREE.CanvasTexture(c),
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        sizeAttenuation: true,
    });
    return new THREE.Points(geo, mat);
}

/* -------------------------------------------------------------------- scene */

/**
 * Builds the Earth scene on an existing <canvas>.
 * Resolves with { resize, update, dispose } once textures have loaded.
 */
export async function createEarthScene({ canvas, texturePath = "/textures/earth", reducedMotion = false, signal }) {
    // Load textures first so an aborted (StrictMode / unmounted) run never touches the canvas.
    const loader = new THREE.TextureLoader();
    const load = async (file) => {
        const t = await loader.loadAsync(`${texturePath}/${file}`);
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8; // three clamps this to what the GPU supports
        return t;
    };
    const [dayMap, nightMap, cloudMap] = await Promise.all([
        load("earth_atmos_2048.jpg"),
        load("earth_lights_2048.png"),
        load("earth_clouds_1024.png"),
    ]);
    if (signal?.cancelled) {
        [dayMap, nightMap, cloudMap].forEach((t) => t.dispose());
        return null;
    }

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);
    camera.position.set(0, 0, CAM_Z);

    // root (position/scale) -> tilt (rotX) -> spin (rotY) -> earth + clouds
    const root = new THREE.Group();
    const tilt = new THREE.Group();
    const spin = new THREE.Group();
    root.add(tilt);
    tilt.add(spin);
    scene.add(root);

    const earth = new THREE.Mesh(
        new THREE.SphereGeometry(1, 96, 96),
        new THREE.ShaderMaterial({
            vertexShader: earthVert,
            fragmentShader: earthFrag,
            uniforms: { dayMap: { value: dayMap }, nightMap: { value: nightMap }, sunDir: { value: SUN_DIR } },
        })
    );
    spin.add(earth);

    const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(1.012, 96, 96),
        new THREE.ShaderMaterial({
            vertexShader: earthVert,
            fragmentShader: cloudFrag,
            transparent: true,
            depthWrite: false,
            uniforms: { cloudMap: { value: cloudMap }, sunDir: { value: SUN_DIR } },
        })
    );
    spin.add(clouds);

    const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.06, 64, 64),
        new THREE.ShaderMaterial({
            vertexShader: atmoVert,
            fragmentShader: atmoFrag,
            side: THREE.BackSide,
            transparent: true,
            depthWrite: false,
        })
    );
    root.add(atmosphere);

    const stars = makeStars();
    scene.add(stars);

    let width = 1;
    let height = 1;

    function resize(w, h) {
        width = Math.max(w, 1);
        height = Math.max(h, 1);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    /** state = { x, y, s, rotY, rotX }, time in seconds, progress 0..1 across the acts */
    function update(state, time, progress = 0) {
        const aspect = width / height;
        const visH = 2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAM_Z;
        const visW = visH * aspect;
        // On portrait screens size the planet off the width and soften sideways travel.
        const base = aspect >= 1 ? visH : visW * 1.15;
        const xk = aspect >= 1 ? 1 : 0.4;

        root.position.set(state.x * visW * xk, state.y * visH, 0);
        root.scale.setScalar((state.s * base) / 2);
        tilt.rotation.x = state.rotX;
        tilt.rotation.z = 0.25;
        spin.rotation.y = state.rotY + (reducedMotion ? 0 : time * 0.03);
        clouds.rotation.y = reducedMotion ? 0 : time * 0.008;
        stars.rotation.y = progress * 0.35;
        stars.rotation.x = progress * 0.12;

        renderer.render(scene, camera);
    }

    function dispose() {
        scene.traverse((o) => {
            if (o.geometry) o.geometry.dispose();
            if (o.material) {
                if (o.material.map) o.material.map.dispose();
                o.material.dispose();
            }
        });
        [dayMap, nightMap, cloudMap].forEach((t) => t.dispose());
        renderer.dispose();
    }

    return { resize, update, dispose };
}