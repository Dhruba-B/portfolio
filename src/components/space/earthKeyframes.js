// Where the planet sits when each "act" of the hero is centred in the viewport.
// One keyframe per <section data-earth-act> inside the hero, in DOM order.
//
//  x, y  -> planet centre as a fraction of the viewport (x: -0.5 left … 0.5 right,
//           y: -0.5 bottom … 0.5 top)
//  s     -> planet diameter as a multiple of viewport height
//  rotY  -> spin (radians) – scrolling "turns" the globe to a new continent
//  rotX  -> tilt towards the camera (radians)
//
// Between two acts the values are eased, then damped in the render loop, which is
// what gives the "drifting" feel from the reference video.
export const EARTH_KEYFRAMES = [
    // Act 0 – intro: huge planet rising from the bottom-left
    { x: -0.2, y: -0.4, s: 1.35, rotY: 0.2, rotX: 0.38 },
    // Act 1 – "what I build": still big, slides left behind the card grid
    { x: -0.3, y: -0.18, s: 1.45, rotY: 1.1, rotX: 0.3 },
    // Act 2 – featured/impact: shrinks and moves to the middle-right
    { x: 0.14, y: -0.05, s: 0.85, rotY: 2.0, rotX: 0.18 },
    // Act 3 – CTA: settles low on the right
    { x: 0.3, y: -0.3, s: 1.0, rotY: 2.9, rotX: 0.3 },
];