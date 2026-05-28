import {
    Box,
    Typography,
    Button,
    useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Constellations from "../../components/constellations/Constellations";
import portrait1 from "../../assets/images/potrait_1.png";

export default function HeroSection() {
    const theme = useTheme();
    const ref = useRef(null);

    const orbitalBodies = useMemo(
        () => [
            { id: "planet-a", size: 12, top: "14%", left: "10%", hue: "accent", moon: false },
            { id: "planet-b", size: 40, top: "26%", left: "84%", hue: "primary", moon: false },
            { id: "planet-c", size: 36, top: "72%", left: "80%", hue: "accent", moon: true },
            { id: "planet-d", size: 26, top: "80%", left: "24%", hue: "primary", moon: false },
        ],
        []
    );
    const quickMetrics = useMemo(
        () => [
            { label: "Experience", value: "3+ Years" },
            { label: "Projects", value: "7+ Delivered" },
            { label: "Focus", value: "Realtime + Systems" },
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
            sx={{
                minHeight: { xs: "100vh", md: "120vh" },
                display: "flex",
                alignItems: "center",
                px: { xs: 3, md: 8, lg: 16 },
                py: { xs: 10, md: 0 },
                position: "relative",
                overflow: "hidden",
                flexDirection: { xs: "column", md: "row" },
                textAlign: { xs: "center", md: "left" },
            }}
        >
            {/* 🔥 BACKGROUND GLOW */}

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
                        maxWidth: { xs: 560, md: 600 },
                        mx: { xs: "auto", md: 0 },
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Typography
                            sx={{
                                color: "text.primary",
                                fontSize: "0.95rem",
                                letterSpacing: "0.05em",
                                mb: 0.4,
                                fontWeight: 600,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 0.8,
                            }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    width: 7,
                                    height: 7,
                                    borderRadius: "50%",
                                    background: alpha(theme.palette.accent.main, 0.95),
                                    boxShadow: `0 0 12px ${alpha(theme.palette.accent.main, 0.7)}`,
                                }}
                            />
                            <Box
                                component="span"
                                sx={{
                                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Hi, I&apos;m Dhrubashis Basak
                            </Box>
                        </Typography>

                    </motion.div>
                    <Typography variant="overline" sx={{ color: "text.secondary" }}>
                        Full Stack Engineer • System Builder
                    </Typography>
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
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 700,
                                lineHeight: 1.2,
                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                textAlign: { xs: "center", md: "left" },
                                fontSize: { xs: "1.5rem", md: "3rem" },
                            }}
                        >
                            UI to Architecture
                            <br />
                            Designing &amp; Engineering
                            <br />
                            Systems.
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Typography sx={{ mt: 3, color: "text.secondary", lineHeight: 1.8, fontSize: { xs: ".8rem", md: "1rem" } }}>
                            I build complete product flows across the stack - from polished front-end UX to backend APIs,
                            real-time collaboration, data design, and scalable delivery workflows.
                        </Typography>
                    </motion.div>

                    <Box
                        sx={{
                            mt: 2.4,
                            display: "flex",
                            gap: 1.2,
                            flexWrap: "wrap",
                            justifyContent: { xs: "center", md: "flex-start" },
                        }}
                    >
                        {quickMetrics.map((metric) => (
                            <Box
                                key={metric.label}
                                sx={{
                                    px: 1.2,
                                    py: 0.85,
                                    borderRadius: 2,
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.28)}`,
                                    background: alpha(theme.palette.background.paper, 0.6),
                                    textAlign: "left",
                                    minWidth: { xs: 150, sm: 170, md: 116 },
                                }}
                            >
                                <Typography sx={{ fontSize: "0.9rem", color: "text.primary", fontWeight: 700 }}>
                                    {metric.value}
                                </Typography>
                                <Typography sx={{ fontSize: "0.68rem", color: "text.secondary", lineHeight: 1.1 }}>
                                    {metric.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: { xs: "center", md: "flex-start" }, }}>
                        <Button variant="contained" href="#timeline-start">View Work</Button>
                        <Button variant="outlined" href="tel:+919903859325">Contact</Button>
                    </Box>
                </Box>

                {/* RIGHT */}
                <motion.div style={{ y: yFront, position: "relative", zIndex: 6, display: { xs: "flex", md: "flex" } }}>
                    <Box
                        sx={{
                            width: { xs: 260, md: 440 },
                            height: { xs: 260, md: 440 },
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
