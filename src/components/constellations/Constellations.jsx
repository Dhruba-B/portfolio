// ConstellationLayer.jsx
import { motion } from "framer-motion";
import { useMemo } from "react";
import { alpha, useTheme } from "@mui/material";

export default function Constellations({ yMid, parallaxX, auroraDriftY }) {
    const theme = useTheme();
    const accentStrong = alpha(theme.palette.accent.main, 0.9);
    const accentMid = alpha(theme.palette.accent.main, 0.3);
    const accentSoft = alpha(theme.palette.accent.main, 0);
    const starStrong = alpha(theme.palette.primary.main, 0.85);
    const starMid = alpha(theme.palette.primary.main, 0.25);
    const starSoft = alpha(theme.palette.primary.main, 0);

    function seededRandom(seed) {
        const x = Math.sin(seed + 1) * 10000;
        return x - Math.floor(x);
    }

    function generateConstellation(count = 10) {
        const nodes = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: 40 + seededRandom(i * 3) * 920,      // 40–960 px range
            y: 30 + seededRandom(i * 3 + 1) * 540,  // 30–570 px range
            size: i % 4 === 0 ? 6 : 2 + seededRandom(i * 3 + 2) * 3,
            isPurple: i % 4 === 0,
            duration: 2.6 + seededRandom(i * 7) * 2.2,
            delay: -(seededRandom(i * 11) * 2.4),
        }));

        const edges = [];
        const connected = new Set();

        nodes.forEach((a) => {
            const neighbours = nodes
                .filter((b) => b.id !== a.id)
                .map((b) => ({ b, dist: Math.hypot(a.x - b.x, a.y - b.y) }))
                .sort((p, q) => p.dist - q.dist)
                .slice(0, 3);

            neighbours.forEach(({ b, dist }) => {
                const key = [Math.min(a.id, b.id), Math.max(a.id, b.id)].join("-");
                if (!connected.has(key) && dist < 350) {
                    edges.push([a.id, b.id]);
                    connected.add(key);
                }
            });
        });

        return { nodes, edges };
    }

    const { nodes, edges } = useMemo(() => generateConstellation(10), []);

    return (
        <motion.div
            style={{
                y: yMid,
                x: parallaxX,
                translateY: auroraDriftY,
                position: "absolute",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
            }}
        >
            <svg
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                viewBox="0 0 1000 600"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <radialGradient id="glow-purple" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={accentStrong} />
                        <stop offset="40%" stopColor={accentMid} />
                        <stop offset="100%" stopColor={accentSoft} />
                    </radialGradient>
                    <radialGradient id="glow-white" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={starStrong} />
                        <stop offset="35%" stopColor={starMid} />
                        <stop offset="100%" stopColor={starSoft} />
                    </radialGradient>
                </defs>

                {/* Edges */}
                {edges.map(([a, b]) => {
                    const na = nodes[a];
                    const nb = nodes[b];
                    const edgeSeed = a * 31 + b;
                    const dur = 3.5 + seededRandom(edgeSeed) * 1.8;
                    const del = -(seededRandom(edgeSeed + 7) * 2);
                    return (
                        <motion.line
                            key={`${a}-${b}`}
                            x1={na.x}
                            y1={na.y}
                            x2={nb.x}
                            y2={nb.y}
                            stroke={alpha(theme.palette.primary.main, 0.55)}
                            strokeWidth="1.5"
                            animate={{ opacity: [0.06, 0.28, 0.06] }}
                            transition={{
                                duration: dur,
                                delay: del,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    );
                })}

                {/* Glow halos */}
                {nodes.map((node) => (
                    <motion.ellipse
                        key={`halo-${node.id}`}
                        cx={node.x}
                        cy={node.y}
                        rx={node.isPurple ? 45 : 28}
                        ry={node.isPurple ? 45 : 28}
                        fill={node.isPurple ? "url(#glow-purple)" : "url(#glow-white)"}
                        animate={{
                            opacity: node.isPurple ? [0.2, 0.65, 0.2] : [0.15, 0.5, 0.15],
                        }}
                        transition={{
                            duration: node.duration,
                            delay: node.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Star cores */}
                {nodes.map((node) => (
                    <motion.circle
                        key={`star-${node.id}`}
                        cx={node.x}
                        cy={node.y}
                        r={node.size * 4}
                        fill={
                            node.isPurple
                                ? alpha(theme.palette.accent.main, 0.95)
                                : alpha(theme.palette.primary.main, 0.88)
                        }
                        animate={{
                            opacity: [0.35, 1, 0.35],
                            r: [node.size * 3.2, node.size * 4.8, node.size * 3.2],  
                        }}
                        transition={{
                            duration: node.duration,
                            delay: node.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </svg>
        </motion.div>
    );
}