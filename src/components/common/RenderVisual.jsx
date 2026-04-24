import { motion, useAnimationFrame } from "framer-motion";
import { useState } from "react";

/* ─────────────────────────────────────────────
   SYSTEM CORE
   ───────────────────────────────────────────── */
export function renderSystemCore({ hue1 = 220 } = {}) {
    const dots = [
        { bg: `hsl(${hue1},70%,72%)`, scanDelay: 0 },
        { bg: `hsl(${hue1},65%,62%)`, scanDelay: 0.45 },
        { bg: `hsl(${hue1},60%,55%)`, scanDelay: 0.9, blink: true },
        { bg: `hsl(${hue1},72%,78%)`, scanDelay: 1.35 },
    ];

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 5 }}>
                {dots.map((d, i) => (
                    <motion.div
                        key={i}
                        animate={d.blink ? { opacity: [1, 0.2, 1] } : {}}
                        transition={d.blink ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
                        style={{
                            width: 24, height: 24, borderRadius: 5,
                            background: d.bg, position: "relative", overflow: "hidden",
                        }}
                    >
                        <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(135deg,rgba(255,255,255,.22) 0%,transparent 60%)",
                            borderRadius: "inherit", pointerEvents: "none",
                        }} />
                        <motion.div
                            animate={{ y: [0, 44] }}
                            transition={{
                                duration: 1.8, delay: d.scanDelay,
                                repeat: Infinity, ease: "easeInOut", repeatType: "loop",
                            }}
                            style={{
                                position: "absolute", left: 0, right: 0,
                                height: 2, background: "rgba(255,255,255,.38)", top: 0,
                            }}
                        />
                    </motion.div>
                ))}
            </div>
            <motion.div
                animate={{ opacity: [1, 0.25, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: "absolute", bottom: -2, right: -2,
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#4ade80", boxShadow: "0 0 5px rgba(74,222,128,.7)",
                }}
            />
        </div>
    );
}

/* ─────────────────────────────────────────────
   MOBILE CORE
   ───────────────────────────────────────────── */
