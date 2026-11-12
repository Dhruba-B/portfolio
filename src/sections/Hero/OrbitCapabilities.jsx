import { useEffect, useMemo, useState } from "react";
import { Box, GlobalStyles, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

/**
 * Orbital map for the capabilities section.
 *
 * items: [{ title, text }] in this order:
 *   0 Frontend engineering, 4 Real-time collaboration  -> outer ring  (Interface)
 *   1 API design,           5 AI-assisted features     -> middle ring (Services)
 *   2 Database modeling,    3 Background job processing -> inner ring (Data & workers)
 * Change ORBITS if you reorder or add items.
 *
 * Planets sit at fixed angles so they never move under the cursor.
 * The only motion is a small satellite drifting along each ring.
 * Names are shown in the detail panel only, so nothing can be clipped
 * or covered by another ring.
 */
const ORBITS = [
    { layer: "Interface", inset: "2%", duration: 90, dir: 1, tone: "primary", members: [{ item: 0, angle: 300 }, { item: 4, angle: 120 }] },
    { layer: "Services", inset: "17%", duration: 70, dir: -1, tone: "accent", members: [{ item: 1, angle: 30 }, { item: 5, angle: 210 }] },
    { layer: "Data & workers", inset: "32%", duration: 50, dir: 1, tone: "primary", members: [{ item: 2, angle: 150 }, { item: 3, angle: 330 }] },
];

const MONO = "'JetBrains Mono', monospace";
const PLANET = { xs: 36, sm: 44, md: 52 };

const panel = (t) => ({
    background: alpha(t.palette.background.paper, 0.6),
    border: `1px solid ${alpha(t.palette.primary.main, 0.25)}`,
    borderRadius: "16px",
});

const polar = (deg) => {
    const r = (deg * Math.PI) / 180;
    return { x: 50 + 50 * Math.cos(r), y: 50 + 50 * Math.sin(r) };
};

export default function OrbitCapabilities({ items = [] }) {
    const [active, setActive] = useState(0);
    const [auto, setAuto] = useState(true);

    const reduceMotion = useMemo(
        () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        []
    );

    // slow auto-tour until the visitor interacts
    useEffect(() => {
        if (!auto || reduceMotion || !items.length) return undefined;
        const id = setInterval(() => setActive((a) => (a + 1) % items.length), 4500);
        return () => clearInterval(id);
    }, [auto, reduceMotion, items.length]);

    const pick = (i) => {
        setAuto(false);
        setActive(i);
    };

    const meta = useMemo(() => {
        const m = {};
        ORBITS.forEach((o) => o.members.forEach(({ item }) => (m[item] = { layer: o.layer, tone: o.tone })));
        return m;
    }, []);

    const current = items[active];
    const currentMeta = meta[active] ?? { layer: "", tone: "primary" };

    return (
        <>
            <GlobalStyles
                styles={{
                    "@keyframes orbitSpin": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
                    "@keyframes orbitFade": { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "none" } },
                }}
            />

            <Box
                sx={{
                    mt: { xs: 5, md: 6 },
                    display: "grid",
                    gap: { xs: 4, md: 8 },
                    alignItems: "center",
                    gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
                }}
            >
                {/* ───────────── orbital stage ───────────── */}
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        maxWidth: { xs: 320, sm: 440, md: 520 },
                        aspectRatio: "1 / 1",
                        mx: "auto",
                        isolation: "isolate",
                        "@media (prefers-reduced-motion: reduce)": { "& .orbit-anim": { animation: "none !important" } },
                    }}
                >
                    {/* soft glow, no blur filter */}
                    <Box
                        aria-hidden
                        sx={(t) => ({
                            position: "absolute",
                            inset: 0,
                            borderRadius: "50%",
                            pointerEvents: "none",
                            background: `radial-gradient(circle, ${alpha(t.palette.primary.main, 0.14)} 0%, transparent 68%)`,
                        })}
                    />

                    {ORBITS.map((orbit) => {
                        const isActiveRing = meta[active]?.layer === orbit.layer;
                        return (
                            <Box
                                key={orbit.layer}
                                sx={(t) => {
                                    const c = t.palette[orbit.tone].main;
                                    return {
                                        position: "absolute",
                                        inset: orbit.inset,
                                        borderRadius: "50%",
                                        border: `1px ${isActiveRing ? "solid" : "dashed"} ${alpha(c, isActiveRing ? 0.5 : 0.28)}`,
                                        transition: "border-color .3s ease",
                                        pointerEvents: "none",
                                    };
                                }}
                            >
                                {/* decorative satellite drifting along the ring */}
                                <Box
                                    aria-hidden
                                    className="orbit-anim"
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        animation: `orbitSpin ${orbit.duration}s linear infinite ${orbit.dir < 0 ? "reverse" : "normal"}`,
                                    }}
                                >
                                    <Box
                                        sx={(t) => ({
                                            position: "absolute",
                                            top: 0,
                                            left: "50%",
                                            width: 5,
                                            height: 5,
                                            borderRadius: "50%",
                                            transform: "translate(-50%, -50%)",
                                            background: t.palette[orbit.tone].main,
                                            opacity: 0.7,
                                        })}
                                    />
                                </Box>

                                {/* planets at fixed positions */}
                                {orbit.members.map(({ item: itemIndex, angle }) => {
                                    const item = items[itemIndex];
                                    if (!item) return null;
                                    const isActive = active === itemIndex;
                                    const { x, y } = polar(angle);
                                    return (
                                        <Box
                                            key={item.title}
                                            sx={{
                                                position: "absolute",
                                                left: `${x}%`,
                                                top: `${y}%`,
                                                transform: "translate(-50%, -50%)",
                                                zIndex: isActive ? 2 : 1,
                                                pointerEvents: "auto",
                                            }}
                                        >
                                            <Box
                                                component="button"
                                                type="button"
                                                aria-label={item.title}
                                                aria-pressed={isActive}
                                                onMouseEnter={() => pick(itemIndex)}
                                                onFocus={() => pick(itemIndex)}
                                                onClick={() => pick(itemIndex)}
                                                sx={(t) => {
                                                    const c = t.palette[orbit.tone].main;
                                                    return {
                                                        all: "unset",
                                                        boxSizing: "border-box",
                                                        cursor: "pointer",
                                                        width: PLANET,
                                                        height: PLANET,
                                                        borderRadius: "50%",
                                                        display: "grid",
                                                        placeItems: "center",
                                                        fontFamily: MONO,
                                                        fontWeight: 700,
                                                        fontSize: { xs: "0.62rem", md: "0.74rem" },
                                                        color: isActive ? "#fff" : t.palette.text.secondary,
                                                        border: `1px solid ${alpha(c, isActive ? 0.95 : 0.45)}`,
                                                        background: isActive ? c : t.palette.background.paper,
                                                        boxShadow: isActive ? `0 0 0 5px ${alpha(c, 0.18)}` : "none",
                                                        transition: "background .25s ease, color .25s ease, border-color .25s ease, box-shadow .25s ease",
                                                        "&:hover": { borderColor: c },
                                                        "&:focus-visible": { outline: `2px solid ${alpha(t.palette.accent.main, 0.9)}`, outlineOffset: 4 },
                                                    };
                                                }}
                                            >
                                                {String(itemIndex + 1).padStart(2, "0")}
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                        );
                    })}

                    {/* core */}
                    <Box
                        aria-hidden
                        sx={(t) => ({
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "18%",
                            aspectRatio: "1 / 1",
                            transform: "translate(-50%, -50%)",
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            textAlign: "center",
                            fontFamily: MONO,
                            fontWeight: 700,
                            fontSize: { xs: "0.46rem", sm: "0.54rem", md: "0.62rem" },
                            lineHeight: 1.25,
                            letterSpacing: "0.1em",
                            color: t.palette.text.primary,
                            border: `1px solid ${alpha(t.palette.accent.main, 0.55)}`,
                            background: alpha(t.palette.accent.main, 0.14),
                        })}
                    >
                        <span>
                            FULL
                            <br />
                            STACK
                        </span>
                    </Box>
                </Box>

                {/* ───────────── detail panel ───────────── */}
                <Box sx={(t) => ({ ...panel(t), p: { xs: 3, md: 4.5 }, minHeight: { md: 320 }, display: "flex", flexDirection: "column" })}>
                    <Box key={active} sx={{ animation: "orbitFade .35s ease", flex: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
                            <Typography
                                sx={(t) => ({
                                    fontFamily: MONO,
                                    fontWeight: 700,
                                    fontSize: { xs: "2rem", md: "2.6rem" },
                                    lineHeight: 1,
                                    color: t.palette.primary.main,
                                })}
                            >
                                {String(active + 1).padStart(2, "0")}
                            </Typography>
                            <Box
                                sx={(t) => ({
                                    px: 1.4,
                                    py: 0.5,
                                    borderRadius: 999,
                                    fontSize: "0.68rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "text.secondary",
                                    border: `1px solid ${alpha(t.palette.accent.main, 0.3)}`,
                                })}
                            >
                                {currentMeta.layer} layer
                            </Box>
                        </Box>
                        <Typography component="h3" sx={{ fontWeight: 700, fontSize: { xs: "1.3rem", md: "1.6rem" }, lineHeight: 1.25, mb: 1.5 }}>
                            {current?.title}
                        </Typography>
                        <Typography sx={{ color: "text.secondary", lineHeight: 1.75, fontSize: { xs: "0.92rem", md: "1rem" } }}>
                            {current?.text}
                        </Typography>
                    </Box>

                    {/* selector */}
                    <Box sx={{ mt: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {items.map((it, i) => (
                            <Box
                                key={it.title}
                                component="button"
                                type="button"
                                aria-label={it.title}
                                aria-pressed={active === i}
                                onClick={() => pick(i)}
                                sx={(t) => ({
                                    all: "unset",
                                    cursor: "pointer",
                                    boxSizing: "border-box",
                                    width: 34,
                                    height: 34,
                                    borderRadius: "50%",
                                    display: "grid",
                                    placeItems: "center",
                                    fontFamily: MONO,
                                    fontSize: "0.66rem",
                                    fontWeight: 700,
                                    color: active === i ? "#fff" : t.palette.text.secondary,
                                    border: `1px solid ${alpha(t.palette.accent.main, active === i ? 0.9 : 0.28)}`,
                                    background: active === i ? t.palette.primary.main : "transparent",
                                    transition: "background .25s ease, color .25s ease, border-color .25s ease",
                                    "&:hover": { borderColor: t.palette.accent.main },
                                    "&:focus-visible": { outline: `2px solid ${alpha(t.palette.accent.main, 0.9)}`, outlineOffset: 3 },
                                })}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
}