import { Box, Typography, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { renderAICore, renderDataCore, renderDefaultCore, renderHealthCore, renderInfraCore, renderMobileCore, renderSystemCore } from "../common/RenderVisual";

// ─── Constellation helpers ────────────────────────────────────────────────────
// Tag anchor points — angle (degrees) and distance multiplier from orb edge
const TAG_LAYOUT = [
    { angle: -55, dist: 0.82, alignRight: true }, // top-right
    { angle: 32, dist: 0.78, alignRight: false }, // right
    { angle: 125, dist: 0.84, alignRight: false }, // bottom-right
    { angle: -128, dist: 0.80, alignRight: true }, // top-left
    { angle: 158, dist: 0.76, alignRight: true }, // bottom-left
];

function polar(cx, cy, angleDeg, r) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
}

// ─── FloatingTag ──────────────────────────────────────────────────────────────
function FloatingTag({ label, index, hue, delay }) {
    return (
        <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.8 + index * 0.65, repeat: Infinity, ease: "easeInOut", delay }}
            style={{ pointerEvents: "none" }}
        >
            <Box
                sx={{
                    px: 1.2, py: 0.5,
                    borderRadius: "8px",
                    border: `1px solid ${alpha(`hsl(${hue}, 70%, 60%)`, 0.32)}`,
                    background: alpha(`hsl(${hue}, 55%, 8%)`, 0.80),
                    backdropFilter: "blur(6px)",
                    whiteSpace: "nowrap",
                }}
            >
                <Typography sx={{
                    fontSize: "0.63rem",
                    fontWeight: 600,
                    letterSpacing: "0.07em",
                    color: `hsl(${hue}, 72%, 74%)`,
                    lineHeight: 1,
                }}>
                    {label}
                </Typography>
            </Box>
        </motion.div>
    );
}