export function renderMobileCore({ hue1 = 200 } = {}) {
    const bars = [
        { y: 16, w: 24, h: 6, l: 70, delay: 0, dur: 3.5 },
        { y: 26, w: 18, h: 5, l: 58, delay: 0.6, dur: 4.2 },
        { y: 35, w: 20, h: 5, l: 48, delay: 1.1, dur: 3.8 },
    ];

    return (
        <svg width="44" height="68" viewBox="0 0 44 68" style={{ overflow: "visible" }}>
            <rect x="4" y="2" width="36" height="64" rx="7"
                fill="var(--bg2,#f5f5f5)" opacity=".5"
                stroke="var(--b,#ccc)" strokeWidth="1.2" />
            <rect x="4" y="2" width="36" height="64" rx="7"
                fill="none" stroke="var(--b,#ccc)" strokeWidth="1.2" />
            <rect x="15" y="5" width="14" height="3" rx="1.5" fill="var(--b,#bbb)" />
            {bars.map((bar, i) => (
                <motion.rect
                    key={i}
                    x="10" y={bar.y} width={bar.w} height={bar.h} rx="2"
                    fill={`hsl(${hue1},70%,${bar.l}%)`}
                    animate={{ opacity: [1, 0.15, 1] }}
                    transition={{ duration: bar.dur, delay: bar.delay, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}
            <motion.rect x="10" y="46" width="10" height="10" rx="2"
                fill={`hsl(${hue1},55%,75%)`}
                animate={{ opacity: [0.6, 0.25, 0.6] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.rect x="23" y="46" width="10" height="10" rx="2"
                fill={`hsl(${hue1},70%,65%)`}
                animate={{ opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 3.2, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <rect x="16" y="59" width="12" height="3" rx="1.5" fill="var(--b,#bbb)" />
        </svg>
    );
}

/* ─────────────────────────────────────────────
   AI CORE
   ───────────────────────────────────────────── */
export function renderAICore({ hue1 = 270 } = {}) {
    return (
        <div style={{ position: "relative", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[0, 0.75].map((delay, i) => (
                <motion.div
                    key={i}
                    animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                    transition={{ duration: 2.2, delay, repeat: Infinity, ease: "easeOut" }}
                    style={{
                        position: "absolute", width: 28, height: 28, borderRadius: "50%",
                        border: `1.5px solid hsl(${hue1},80%,72%)`,
                    }}
                />
            ))}
            {[
                { hueOffset: +15, initialRotate: 0, opacity: 1 },
                { hueOffset: -15, initialRotate: 180, opacity: 0.65 },
            ].map((s, i) => (
                <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", width: "100%", height: "100%", rotate: s.initialRotate }}
                >
                    <div style={{
                        position: "absolute", top: "50%", left: "50%",
                        transform: "translateX(14px) translateY(-50%)",
                        width: 6, height: 6, borderRadius: "50%",
                        background: `hsl(${hue1 + s.hueOffset},80%,78%)`,
                        opacity: s.opacity,
                    }} />
                </motion.div>
            ))}
            <motion.div
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: `hsl(${hue1},85%,72%)`,
                    boxShadow: `0 0 18px hsl(${hue1},80%,60%)`,
                    position: "relative", zIndex: 1,
                }}
            >
                <div style={{
                    position: "absolute", top: 5, left: 7, width: 9, height: 6,
                    borderRadius: "50%", background: "rgba(255,255,255,.45)", transform: "rotate(-30deg)",
                }} />
            </motion.div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   DATA CORE
   Hooks live inside DataCoreInner — a real component
   that is always mounted in the same position in the
   tree, so the hook count never varies.
   ───────────────────────────────────────────── */
function DataCoreInner({ hue1 }) {
    const [offset, setOffset] = useState(0);

    useAnimationFrame((t) => {
        setOffset(-(t / 50) % 8);
    });

    const bars = [
        { x: 6, h: 22, l: 62, floatY: 9, dur: 2.4, delay: 0 },
        { x: 20, h: 34, l: 52, floatY: 7, dur: 3.0, delay: 0 },
        { x: 34, h: 14, l: 70, floatY: 11, dur: 2.0, delay: 0 },
        { x: 48, h: 28, l: 58, floatY: 9, dur: 2.7, delay: 0.3 },
    ];

    const anchorDots = [
        { cx: 11, cy: 28, r: 2.5, l: 52 },
        { cx: 39, cy: 36, r: 2, l: 70 },
        { cx: 58, cy: 20, r: 2, l: 58 },
    ];

    return (
        <svg width="64" height="64" viewBox="0 0 64 64" style={{ overflow: "visible" }}>
            {bars.map((bar, i) => (
                <rect key={`tick-${i}`} x={bar.x} y="52" width="10" height="2" rx="1"
                    fill="var(--b,#ccc)" opacity=".4" />
            ))}
            {bars.map((bar, i) => (
                <motion.rect
                    key={`bar-${i}`}
                    x={bar.x} width="10" rx="3"
                    fill={`hsl(${hue1},70%,${bar.l}%)`}
                    animate={{
                        y: [52 - bar.h, 52 - bar.h - bar.floatY, 52 - bar.h],
                        height: [bar.h, bar.h + bar.floatY, bar.h],
                    }}
                    transition={{ duration: bar.dur, delay: bar.delay, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}
            <path
                d="M11 28 Q25 14 39 36 T58 20"
                fill="none"
                stroke={`hsl(${hue1},70%,62%)`}
                strokeWidth="1.5"
                strokeDasharray="5 3"
                strokeDashoffset={offset}
                strokeLinecap="round"
                opacity=".55"
            />
            {anchorDots.map((d, i) => (
                <motion.circle
                    key={i}
                    cx={d.cx} cy={d.cy} r={d.r}
                    fill={`hsl(${hue1},75%,${d.l}%)`}
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.55, 1] }}
                    transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: `${d.cx}px ${d.cy}px` }}
                />
            ))}
        </svg>
    );
}

// Thin wrapper — call this exactly like the other renderers
export function renderDataCore({ hue1 = 160 } = {}) {
    return <DataCoreInner hue1={hue1} />;
}

/* ─────────────────────────────────────────────
   INFRA CORE
   Server rack with 3 units, activity LEDs, drive
   bays, and a live traffic bar-graph at the bottom.
   Hooks live in InfraCoreInner for rules-of-hooks safety.
   ───────────────────────────────────────────── */
function InfraCoreInner({ hue1 }) {
    const [trafficOffset, setTrafficOffset] = useState(0);

    useAnimationFrame((t) => {
        setTrafficOffset(-(t / 60) % 10);
    });

    // Three server units: y position, LED color, blink timing
    const units = [
        { y: 6, ledHue: 130, ledDelay: 0, ledDur: 2.2, bayBlink: false },
        { y: 24, ledHue: hue1, ledDelay: 0.5, ledDur: 1.8, bayBlink: true },
        { y: 42, ledHue: 130, ledDelay: 1.1, ledDur: 2.6, bayBlink: false },
    ];

    // Traffic bars inside the bottom unit
    const trafficBars = [
        { x: 12, h: 7, delay: 0, dur: 1.1 },
        { x: 17, h: 4, delay: 0.2, dur: 1.4 },
        { x: 22, h: 9, delay: 0.1, dur: 0.9 },
        { x: 27, h: 5, delay: 0.3, dur: 1.3 },
        { x: 32, h: 8, delay: 0, dur: 1.0 },
        { x: 37, h: 3, delay: 0.4, dur: 1.6 },
    ];

    return (
        <svg width="58" height="64" viewBox="0 0 58 64" style={{ overflow: "visible" }}>
            {/* rack enclosure */}
            <rect x="2" y="2" width="54" height="60" rx="5"
                fill="var(--bg2,#f0f0f0)" stroke="var(--b,#ccc)" strokeWidth="1" />
            {/* rack rails — subtle vertical lines */}
            <line x1="6" y1="2" x2="6" y2="62" stroke="var(--b,#ccc)" strokeWidth=".5" opacity=".4" />
            <line x1="52" y1="2" x2="52" y2="62" stroke="var(--b,#ccc)" strokeWidth=".5" opacity=".4" />

            {/* server unit 1 & 2 — drive bays + LED + port */}
            {units.slice(0, 2).map((u, i) => (
                <g key={i}>
                    <rect x="6" y={u.y} width="46" height="16" rx="2"
                        fill="var(--color-background-primary,#fff)"
                        stroke="var(--b,#ccc)" strokeWidth=".5" />
                    {/* three drive bays */}
                    {[0, 1, 2].map((j) => (
                        <motion.rect
                            key={j}
                            x={10 + j * 8} y={u.y + 4} width="6" height="8" rx="1"
                            fill={`hsl(${hue1},${70 - j * 5}%,${65 - j * 5}%)`}
                            animate={u.bayBlink && j === 1 ? { opacity: [1, 0.2, 1] } : { opacity: 1 }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    ))}
                    {/* activity LED */}
                    <motion.circle
                        cx={46} cy={u.y + 8} r={2.5}
                        fill={`hsl(${u.ledHue},70%,58%)`}
                        animate={{ opacity: [1, 0.15, 1], scale: [1, 1.2, 1] }}
                        transition={{ duration: u.ledDur, delay: u.ledDelay, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transformOrigin: `46px ${u.y + 8}px` }}
                    />
                    {/* ethernet port */}
                    <rect x="49" y={u.y + 5} width="4" height="6" rx="1"
                        fill="var(--b,#bbb)" opacity=".6" />
                </g>
            ))}

            {/* server unit 3 — live traffic bars */}
            <rect x="6" y={42} width="46" height="16" rx="2"
                fill="var(--color-background-primary,#fff)"
                stroke="var(--b,#ccc)" strokeWidth=".5" />
            {trafficBars.map((bar, i) => (
                <motion.rect
                    key={i}
                    x={bar.x} rx="1" width="3"
                    fill={`hsl(${hue1},75%,${58 + i * 2}%)`}
                    animate={{
                        y: [42 + 16 - bar.h - 3, 42 + 16 - bar.h - 3 - 3, 42 + 16 - bar.h - 3],
                        height: [bar.h, bar.h + 3, bar.h],
                    }}
                    transition={{ duration: bar.dur, delay: bar.delay, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}
            {/* streaming data line across traffic unit */}
            <path
                d={`M6 50 Q20 44 34 52 T52 46`}
                fill="none"
                stroke={`hsl(${hue1},70%,62%)`}
                strokeWidth="1"
                strokeDasharray="4 3"
                strokeDashoffset={trafficOffset}
                strokeLinecap="round"
                opacity=".45"
            />
        </svg>
    );
}

export function renderInfraCore({ hue1 = 28 } = {}) {
    return <InfraCoreInner hue1={hue1} />;
}

/* ─────────────────────────────────────────────
   HEALTH CORE
   Heartbeat ECG line + pulsing heart shape +
   animated vitals readout (BPM / SPO2 bars).
   Hooks live in HealthCoreInner for rules-of-hooks safety.
   ───────────────────────────────────────────── */
function HealthCoreInner({ hue1 }) {
    const [ecgOffset, setEcgOffset] = useState(0);

    useAnimationFrame((t) => {
        setEcgOffset(-(t / 40) % 60);
    });

    // Vitals mini-bars (SPO2, temp, resp rate)
    const vitalBars = [
        { h: 14, delay: 0, dur: 2.0 },
        { h: 20, delay: 0.3, dur: 2.4 },
        { h: 10, delay: 0.6, dur: 1.8 },
        { h: 17, delay: 0.2, dur: 2.2 },
    ];

    return (
        <svg width="64" height="64" viewBox="0 0 64 64" style={{ overflow: "visible" }}>
            {/* ── heart shape ── */}
            <motion.path
                d="M32 52 C18 40 8 32 8 22 C8 14 14 9 20 9 C24 9 28 11 32 15 C36 11 40 9 44 9 C50 9 56 14 56 22 C56 32 46 40 32 52Z"
                fill={`hsl(${hue1},70%,72%)`}
                opacity=".18"
                animate={{ scale: [1, 1.08, 1, 1.05, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "32px 30px" }}
            />
            {/* heart outline */}
            <motion.path
                d="M32 52 C18 40 8 32 8 22 C8 14 14 9 20 9 C24 9 28 11 32 15 C36 11 40 9 44 9 C50 9 56 14 56 22 C56 32 46 40 32 52Z"
                fill="none"
                stroke={`hsl(${hue1},70%,58%)`}
                strokeWidth="1.5"
                animate={{ scale: [1, 1.08, 1, 1.05, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "32px 30px" }}
            />

            {/* ── ECG line across the heart ── */}
            {/* background clip rect to keep line inside heart bounds */}
            <clipPath id="hlt-clip">
                <rect x="6" y="8" width="52" height="46" />
            </clipPath>
            <path
                clipPath="url(#hlt-clip)"
                d="M0 30 L10 30 L14 30 L16 22 L18 38 L20 30 L26 30 L30 30 L32 18 L34 42 L36 30 L42 30 L46 30 L48 24 L50 36 L52 30 L64 30"
                fill="none"
                stroke={`hsl(${hue1},80%,52%)`}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="60 200"
                strokeDashoffset={ecgOffset}
                opacity=".85"
            />

            {/* ── vitals mini-bars at bottom ── */}
            {vitalBars.map((bar, i) => (
                <motion.rect
                    key={i}
                    x={12 + i * 12} rx="2" width="7"
                    fill={`hsl(${hue1},65%,${60 + i * 4}%)`}
                    animate={{
                        y: [58 - bar.h, 58 - bar.h - 4, 58 - bar.h],
                        height: [bar.h, bar.h + 4, bar.h],
                    }}
                    transition={{ duration: bar.dur, delay: bar.delay, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}
        </svg>
    );
}

export function renderHealthCore({ hue1 = 350 } = {}) {
    return <HealthCoreInner hue1={hue1} />;
}

/* ─────────────────────────────────────────────
   DEFAULT CORE
   ───────────────────────────────────────────── */
export function renderDefaultCore({ Icon, hue1 = 260 } = {}) {
    if (Icon) {
        return (
            <Icon
                sx={{
                    fontSize: 34,
                    color: `hsl(${hue1}, 85%, 85%)`,
                    filter: `drop-shadow(0 0 8px hsl(${hue1}, 85%, 65%))`,
                }}
            />
        );
    }

    const codeLines = [
        { x: 9, y: 29, w: 8, hue: hue1, delay: 0, dur: 4.0 },
        { x: 20, y: 29, w: 20, hue: hue1 - 60, delay: 0.5, dur: 3.5 },
        { x: 9, y: 36, w: 14, hue: hue1 - 100, delay: 1.0, dur: 4.5 },
        { x: 26, y: 36, w: 10, hue: hue1, delay: 1.5, dur: 3.8 },
    ];

    return (
        <svg width="56" height="56" viewBox="0 0 56 56">
            <rect x="2" y="8" width="52" height="40" rx="7"
                fill="var(--bg2,#f5f5f5)" stroke="var(--b,#ccc)" strokeWidth="1" />
            <rect x="2" y="8" width="52" height="14" rx="7" fill="var(--b,#ccc)" opacity=".5" />
            <rect x="2" y="15" width="52" height="7" fill="var(--b,#ccc)" opacity=".5" />
            <circle cx="11" cy="15" r="2.5" fill="hsl(0,70%,70%)" />
            <circle cx="19" cy="15" r="2.5" fill="hsl(40,80%,68%)" />
            <circle cx="27" cy="15" r="2.5" fill="hsl(130,65%,62%)" />
            {codeLines.map((line, i) => (
                <motion.rect
                    key={i}
                    x={line.x} y={line.y} width={line.w} height="3" rx="1.5"
                    fill={`hsl(${line.hue},70%,72%)`}
                    animate={{ opacity: [1, 0.15, 1] }}
                    transition={{ duration: line.dur, delay: line.delay, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}
            <motion.rect
                x="40" y="36" width="5" height="3" rx="1"
                fill="var(--s,#888)"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "steps(1,end)" }}
            />
        </svg>
    );
}

/* ─────────────────────────────────────────────
   PREVIEW — all five cores side by side
   ───────────────────────────────────────────── */
export default function CoreRenderersPreview() {
    const cards = [
        { label: "System", sub: "4 cores active", node: renderSystemCore({ hue1: 220 }) },
        { label: "Mobile", sub: "iOS · Android", node: renderMobileCore({ hue1: 200 }) },
        { label: "AI", sub: "Neural · active", node: renderAICore({ hue1: 270 }) },
        { label: "Data", sub: "Live · streaming", node: renderDataCore({ hue1: 160 }) },
        { label: "Infra", sub: "3 units · online", node: renderInfraCore({ hue1: 28 }) },
        { label: "Health", sub: "Vitals · nominal", node: renderHealthCore({ hue1: 350 }) },
        { label: "Default", sub: "Icon · fallback", node: renderDefaultCore({ hue1: 260 }) },
    ];

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
            gap: 12, padding: "16px 0",
        }}>
            {cards.map((card, i) => (
                <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
                    whileHover={{ y: -3, transition: { duration: 0.18 } }}
                    style={{
                        background: "var(--color-background-primary,#fff)",
                        border: "0.5px solid var(--color-border-tertiary,#ddd)",
                        borderRadius: 12, padding: 20,
                        display: "flex", flexDirection: "column", alignItems: "center",
                        gap: 14, cursor: "default",
                    }}
                >
                    <div style={{
                        width: 72, height: 72,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        position: "relative",
                    }}>
                        {card.node}
                    </div>
                    <span style={{
                        fontSize: 12, fontWeight: 500,
                        color: "var(--color-text-secondary,#888)",
                        letterSpacing: ".04em", textTransform: "uppercase",
                    }}>
                        {card.label}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--color-text-tertiary,#aaa)", marginTop: -10 }}>
                        {card.sub}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}