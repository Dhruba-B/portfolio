import { useEffect, useState } from "react";
import { Box, Button, Collapse, IconButton, Typography } from "@mui/material";
import { alpha, keyframes, useTheme } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

/* ---------- Stellar animations ---------- */
const orbit = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;
const twinkle = keyframes`
  0%, 100% { opacity: 0.35; transform: scale(0.8); }
  50%      { opacity: 1;    transform: scale(1.15); }
`;
const drift = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const mono = "'JetBrains Mono', monospace";

/**
 * Props:
 *  - sections: [{ id, title }]
 *  - onSectionSelect(index)
 *  - activeIndex (optional): highlights the current section
 */
export default function StellarHeader({ sections = [], onSectionSelect, activeIndex = 0 }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const accent = theme.palette.accent?.main ?? theme.palette.secondary.main;
    const primary = theme.palette.primary.main;
    const paper = theme.palette.background.default;

    // Close mobile menu on Escape or when resizing up to desktop
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        const onResize = () => window.innerWidth >= 900 && setOpen(false);
        window.addEventListener("keydown", onKey);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const select = (e, index) => {
        e.preventDefault();
        setOpen(false);
        onSectionSelect?.(index);
    };

    return (
        <Box
            component="header"
            sx={{
                position: "absolute",
                top: { xs: "calc(env(safe-area-inset-top, 0px) + 12px)", md: 36 },
                left: { xs: 12, sm: 20, md: 56, lg: 96 },
                right: { xs: 12, sm: 20, md: 56, lg: 96 },
                zIndex: 8,
            }}
        >
            {/* ---------- Main glass pill ---------- */}
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1.5,
                    px: { xs: 1, md: 1.6 },
                    py: { xs: 0.7, md: 1 },
                    borderRadius: 999,
                    overflow: "hidden",
                    background: `linear-gradient(135deg, ${alpha(paper, 0.72)}, ${alpha(paper, 0.5)})`,
                    backdropFilter: "blur(16px) saturate(140%)",
                    WebkitBackdropFilter: "blur(16px) saturate(140%)",
                    boxShadow: `
                        0 10px 40px ${alpha(primary, 0.18)},
                        0 0 60px ${alpha(accent, 0.08)},
                        inset 0 1px 0 ${alpha("#ffffff", 0.08)}`,
                    // Nebula gradient border
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        padding: "1px",
                        borderRadius: "inherit",
                        background: `linear-gradient(120deg, ${alpha(primary, 0.55)}, ${alpha(accent, 0.55)}, ${alpha("#7dd3fc", 0.35)}, ${alpha(primary, 0.55)})`,
                        backgroundSize: "300% 300%",
                        animation: `${drift} 14s ease infinite`,
                        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        pointerEvents: "none",
                    },
                    // Starlight shimmer along the top edge
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "12%",
                        right: "12%",
                        height: "1px",
                        background: `linear-gradient(90deg, transparent, ${alpha("#ffffff", 0.7)}, transparent)`,
                        opacity: 0.5,
                        pointerEvents: "none",
                    },
                    "@media (prefers-reduced-motion: reduce)": {
                        "&::before": { animation: "none" },
                    },
                }}
            >
                {/* Tiny stars */}
                {[
                    { l: "34%", t: "28%", d: "0s", s: 2 },
                    { l: "58%", t: "70%", d: "1.2s", s: 1.5 },
                    { l: "78%", t: "22%", d: "2.1s", s: 2 },
                ].map((star, i) => (
                    <Box
                        key={i}
                        aria-hidden
                        sx={{
                            position: "absolute",
                            left: star.l,
                            top: star.t,
                            width: star.s,
                            height: star.s,
                            borderRadius: "50%",
                            bgcolor: "#fff",
                            boxShadow: `0 0 6px ${alpha("#fff", 0.9)}`,
                            animation: `${twinkle} 3.4s ease-in-out ${star.d} infinite`,
                            display: { xs: "none", sm: "block" },
                            pointerEvents: "none",
                            "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                        }}
                    />
                ))}

                {/* ---------- Brand ---------- */}
                <Box
                    component="a"
                    href="#hero"
                    onClick={(e) => select(e, 0)}
                    sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 1, md: 1.2 },
                        minWidth: 0,
                        color: "inherit",
                        textDecoration: "none",
                        borderRadius: 999,
                        pr: { xs: 0.4, md: 1 },
                        "&:focus-visible": { outline: `2px solid ${alpha(accent, 0.7)}`, outlineOffset: 3 },
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: { xs: 32, md: 38 },
                            height: { xs: 32, md: 38 },
                            flexShrink: 0,
                            display: "grid",
                            placeItems: "center",
                        }}
                    >
                        {/* Orbit ring with a tiny planet */}
                        <Box
                            aria-hidden
                            sx={{
                                position: "absolute",
                                inset: -2,
                                borderRadius: "50%",
                                border: `1px dashed ${alpha(accent, 0.35)}`,
                                animation: `${orbit} 9s linear infinite`,
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    top: -2.5,
                                    left: "50%",
                                    width: 5,
                                    height: 5,
                                    ml: "-2.5px",
                                    borderRadius: "50%",
                                    bgcolor: accent,
                                    boxShadow: `0 0 10px ${accent}`,
                                },
                                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                            }}
                        />
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                display: "grid",
                                placeItems: "center",
                                color: "text.primary",
                                fontFamily: mono,
                                fontWeight: 900,
                                fontSize: { xs: "0.7rem", md: "0.78rem" },
                                letterSpacing: "0.02em",
                                border: `1px solid ${alpha(accent, 0.45)}`,
                                background: `radial-gradient(circle at 35% 25%, ${alpha(accent, 0.35)}, ${alpha(primary, 0.1)} 70%)`,
                                boxShadow: `0 0 20px ${alpha(accent, 0.28)}, inset 0 0 10px ${alpha(accent, 0.12)}`,
                            }}
                        >
                            DB
                        </Box>
                    </Box>

                    <Typography
                        sx={{
                            color: "text.primary",
                            fontWeight: 850,
                            fontSize: { xs: "0.8rem", md: "0.92rem" },
                            lineHeight: 1.05,
                            whiteSpace: "nowrap",
                            fontFamily: mono,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            textShadow: `0 0 18px ${alpha(accent, 0.35)}`,
                        }}
                    >
                        Dhrubashis Basak
                    </Typography>
                </Box>

                {/* ---------- Desktop nav ---------- */}
                <Box
                    component="nav"
                    aria-label="Primary sections"
                    sx={{
                        display: { xs: "none", md: "flex" },
                        justifyContent: "flex-end",
                        gap: 0.6,
                        minWidth: 0,
                    }}
                >
                    {sections.map((section, index) => {
                        const active = index === activeIndex;
                        return (
                            <Button
                                key={section.id}
                                size="small"
                                href={`#${section.id}`}
                                onClick={(e) => select(e, index)}
                                aria-current={active ? "true" : undefined}
                                sx={{
                                    position: "relative",
                                    minWidth: "auto",
                                    px: 1.4,
                                    py: 0.7,
                                    borderRadius: 999,
                                    color: active ? "text.primary" : "text.secondary",
                                    fontWeight: 750,
                                    fontSize: "0.74rem",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    whiteSpace: "nowrap",
                                    background: active ? alpha(accent, 0.12) : "transparent",
                                    transition: "all .25s ease",
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        bottom: 3,
                                        left: "50%",
                                        width: active ? 14 : 0,
                                        height: 2,
                                        ml: active ? "-7px" : 0,
                                        borderRadius: 2,
                                        background: accent,
                                        boxShadow: `0 0 8px ${accent}`,
                                        transition: "all .25s ease",
                                    },
                                    "&:hover, &:focus-visible": {
                                        color: "text.primary",
                                        background: alpha(primary, 0.16),
                                        boxShadow: `0 0 18px ${alpha(accent, 0.18)}`,
                                    },
                                }}
                            >
                                {section.title}
                            </Button>
                        );
                    })}
                </Box>

                {/* ---------- Mobile menu toggle ---------- */}
                <IconButton
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    aria-controls="mobile-nav"
                    onClick={() => setOpen((v) => !v)}
                    sx={{
                        display: { xs: "inline-flex", md: "none" },
                        width: 40,
                        height: 40,
                        color: "text.primary",
                        border: `1px solid ${alpha(accent, 0.35)}`,
                        background: alpha(accent, 0.08),
                        "&:hover": { background: alpha(accent, 0.16) },
                    }}
                >
                    {open ? <CloseRoundedIcon fontSize="small" /> : <MenuRoundedIcon fontSize="small" />}
                </IconButton>
            </Box>

            {/* ---------- Mobile dropdown ---------- */}
            <Collapse in={open} timeout={260} unmountOnExit sx={{ display: { md: "none" } }}>
                <Box
                    id="mobile-nav"
                    component="nav"
                    aria-label="Primary sections"
                    sx={{
                        mt: 1,
                        p: 1,
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)" },
                        gap: 0.8,
                        borderRadius: 4,
                        border: `1px solid ${alpha(accent, 0.28)}`,
                        background: `linear-gradient(160deg, ${alpha(paper, 0.88)}, ${alpha(paper, 0.7)})`,
                        backdropFilter: "blur(18px) saturate(140%)",
                        WebkitBackdropFilter: "blur(18px) saturate(140%)",
                        boxShadow: `0 18px 50px ${alpha("#000", 0.35)}, 0 0 40px ${alpha(primary, 0.14)}`,
                        maxHeight: "calc(100dvh - 110px)",
                        overflowY: "auto",
                    }}
                >
                    {sections.map((section, index) => {
                        const active = index === activeIndex;
                        return (
                            <Button
                                key={section.id}
                                href={`#${section.id}`}
                                onClick={(e) => select(e, index)}
                                aria-current={active ? "true" : undefined}
                                sx={{
                                    justifyContent: "flex-start",
                                    gap: 1,
                                    px: 1.6,
                                    py: 1.3,
                                    borderRadius: 3,
                                    color: active ? "text.primary" : "text.secondary",
                                    fontFamily: mono,
                                    fontWeight: 750,
                                    fontSize: "0.76rem",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    background: active ? alpha(accent, 0.14) : alpha(primary, 0.05),
                                    border: `1px solid ${active ? alpha(accent, 0.45) : "transparent"}`,
                                    "&:hover, &:focus-visible": { background: alpha(accent, 0.16), color: "text.primary" },
                                }}
                            >
                                <Box
                                    component="span"
                                    aria-hidden
                                    sx={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: "50%",
                                        flexShrink: 0,
                                        bgcolor: active ? accent : alpha("#fff", 0.3),
                                        boxShadow: active ? `0 0 8px ${accent}` : "none",
                                    }}
                                />
                                {section.title}
                            </Button>
                        );
                    })}
                </Box>
            </Collapse>
        </Box>
    );
}