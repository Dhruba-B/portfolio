// ConstellationLayer.jsx
import { motion } from "framer-motion";
import { useMemo } from "react";
import { alpha, useTheme } from "@mui/material";

export default function Constellations({ yMid, parallaxX, auroraDriftY }) {
    const theme = useTheme();

    function seededRandom(seed) {
        const x = Math.sin(seed + 1) * 10000;
        return x - Math.floor(x);
    }

    function generateConstellation(count = 10) {
        const nodes = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: 40 + seededRandom(i * 3) * 920,
            y: 30 + seededRandom(i * 3 + 1) * 540,
            // Small pinprick sizes: accent nodes slightly larger but still tiny
            size: i % 4 === 0 ? 3.6 : 1.8 + seededRandom(i * 3 + 2) * 0.7,
            isPurple: i % 4 === 0,
            duration: 4 + seededRandom(i * 7) * 3,       // slower, calmer pulse
            delay: -(seededRandom(i * 11) * 3),
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
                {/* Edges — very faint, barely-there lines */}
                {edges.map(([a, b]) => {
                    const na = nodes[a];
                    const nb = nodes[b];
                    const edgeSeed = a * 31 + b;
                    const dur = 5 + seededRandom(edgeSeed) * 3;
                    const del = -(seededRandom(edgeSeed + 7) * 3);
                    return (
                        <motion.line
                            key={`${a}-${b}`}
                            x1={na.x}
                            y1={na.y}
                            x2={nb.x}
                            y2={nb.y}
                            stroke={alpha(theme.palette.primary.main, 1)}
                            strokeWidth="0.6"
                            animate={{ opacity: [0.03, 0.14, 0.03] }}
                            transition={{
                                duration: dur,
                                delay: del,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    );
                })}

                {/* Star cores — tiny pinpricks with a gentle twinkle */}
                {nodes.map((node) => (
                    <motion.circle
                        key={`star-${node.id}`}
                        cx={node.x}
                        cy={node.y}
                        r={node.size}
                        fill={
                            node.isPurple
                                ? alpha(theme.palette.accent.main, 0.75)
                                : alpha(theme.palette.primary.main, 0.7)
                        }
                        animate={{
                            opacity: [0.3, 0.75, 0.3],
                            r: [node.size * 0.85, node.size * 1.15, node.size * 0.85],
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