// ─── CosmicIconVisual ─────────────────────────────────────────────────────────
export default function CosmicIconVisual({ Icon, index, feature, tags = [], visualType = "default" }) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [hovered, setHovered] = useState(false);

    // Deterministic palette per index
    const seed = (index * 137.508) % 360;
    const hue1 = seed;
    const hue2 = (seed + 60) % 360;
    const hue3 = (seed + 140) % 360;

    // User's original sizes
    const orbSize = isSmall ? 200 : 280;
    const shellSize = isSmall ? 70 : 100;
    const iconFontSize = isSmall ? 26 : 34;

    // Scene expands beyond the orb to give tags room
    const sceneW = isSmall ? orbSize : orbSize + 140;
    const sceneH = isSmall ? orbSize : orbSize + 120;
    const cx = sceneW / 2;
    const cy = sceneH / 2;
    const orbR = orbSize / 2;

    // User's original stable stars
    const stars = useRef(
        Array.from({ length: 22 }, (_, i) => ({
            x: Math.sin(i * 43.7) * 50 + 50,
            y: Math.cos(i * 73.1) * 50 + 50,
            sz: 0.9 + Math.abs(Math.sin(i * 17.3)) * 1.8,
            op: 0.18 + Math.abs(Math.sin(i * 5.1)) * 0.32,
            hue: (hue1 + i * 11) % 360,
        }))
    ).current;

    // User's original ring configs
    const rings = [
        { frac: 0.57, duration: "14s", ccw: false, opacity: 0.28 },
        { frac: 0.72, duration: "22s", ccw: true, opacity: 0.16 },
        { frac: 0.88, duration: "34s", ccw: false, opacity: 0.10 },
    ];

    // Constellation — only on desktop, up to 5 tags
    const activeTags = isSmall ? [] : tags.slice(0, TAG_LAYOUT.length);

    const lines = useMemo(() => activeTags.map((_, i) => {
        const layout = TAG_LAYOUT[i];
        const totalR = orbR + orbR * layout.dist;
        const edgePt = polar(cx, cy, layout.angle, orbR + 6);
        const midPt = polar(cx, cy, layout.angle, orbR + (totalR - orbR) * 0.48);
        const tagPt = polar(cx, cy, layout.angle, totalR);
        return { edgePt, midPt, tagPt, hue: (hue1 + i * 42) % 360, layout };
    }), [activeTags.length, cx, cy, orbR, hue1]);

    function getCoreRenderer(type) {
        const map = {
            data: renderDataCore,
            ai: renderAICore,
            mobile: renderMobileCore,
            system: renderSystemCore,
            infra: renderInfraCore,
            health: renderHealthCore,
            default: renderDefaultCore,
        };

        return map[type] || map.default;
    }

    return (
        <Box
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
                position: "relative",
                width: sceneW,
                height: sceneH,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
            }}
        >
            {/* ── SVG constellation lines ── */}
            {activeTags.length > 0 && (
                <Box
                    component="svg"
                    width={sceneW}
                    height={sceneH}
                    sx={{
                        position: "absolute", inset: 0, zIndex: 2,
                        pointerEvents: "none", overflow: "visible",
                    }}
                >
                    {lines.map((line, i) => (
                        <g key={i}>
                            <line
                                x1={line.edgePt.x} y1={line.edgePt.y}
                                x2={line.tagPt.x} y2={line.tagPt.y}
                                stroke={`hsl(${line.hue}, 62%, 58%)`}
                                strokeWidth="0.8"
                                strokeDasharray="3 6"
                                strokeOpacity={hovered ? 0.52 : 0.24}
                                style={{ transition: "stroke-opacity 0.4s ease" }}
                            />
                            {/* Mid-node dot */}
                            <circle
                                cx={line.midPt.x} cy={line.midPt.y} r={2.4}
                                fill={`hsl(${line.hue}, 72%, 62%)`}
                                fillOpacity={hovered ? 0.82 : 0.38}
                                style={{ transition: "fill-opacity 0.4s ease" }}
                            />
                            {/* Edge tick */}
                            <circle
                                cx={line.edgePt.x} cy={line.edgePt.y} r={1.6}
                                fill={`hsl(${line.hue}, 80%, 70%)`}
                                fillOpacity={0.50}
                            />
                        </g>
                    ))}
                </Box>
            )}

            {/* ── Floating tags ── */}
            {lines.map((line, i) => (
                <Box
                    key={activeTags[i]}
                    sx={{
                        position: "absolute",
                        left: line.tagPt.x,
                        top: line.tagPt.y,
                        transform: line.layout.alignRight
                            ? "translate(-100%, -50%)"
                            : "translate(0%, -50%)",
                        zIndex: 6,
                    }}
                >
                    <FloatingTag
                        label={activeTags[i]}
                        index={i}
                        hue={line.hue}
                        delay={i * 0.45 + index * 0.18}
                    />
                </Box>
            ))}

            {/* ── Orb — positioned at scene centre ── */}
            <Box
                sx={{
                    position: "absolute",
                    width: orbSize,
                    height: orbSize,
                    left: cx - orbR,
                    top: cy - orbR,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* ── Star core (user's original) ── */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: `radial-gradient(circle at 50% 50%,
                            hsl(${hue1}, 100%, 98%)  0%,
                            hsl(${hue1}, 90%,  80%)  12%,
                            hsl(${hue1}, 75%,  55%)  28%,
                            hsl(${hue2}, 60%,  30%)  52%,
                            hsl(${hue3}, 45%,  10%)  75%,
                            transparent              100%
                        )`,
                        opacity: hovered ? 0.92 : 0.78,
                        transition: "opacity 0.45s ease",
                        filter: "blur(2px)",
                    }}
                />

                {/* ── Static star field (user's original — background commented out) ── */}
                <Box sx={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", zIndex: 1 }}>
                    {stars.map((star, i) => (
                        <Box key={i} sx={{
                            position: "absolute",
                            borderRadius: "50%",
                            // background: `hsl(${star.hue}, 80%, 90%)`,   ← preserved as user left it
                            width: star.sz,
                            height: star.sz,
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            opacity: star.op,
                        }} />
                    ))}
                </Box>

                {/* ── Orbital rings (user's original) ── */}
                {rings.map((ring, i) => {
                    const size = orbSize * ring.frac;
                    const kwName = ring.ccw ? "cosmicSpinCcw" : "cosmicSpinCw";
                    return (
                        <Box key={i} sx={{
                            position: "absolute",
                            width: size, height: size,
                            borderRadius: "50%",
                            border: "1px solid transparent",
                            borderTopColor: alpha(`hsl(${(hue1 + i * 30) % 360}, 75%, 60%)`, ring.opacity * 1.5),
                            borderRightColor: alpha(`hsl(${(hue1 + i * 30) % 360}, 55%, 45%)`, ring.opacity),
                            zIndex: 2,
                            animation: `${kwName} ${ring.duration} linear infinite`,
                            "@keyframes cosmicSpinCw": { to: { transform: "rotate(360deg)" } },
                            "@keyframes cosmicSpinCcw": { to: { transform: "rotate(-360deg)" } },
                        }} />
                    );
                })}

                {/* ── Feature corona ring (user's original) ── */}
                {feature && (
                    <Box sx={{
                        position: "absolute",
                        inset: -8,
                        borderRadius: "50%",
                        border: `1.5px solid ${alpha(`hsl(${hue1}, 90%, 70%)`, 0.35)}`,
                        boxShadow: `0 0 16px ${alpha(`hsl(${hue1}, 90%, 70%)`, 0.18)}`,
                        zIndex: 3,
                        animation: "cosmicSpinCcw 22s linear infinite",
                        "@keyframes cosmicSpinCcw": { to: { transform: "rotate(-360deg)" } },
                    }} />
                )}

                {/* ── Ambient glow (user's original) ── */}
                <motion.div
                    animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.22, 0.12] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        width: orbSize * 0.38,
                        height: orbSize * 0.38,
                        borderRadius: "50%",
                        background: `radial-gradient(circle, hsl(${hue1}, 70%, 55%) 0%, transparent 70%)`,
                        filter: "blur(16px)",
                        zIndex: 3,
                        pointerEvents: "none",
                    }}
                />

                {/* ── Icon shell (user's original) ── */}
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                        duration: 5.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <motion.div
                        animate={{
                            y: hovered ? -10 : 0,
                            scale: hovered ? 1.08 : 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 14,
                        }}
                        style={{ position: "relative", zIndex: 5 }}
                    >
                        <Box sx={{
                            width: shellSize, height: shellSize,
                            borderRadius: "22px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            position: "relative",
                            background: `linear-gradient(145deg,
                            hsl(${hue1}, 55%, 22%) 0%,
                            hsl(${hue2}, 45%, 12%) 60%,
                            hsl(${hue3}, 40%, 8%)  100%
                        )`,
                            border: `1px solid ${alpha(`hsl(${hue1}, 80%, 60%)`, 0.38)}`,
                            boxShadow: `
                            0 0 28px ${alpha(`hsl(${hue1}, 75%, 45%)`, 0.38)},
                            0 4px 16px ${alpha("#000", 0.45)},
                            inset 0 1px 0 ${alpha("#fff", 0.14)}
                        `,
                            "&::before": {
                                content: '""', position: "absolute", inset: 0,
                                borderRadius: "inherit",
                                background: `linear-gradient(135deg, ${alpha("#fff", 0.12)} 0%, transparent 55%)`,
                                pointerEvents: "none",
                            },
                        }}>
                            {/* {Icon && (
                            <Icon sx={{
                                fontSize: iconFontSize,
                                color: `hsl(${hue1}, 85%, 85%)`,
                                filter: `drop-shadow(0 0 8px hsl(${hue1}, 85%, 65%))`,
                                position: "relative", zIndex: 1,
                            }} />
                        )} */}
                            {getCoreRenderer(visualType)({ hue1, hue2, hue3, Icon, hovered })}
                        </Box>
                    </motion.div>
                </motion.div>
                {/* ── Index badge (user's original) ── */}
                <Typography sx={{
                    position: "absolute",
                    bottom: isSmall ? 14 : 20,
                    right: isSmall ? 14 : 20,
                    zIndex: 6,
                    fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em",
                    color: `hsl(${hue1}, 75%, 70%)`,
                    px: 1.1, py: 0.3, borderRadius: 99, lineHeight: 1,
                    background: alpha(`hsl(${hue1}, 50%, 10%)`, 0.88),
                    border: `1px solid ${alpha(`hsl(${hue1}, 75%, 55%)`, 0.28)}`,
                    backdropFilter: "blur(6px)",
                }}>
                    {String(index + 1).padStart(2, "0")}
                </Typography>
            </Box>
        </Box>
    );
}