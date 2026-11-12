import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { createEarthScene } from "./createEarthScene";
import { EARTH_KEYFRAMES } from "./earthKeyframes";

const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;
const KEYS = ["x", "y", "s", "rotY", "rotX"];

/**
 * Sticky, full-viewport WebGL Earth.
 *
 * Must be the FIRST child of the hero zone (`zoneRef`), and the zone must contain
 * one `[data-earth-act]` element per keyframe. The planet's pose is interpolated
 * between keyframes based on which act is nearest the viewport centre, so it keeps
 * working however tall each act is — and with Lenis, since it only reads layout.
 */
export default function EarthBackdrop({ zoneRef, keyframes = EARTH_KEYFRAMES, texturePath = "/textures/earth" }) {
    const canvasRef = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const zone = zoneRef.current;
        if (!canvas || !zone) return undefined;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const signal = { cancelled: false };
        let raf = 0;
        let api = null;
        let ro = null;
        const cur = { ...keyframes[0] };
        let first = true;

        // 0 … keyframes.length-1, fractional between acts
        const getActFloat = () => {
            const acts = zone.querySelectorAll("[data-earth-act]");
            const vc = window.innerHeight / 2;
            let prevCenter = null;
            for (let i = 0; i < acts.length; i++) {
                const r = acts[i].getBoundingClientRect();
                const c = r.top + r.height / 2;
                if (vc < c) {
                    if (i === 0) return 0;
                    return i - 1 + smooth((vc - prevCenter) / (c - prevCenter));
                }
                prevCenter = c;
            }
            return Math.max(acts.length - 1, 0);
        };

        createEarthScene({ canvas, texturePath, reducedMotion, signal })
            .then((scene) => {
                if (!scene) return;
                if (signal.cancelled) {
                    scene.dispose();
                    return;
                }
                api = scene;
                const box = canvas.parentElement;
                const onResize = () => api.resize(box.clientWidth, box.clientHeight);
                onResize();
                ro = new ResizeObserver(onResize);
                ro.observe(box);
                setReady(true);
                console.info("[EarthBackdrop] scene ready");

                let last = performance.now();
                const t0 = last;

                const tick = (now) => {
                    raf = requestAnimationFrame(tick);
                    const dt = Math.min((now - last) / 1000, 0.05);
                    last = now;

                    // skip all work while the hero is off-screen
                    const rect = zone.getBoundingClientRect();
                    if (rect.bottom < -50 || rect.top > window.innerHeight + 50) return;

                    const act = Math.min(getActFloat(), keyframes.length - 1);
                    const i = Math.min(Math.floor(act), keyframes.length - 2);
                    const f = keyframes.length > 1 ? act - i : 0;
                    const a = keyframes[i];
                    const b = keyframes[Math.min(i + 1, keyframes.length - 1)];

                    // damping = the lazy, floaty follow
                    const k = first || reducedMotion ? 1 : 1 - Math.exp(-dt * 4.5);
                    first = false;
                    for (const key of KEYS) cur[key] += (lerp(a[key], b[key], f) - cur[key]) * k;

                    api.update(cur, (now - t0) / 1000, act / Math.max(keyframes.length - 1, 1));
                };
                raf = requestAnimationFrame(tick);
            })
            .catch((err) => {
                // No WebGL / texture 404: the hero's CSS gradient fallback stays visible.
                console.warn("[EarthBackdrop] disabled:", err);
            });

        return () => {
            signal.cancelled = true;
            cancelAnimationFrame(raf);
            ro?.disconnect();
            api?.dispose();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoneRef, texturePath]);

    return (
        <Box
            aria-hidden
            sx={{
                position: "sticky",
                top: 0,
                height: "100vh",
                marginBottom: "-100vh", // content flows over this layer
                zIndex: 0,
                pointerEvents: "none",
                "@supports (height: 100dvh)": { height: "100dvh", marginBottom: "-100dvh" },
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    opacity: ready ? 1 : 0,
                    transition: "opacity 1400ms ease",
                }}
            />
        </Box>
    );
}