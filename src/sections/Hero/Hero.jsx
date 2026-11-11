import {
    Box,
    Typography,
    Button,
    useTheme,
    Stack,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Constellations from "../../components/constellations/Constellations";
import portrait1 from "../../assets/images/potrait_1.png";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";

export default function HeroSection({ sections = [], onSectionSelect }) {
    const theme = useTheme();
    const ref = useRef(null);

    const stats = [
        { value: "4+", label: "Years experience" },
        { value: "10+", label: "Products / Feature Updates" },
        { value: "2+", label: "Industry domains" },
        { value: "100%", label: "Stack ownership" },
    ];

    const orbitalBodies = useMemo(
        () => [
            { id: "planet-a", size: 12, top: "14%", left: "10%", hue: "accent", moon: false },
            { id: "planet-b", size: 40, top: "26%", left: "84%", hue: "primary", moon: false },
            { id: "planet-c", size: 36, top: "72%", left: "80%", hue: "accent", moon: true },
            { id: "planet-d", size: 26, top: "80%", left: "24%", hue: "primary", moon: false },
        ],
        []
    );
    // ✅ SECTION-BASED SCROLL
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"], // was ["start end", "end start"]
    });

    // ✅ PARALLAX VALUES
    const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]); // fastest (background glow)
    const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const yMid = useTransform(scrollYProgress, [0, 1], [0, 80]);  // aurora layer
    const yFront = useTransform(scrollYProgress, [0, 1], [0, 40]);  // icons — slowest (visually closest)


    return (
        <Box
            ref={ref}
            id="hero"
            component="section"
            sx={{
                minHeight: { xs: "100vh", md: "120vh" },
                display: "flex",
                alignItems: "center",
                px: { xs: 3, md: 8, lg: 16 },
                mt: { xs: -3, md: -10 },
                py: { xs: 10, md: 0 },
                position: "relative",
                overflow: "hidden",
                flexDirection: { xs: "column", md: "row" },
                textAlign: { xs: "center", md: "left" },
            }}
        >
            {/* 🔥 BACKGROUND GLOW */}

            <Box
                component="header"
                sx={{
                    position: "absolute",
                    top: { xs: 40, md: 104 },
                    left: { xs: 16, md: 56, lg: 96 },
                    right: { xs: 16, md: 56, lg: 96 },
                    zIndex: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    px: { xs: 1.2, md: 1.6 },
                    py: 1,
                    borderRadius: 999,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
                    background: alpha(theme.palette.background.default, 0.52),
                    backdropFilter: "blur(12px)",
                    boxShadow: `0 10px 34px ${alpha(theme.palette.primary.main, 0.12)}`,
                }}
            >
                <Box
                    component="a"
                    href="#hero"
                    onClick={(event) => {
                        event.preventDefault();
                        onSectionSelect?.(0);
                    }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.1,
                        minWidth: 0,
                        color: "inherit",
                        textDecoration: "none",
                        borderRadius: 999,
                        pr: { xs: 0.4, md: 1 },
                        "&:focus-visible": {
                            outline: `2px solid ${alpha(theme.palette.accent.main, 0.6)}`,
                            outlineOffset: 3,
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: 30, md: 34 },
                            height: { xs: 30, md: 34 },
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            flexShrink: 0,
                            color: "text.primary",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 900,
                            fontSize: { xs: "0.7rem", md: "0.78rem" },
                            border: `1px solid ${alpha(theme.palette.accent.main, 0.42)}`,
                            background: `radial-gradient(circle at 35% 25%, ${alpha(theme.palette.accent.main, 0.22)}, ${alpha(theme.palette.primary.main, 0.08)})`,
                            boxShadow: `0 0 18px ${alpha(theme.palette.accent.main, 0.18)}`,
                        }}
                    >
                        DB
                    </Box>
                    <Box sx={{ minWidth: 0, textAlign: "left" }}>
                        <Typography
                            sx={{
                                color: "text.primary",
                                fontWeight: 850,
                                fontSize: { xs: "0.76rem", md: "0.9rem" },
                                lineHeight: 1.05,
                                whiteSpace: "nowrap",
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            Dhrubashis Basak
                        </Typography>
                    </Box>
                </Box>
                <Box
                    component="nav"
                    aria-label="Primary sections"
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: { xs: 0.4, md: 0.8 },
                        overflowX: "auto",
                        scrollbarWidth: "none",
                        minWidth: 0,
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                >
                    {sections.map((section, index) => (
                        <Button
                            key={section.id}
                            size="small"
                            href={`#${section.id}`}
                            onClick={(event) => {
                                event.preventDefault();
                                onSectionSelect?.(index);
                            }}
                            sx={{
                                minWidth: "auto",
                                px: { xs: 1, md: 1.25 },
                                py: 0.7,
                                borderRadius: 999,
                                color: "text.secondary",
                                fontWeight: 750,
                                fontSize: { xs: "0.66rem", md: "0.74rem" },
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                                whiteSpace: "nowrap",
                                "&:hover, &:focus-visible": {
                                    color: "text.primary",
                                    background: alpha(theme.palette.primary.main, 0.12),
                                },
                            }}
                        >
                            {section.title}
                        </Button>
                    ))}
                </Box>
            </Box>

            <motion.div
                style={{
                    y: yBg,
                    scale: scaleBg,
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "20%",
                        left: "10%",
                        width: 400,
                        height: 400,
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${alpha(
                            theme.palette.primary.main,
                            0.15
                        )}, transparent 70%)`,
                        filter: "blur(40px)",
                    }}
                />
            </motion.div>

            {/* STRUCTURED CONSTELLATION BACKGROUND */}
            <Constellations
                yMid={yMid}
                parallaxX={0}
                auroraDriftY={0}
            />


            {/* 🧠 MAIN CONTENT */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 5,
                    width: "100%",
                    maxWidth: "1400px",
                    mx: "auto",
                    display: "flex",
                    alignItems: { xs: "center", md: "center" },
                    justifyContent: { xs: "center", md: "space-between" },
                    gap: { xs: 6, md: 10 },
                    flexDirection: { xs: "column-reverse", md: "row" },
                }}
            >
                {/* LEFT */}
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: { xs: 560, md: 800 },
                        mx: { xs: "auto", md: 0 },
                    }}
                >
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                        {/* Name — clean, full weight, no tricks */}
                        <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>
                            <motion.span
                                animate={{ rotate: [0, 18, -8, 18, 0] }}
                                transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
                                style={{ display: "inline-block", marginRight: 6 }}
                            >
                                👋
                            </motion.span>
                            Hey there, I'm
                        </Typography>
                        <Typography sx={{
                            display: "block",
                            fontWeight: 200,
                            fontSize: { xs: "2.2rem", md: "3.4rem" },
                            fontFamily: "'JetBrains Mono', monospace",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.05,
                            color: "text.primary",
                        }}>

                            <motion.span
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                style={{ display: "inline-block" }}
                            >
                                <Box component="span" sx={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontWeight: 700,
                                    fontSize: { xs: "2rem", md: "3.2rem" },
                                    letterSpacing: "-0.03em",
                                    background: `linear-gradient(45deg, white, ${theme.palette.accent.main})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}>
                                    Dhrubashis{" "}Basak
                                </Box>
                            </motion.span>
                        </Typography>
                        {/* Status badge */}
                        <Stack direction="row" alignItems="center" gap={1} mb={1.4} sx={{ my: 2 }}>
                            <Box sx={{
                                display: "inline-flex", alignItems: "center", gap: 1,
                                px: 1.4, py: 0.6, borderRadius: 999,
                                border: `1px solid ${alpha(theme.palette.accent.main, 0.28)}`,
                                background: alpha(theme.palette.accent.main, 0.06),
                            }}>
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: theme.palette.accent.main, boxShadow: `0 0 8px ${alpha(theme.palette.accent.main, 0.8)}` }} />
                                </motion.div>
                                <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "text.secondary" }}>
                                    Full Stack Engineer
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: "inline-flex", alignItems: "center", gap: 1,
                                px: 1.4, py: 0.6, borderRadius: 999,
                                border: `1px solid ${alpha(theme.palette.accent.main, 0.28)}`,
                                background: alpha(theme.palette.accent.main, 0.06),
                            }}>
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: theme.palette.accent.secondary, boxShadow: `0 0 8px ${alpha(theme.palette.accent.secondary, 0.8)}` }} />
                                </motion.div>
                                <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "text.secondary" }}>
                                    System Builder
                                </Typography>
                            </Box>
                        </Stack>

                    </motion.div>
                    {/* <Box
                        sx={{
                            my: 1,
                            display: "flex",
                            gap: 1,
                            flexWrap: "wrap",
                            justifyContent: { xs: "center", md: "flex-start" },
                        }}
                    >
                        {["Healthcare", "Fintech", "AI Systems"].map((tag) => (
                            <Chip
                                key={tag}
                                size="small"
                                icon={<WorkspacePremiumIcon />}
                                label={tag}
                                variant="outlined"
                                sx={{
                                    borderColor: theme.palette.primary.border,
                                    background: alpha(theme.palette.primary.main, 0.06),
                                    p: 1,
                                    fontSize: 12
                                }}
                            />
                        ))}
                    </Box> */}
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 700,
                                lineHeight: 1.15,
                                fontSize: { xs: "1.8rem", md: "3.2rem" },
                                textAlign: { xs: "center", md: "left" },
                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Designing &amp; Engineering
                            <br />

                            complete product systems.
                        </Typography>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Typography sx={{ mt: 2.5, color: "text.secondary", lineHeight: 1.8, fontSize: { xs: "0.85rem", md: "1rem" }, maxWidth: 760, mb: 4 }}>
                            From responsive user interfaces and design systems to API contracts,
                            schema architecture, distributed workflows, and batch processing pipelines —
                            built and shipped full-stack solutions across regulated production
                            environments with a focus on scalability, reliability, and maintainability.
                        </Typography>
                        <Box sx={{ display: "flex", gap: 3, mt: 3, flexWrap: "wrap" }}>
                            {stats.map((s, i) => (
                                <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.08 }}>
                                    <Typography sx={{ fontWeight: 800, fontSize: "1.4rem", background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                        {s.value}
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.72rem", color: "text.secondary", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                                        {s.label}
                                    </Typography>
                                </motion.div>
                            ))}
                        </Box>
                    </motion.div>

                    <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-start" } }}>
                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                            <Button
                                href="#experience"
                                variant="contained"
                                sx={{
                                    px: 3.2, py: 1.2,
                                    borderRadius: 999,
                                    fontWeight: 700,
                                    fontSize: "0.85rem",
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main} 120%)`,
                                    boxShadow: `0 0 24px ${alpha(theme.palette.primary.main, 0.45)}`,
                                    transition: "box-shadow 0.3s ease",
                                    "&:hover": {
                                        boxShadow: `0 0 36px ${alpha(theme.palette.primary.main, 0.65)}`,
                                        background: `linear-gradient(90deg, ${theme.palette.primary.main} -20%, ${theme.palette.accent.main} 140%)`,
                                    },
                                }}
                            >
                                View Work
                            </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                            <Button
                                href="tel:+919903859325"
                                variant="outlined"
                                startIcon={<LocalPhoneRoundedIcon fontSize="small" />}
                                sx={{
                                    px: 3.2, py: 1.2,
                                    borderRadius: 999,
                                    fontWeight: 700,
                                    fontSize: "0.85rem",
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    borderColor: alpha(theme.palette.accent.main, 0.5),
                                    color: "text.primary",
                                    backdropFilter: "blur(8px)",
                                    background: alpha(theme.palette.accent.main, 0.06),
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        borderColor: theme.palette.accent.main,
                                        background: alpha(theme.palette.accent.main, 0.12),
                                        boxShadow: `0 0 20px ${alpha(theme.palette.accent.main, 0.25)}`,
                                    },
                                }}
                            >
                                Get in Touch
                            </Button>
                        </motion.div>
                    </Box>
                </Box>

                {/* RIGHT */}
                <motion.div style={{ y: yFront, position: "relative", zIndex: 6, display: { xs: "flex", md: "flex" } }}>
                    <Box
                        sx={{
                            width: { xs: 260, md: 400 },
                            height: { xs: 260, md: 400 },
                            borderRadius: "50%",
                            display: { xs: "flex", md: "flex" },
                            alignItems: "center",
                            justifyContent: "center",
                            background: alpha(theme.palette.primary.main, 0.16),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                            boxShadow: `0 0 90px ${alpha(theme.palette.primary.main, 0.3)}`,
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                                width: "75%",
                                height: "75%",
                                borderRadius: "50%",
                                background: theme.palette.background.paper,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                                boxShadow: `0 0 45px ${alpha(theme.palette.primary.main, 0.2)}`,
                                overflow: "hidden",
                            }}
                        >
                            <Box
                                component="img"
                                src={portrait1}
                                alt="Dhrubashis Basak portrait"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                position: "absolute",
                                width: "95%",
                                height: "95%",
                                borderRadius: "50%",
                                border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                            }}
                        />
                        {orbitalBodies.map((body, index) => (
                            <Box
                                key={body.id}
                                sx={{
                                    position: "absolute",
                                    top: body.top,
                                    left: body.left,
                                    transform: "translate(-50%, -50%)",
                                    opacity: index % 2 === 0 ? 0.92 : 0.78,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: body.size,
                                        height: body.size,
                                        borderRadius: "50%",
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.34)}`,
                                        background:
                                            body.hue === "accent"
                                                ? `radial-gradient(circle at 30% 30%, ${alpha(theme.palette.accent.main, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.42)} 68%, ${alpha(theme.palette.primary.main, 0.16)} 100%)`
                                                : `radial-gradient(circle at 35% 28%, ${alpha("#93c5fd", 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.42)} 68%, ${alpha(theme.palette.primary.main, 0.16)} 100%)`,
                                        boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                                        position: "relative",
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: "22%",
                                            left: "26%",
                                            width: body.size * 0.18,
                                            height: body.size * 0.18,
                                            borderRadius: "50%",
                                            background: "rgba(255,255,255,0.75)",
                                            filter: "blur(0.5px)",
                                        },
                                    }}
                                />
                                {body.moon && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            inset: -10,
                                            borderRadius: "50%",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: "8%",
                                                left: "50%",
                                                width: 7,
                                                height: 7,
                                                borderRadius: "50%",
                                                background: alpha("#e2e8f0", 0.95),
                                                boxShadow: `0 0 10px ${alpha("#e2e8f0", 0.75)}`,
                                            }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        ))}
                        {[0, 1, 2].map((star) => (
                            <Box
                                key={`hero-star-${star}`}
                                sx={{
                                    position: "absolute",
                                    top: star === 0 ? "10%" : star === 1 ? "62%" : "86%",
                                    left: star === 0 ? "58%" : star === 1 ? "12%" : "64%",
                                    width: 4,
                                    height: 4,
                                    borderRadius: "50%",
                                    background: "rgba(224,231,255,0.95)",
                                    boxShadow: "0 0 10px rgba(224,231,255,0.75)",
                                    opacity: star === 1 ? 0.62 : 0.82,
                                }}
                            />
                        ))}
                    </Box>
                </motion.div>
            </Box>
        </Box>
    );
}
