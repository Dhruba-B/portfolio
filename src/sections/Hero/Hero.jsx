import {
    Box,
    Typography,
    Button,
    Chip,
    useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useMemo, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Constellations from "../../components/constellations/Constellations";
import portrait1 from "../../assets/images/potrait_1.png";

export default function HeroSection() {
    const theme = useTheme();
    const ref = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const parallaxX = useSpring(mouseX, { stiffness: 40, damping: 16 });
    const parallaxY = useSpring(mouseY, { stiffness: 40, damping: 16 });
    const auroraDriftY = useTransform(parallaxY, [-10, 10], [-10, 10]);

    const orbitalBodies = useMemo(
        () => [
            { id: "planet-a", size: 42, top: "14%", left: "22%", hue: "accent", moon: true },
            { id: "planet-b", size: 30, top: "26%", left: "84%", hue: "primary", moon: false },
            { id: "planet-c", size: 36, top: "72%", left: "80%", hue: "accent", moon: true },
            { id: "planet-d", size: 26, top: "80%", left: "24%", hue: "primary", moon: false },
        ],
        []
    );
    const constellationNodes = useMemo(
        () =>
            Array.from({ length: 18 }, (_, i) => ({
                id: i,
                x: 8 + ((i * 31) % 82),
                y: 10 + ((i * 37) % 76),
                size: i % 3 === 0 ? 4 : 3,
            })),
        []
    );
    const quickMetrics = useMemo(
        () => [
            { label: "Experience", value: "3+ Years" },
            { label: "Projects", value: "5+ Delivered" },
            { label: "Delivery", value: "Frontend to Backend" },
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
                minHeight: "120vh",
                display: "flex",
                alignItems: "center",
                px: { xs: 3, md: 8, lg: 16 },
                position: "relative",
                overflow: "hidden",
                flexDirection: { xs: "column", md: "row", },
                textAlign: { xs: "center", md: "left" },
            }}
            onMouseMove={(event) => {
                const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
                const nx = ((event.clientX - left) / width - 0.5) * 16;
                const ny = ((event.clientY - top) / height - 0.5) * 16;
                mouseX.set(nx);
                mouseY.set(ny);
            }}
            onMouseLeave={() => {
                mouseX.set(0);
                mouseY.set(0);
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
                parallaxX={parallaxX}
                auroraDriftY={auroraDriftY}
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
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    flexDirection: { xs: "column", md: "row" },
                }}
            >
                {/* LEFT */}
                <Box sx={{ maxWidth: 600 }}>
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
                            I build complete product flows across the stack — from front-end UX to backend APIs, data design,
                            and delivery workflows with clean version control practices.
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
                                    minWidth: 116,
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
                <motion.div style={{ y: yFront, position: "relative", zIndex: 6, display: { xs: "none", md: "flex" } }}>
                    <Box
                        sx={{
                            width: { xs: 260, md: 340 },
                            height: { xs: 260, md: 340 },
                            borderRadius: "50%",
                            display: { xs: "none", md: "flex" },
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
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                            style={{
                                position: "absolute",
                                width: "95%",
                                height: "95%",
                                borderRadius: "50%",
                                border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                            }}
                        />
                        {orbitalBodies.map((body, index) => (
                            <motion.div
                                key={body.id}
                                animate={{ y: [0, -4, 0], x: [0, 2, 0] }}
                                transition={{
                                    duration: 10 + index * 1.4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    position: "absolute",
                                    top: body.top,
                                    left: body.left,
                                    transform: "translate(-50%, -50%)",
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
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 12 + index * 0.8,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        style={{
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
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                        {[0, 1, 2].map((star) => (
                            <motion.div
                                key={`hero-star-${star}`}
                                animate={{ opacity: [0.25, 0.95, 0.25], scale: [0.85, 1.2, 0.85] }}
                                transition={{
                                    duration: 3.4 + star * 1.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    position: "absolute",
                                    top: star === 0 ? "10%" : star === 1 ? "62%" : "86%",
                                    left: star === 0 ? "58%" : star === 1 ? "12%" : "64%",
                                    width: 4,
                                    height: 4,
                                    borderRadius: "50%",
                                    background: "rgba(224,231,255,0.95)",
                                    boxShadow: "0 0 10px rgba(224,231,255,0.75)",
                                }}
                            />
                        ))}
                    </Box>
                </motion.div>
            </Box>
        </Box>
    );
}