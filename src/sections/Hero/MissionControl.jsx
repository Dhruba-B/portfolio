import { useEffect, useRef, useState } from "react";
import { Box, GlobalStyles, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

const MONO = "'JetBrains Mono', monospace";

// Short descriptions are generic – edit to your own voice.
const DEFAULT_PRINCIPLES = [
    { title: "Scalability", text: "Systems that keep their shape as load, data and teams grow." },
    { title: "Reliability", text: "Failures are expected, contained and recovered from cleanly." },
    { title: "Maintainability", text: "Code and schemas that stay readable, testable and easy to change." },
];

const glass = (t) => ({
    background: `linear-gradient(180deg, ${alpha(t.palette.background.paper, 0.55)}, ${alpha(t.palette.background.default, 0.5)})`,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: `1px solid ${alpha(t.palette.primary.main, 0.28)}`,
    borderRadius: "14px",
});

const gradientText = (t) => ({
    background: `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.accent.main})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
});

/** "4+" -> counts 0..4 then shows "+", "100%" -> 0..100 then "%" */
function CountUp({ value, duration = 1500 }) {
    const match = String(value).match(/^(\d+)(.*)$/);
    const target = match ? parseInt(match[1], 10) : 0;
    const suffix = match ? match[2] : "";
    const ref = useRef(null);
    const [n, setN] = useState(0);

    useEffect(() => {
        if (!match) return undefined;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce || typeof IntersectionObserver === "undefined") {
            setN(target);
            return undefined;
        }
        let raf = 0;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                io.disconnect();
                const t0 = performance.now();
                const step = (now) => {
                    const p = Math.min((now - t0) / duration, 1);
                    setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
                    if (p < 1) raf = requestAnimationFrame(step);
                };
                raf = requestAnimationFrame(step);
            },
            { threshold: 0.4 }
        );
        if (ref.current) io.observe(ref.current);
        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    if (!match) return <span ref={ref}>{value}</span>;
    return (
        <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
            {n}
            {suffix}
        </span>
    );
}

/**
 * Props
 *  intro    – ReactNode for the left column (eyebrow / title / sub / button)
 *  stats    – [{ value, label }]  (value like "4+" or "100%")
 *  sectors  – ["Healthcare", ...]
 *  principles – optional [{ title, text }] (3 recommended)
 *  Reveal   – the Reveal component (passed in to avoid a circular import)
 */
export default function MissionControl({ intro, stats = [], sectors = [], principles = DEFAULT_PRINCIPLES, Reveal }) {
    return (
        <>
            <GlobalStyles
                styles={{
                    "@keyframes missionScan": { from: { top: "-4%" }, to: { top: "104%" } },
                    "@keyframes missionBlink": { "0%, 100%": { opacity: 1, transform: "scale(1)" }, "50%": { opacity: 0.4, transform: "scale(0.8)" } },
                    "@keyframes missionTravel": { from: { left: "0%", opacity: 0 }, "10%": { opacity: 1 }, "90%": { opacity: 1 }, to: { left: "100%", opacity: 0 } },
                }}
            />

            <Box
                sx={{
                    "@media (prefers-reduced-motion: reduce)": { "& .mission-fx": { animation: "none !important" } },
                }}
            >
                {/* ── status strip ─────────────────────────────── */}
                <Reveal>
                    <Box
                        sx={(t) => ({
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                            flexWrap: "wrap",
                            pb: 2,
                            mb: { xs: 4, md: 5 },
                            borderBottom: `1px dashed ${alpha(t.palette.primary.main, 0.3)}`,
                            fontFamily: MONO,
                            fontSize: "0.68rem",
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "text.secondary",
                        })}
                    >
                        <span>Mission profile // full stack</span>
                        <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                            <Box
                                component="span"
                                className="mission-fx"
                                sx={(t) => ({
                                    width: "7px",
                                    height: "7px",
                                    borderRadius: "50%",
                                    background: t.palette.accent.main,
                                    boxShadow: `0 0 10px ${alpha(t.palette.accent.main, 0.9)}`,
                                    animation: "missionBlink 2.2s ease-in-out infinite",
                                })}
                            />
                            All systems nominal
                        </Box>
                    </Box>
                </Reveal>

                {/* ── main grid ───────────────────────────────── */}
                <Box
                    sx={{
                        display: "grid",
                        gap: { xs: 5, md: 7 },
                        alignItems: "center",
                        gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" },
                    }}
                >
                    <Box>{intro}</Box>

                    <Box>
                        {/* telemetry readouts */}
                        <Box sx={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(2, 1fr)" }}>
                            {stats.map((s, i) => (
                                <Reveal
                                    key={s.label}
                                    delay={120 + i * 110}
                                    y={36}
                                    sx={(t) => ({
                                        ...glass(t),
                                        position: "relative",
                                        overflow: "hidden",
                                        p: { xs: 2, md: 3 },
                                        // HUD corner brackets
                                        "&::before, &::after": {
                                            content: '""',
                                            position: "absolute",
                                            width: "14px",
                                            height: "14px",
                                            borderStyle: "solid",
                                            borderColor: alpha(t.palette.accent.main, 0.75),
                                            pointerEvents: "none",
                                        },
                                        "&::before": { top: "8px", left: "8px", borderWidth: "1px 0 0 1px" },
                                        "&::after": { bottom: "8px", right: "8px", borderWidth: "0 1px 1px 0" },
                                    })}
                                >
                                    {/* scan line */}
                                    <Box
                                        aria-hidden
                                        className="mission-fx"
                                        sx={(t) => ({
                                            position: "absolute",
                                            left: 0,
                                            right: 0,
                                            height: "2px",
                                            background: `linear-gradient(90deg, transparent, ${alpha(t.palette.accent.main, 0.55)}, transparent)`,
                                            opacity: 0.5,
                                            animation: `missionScan ${5 + i * 0.6}s linear ${i * 0.8}s infinite`,
                                            pointerEvents: "none",
                                        })}
                                    />
                                    <Typography sx={{ fontFamily: MONO, fontSize: "0.62rem", letterSpacing: "0.18em", color: "text.secondary", mb: 1.5 }}>
                                        {`T-0${i + 1}`}
                                    </Typography>
                                    <Typography
                                        sx={(t) => ({
                                            ...gradientText(t),
                                            fontFamily: MONO,
                                            fontWeight: 800,
                                            fontSize: { xs: "2rem", md: "2.9rem" },
                                            lineHeight: 1.05,
                                        })}
                                    >
                                        <CountUp value={s.value} />
                                    </Typography>
                                    <Typography sx={{ mt: 1, fontSize: "0.7rem", color: "text.secondary", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.5 }}>
                                        {s.label}
                                    </Typography>
                                    {/* decorative "lock-on" bar */}
                                    <Box sx={(t) => ({ mt: 2, height: "2px", borderRadius: "2px", background: alpha(t.palette.primary.main, 0.18) })}>
                                        <Box
                                            sx={(t) => ({
                                                height: "100%",
                                                width: "0%",
                                                borderRadius: "2px",
                                                background: `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.accent.main})`,
                                                transition: `width 1400ms cubic-bezier(.2,.7,.2,1) ${400 + i * 120}ms`,
                                                '[data-visible="true"] &': { width: "100%" },
                                                "@media (prefers-reduced-motion: reduce)": { width: "100%", transition: "none" },
                                            })}
                                        />
                                    </Box>
                                </Reveal>
                            ))}
                        </Box>

                        {/* sectors */}
                        {sectors.length > 0 && (
                            <Reveal delay={500} sx={(t) => ({ ...glass(t), mt: "16px", p: 2, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" })}>
                                <Typography sx={{ fontFamily: MONO, fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "text.secondary" }}>
                                    Sectors
                                </Typography>
                                {sectors.map((name) => (
                                    <Box
                                        key={name}
                                        sx={(t) => ({
                                            px: 1.4,
                                            py: 0.5,
                                            borderRadius: 999,
                                            border: `1px solid ${alpha(t.palette.accent.main, 0.3)}`,
                                            background: alpha(t.palette.accent.main, 0.06),
                                            fontSize: "0.74rem",
                                            fontWeight: 600,
                                            letterSpacing: "0.05em",
                                        })}
                                    >
                                        {name}
                                    </Box>
                                ))}
                            </Reveal>
                        )}
                    </Box>
                </Box>

                {/* ── flight path ─────────────────────────────── */}
                <Reveal delay={200} sx={{ mt: { xs: 5, md: 7 } }}>
                    <Typography sx={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "text.secondary", mb: 3, textAlign: { xs: "left", md: "center" } }}>
                        Flight principles
                    </Typography>

                    <Box sx={{ position: "relative", display: "grid", gap: { xs: 3, md: 4 }, gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" } }}>
                        {/* path line + travelling light (desktop) */}
                        <Box
                            aria-hidden
                            sx={(t) => ({
                                display: { xs: "none", md: "block" },
                                position: "absolute",
                                top: "17px",
                                left: "16.66%",
                                right: "16.66%",
                                borderTop: `1px dashed ${alpha(t.palette.accent.main, 0.5)}`,
                            })}
                        >
                            <Box
                                className="mission-fx"
                                sx={(t) => ({
                                    position: "absolute",
                                    top: "-4px",
                                    width: "7px",
                                    height: "7px",
                                    borderRadius: "50%",
                                    background: "#fff",
                                    boxShadow: `0 0 12px 3px ${alpha(t.palette.accent.main, 0.9)}`,
                                    animation: "missionTravel 5s ease-in-out infinite",
                                })}
                            />
                        </Box>

                        {principles.map((p, i) => (
                            <Box
                                key={p.title}
                                sx={{
                                    position: "relative",
                                    display: "flex",
                                    flexDirection: { xs: "row", md: "column" },
                                    alignItems: { xs: "flex-start", md: "center" },
                                    gap: { xs: 2, md: 1.5 },
                                    textAlign: { xs: "left", md: "center" },
                                }}
                            >
                                <Box
                                    sx={(t) => ({
                                        flexShrink: 0,
                                        width: "36px",
                                        height: "36px",
                                        borderRadius: "50%",
                                        display: "grid",
                                        placeItems: "center",
                                        fontFamily: MONO,
                                        fontWeight: 800,
                                        fontSize: "0.7rem",
                                        color: "#fff",
                                        border: `1px solid ${alpha(t.palette.accent.main, 0.8)}`,
                                        background: `radial-gradient(circle at 32% 28%, ${alpha("#fff", 0.5)} 0%, ${alpha(t.palette.accent.main, 0.9)} 40%, ${alpha(t.palette.background.default, 0.9)} 100%)`,
                                        boxShadow: `0 0 22px ${alpha(t.palette.accent.main, 0.5)}`,
                                    })}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </Box>
                                <Box>
                                    <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", mb: 0.5 }}>{p.title}</Typography>
                                    <Typography sx={{ color: "text.secondary", fontSize: "0.86rem", lineHeight: 1.7, maxWidth: 320, mx: { md: "auto" } }}>
                                        {p.text}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Reveal>
            </Box>
        </>
    );
}