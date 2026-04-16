import { Box, Chip, Typography, Button, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import reactLogo from "../../assets/react.svg";
import jsLogo from "../../assets/icons/js.svg";
import javaLogo from "../../assets/icons/java.svg";
import springLogo from "../../assets/icons/spring.svg";
import mysqlLogo from "../../assets/icons/mysql.svg";
import gitLogo from "../../assets/icons/git.svg";

// ─── Cosmic Icon Visual ───────────────────────────────────────────────────────
// Fully replaces TimelineVisual with a self-contained celestial orb scene
function CosmicIconVisual({ Icon, index, feature, parallaxX, parallaxY }) {
    const theme = useTheme();
    const isSmallDevice = useMediaQuery(theme.breakpoints.down("sm"));
    const [hovered, setHovered] = useState(false);

    // Deterministic randomness per index so each item feels unique
    const seed = (index * 137.508) % 360;
    const hue1 = seed;
    const hue2 = (seed + 60) % 360;
    const hue3 = (seed + 140) % 360;

    const orbitals = [
        { r: 68,  size: 7,  duration: 7.2,  delay: 0,    opacity: 0.85 },
        { r: 92,  size: 5,  duration: 11.5, delay: -3.1, opacity: 0.65 },
        { r: 116, size: 4,  duration: 17.0, delay: -6.4, opacity: 0.50 },
        { r: 82,  size: 3,  duration: 9.0,  delay: -4.5, opacity: 0.40 },
    ];

    // Floating star positions — stable across renders
    const stars = useRef(
        Array.from({ length: 28 }, (_, i) => ({
            x: Math.sin(i * 43.7) * 50 + 50,
            y: Math.cos(i * 73.1) * 50 + 50,
            s: 0.8 + (Math.abs(Math.sin(i * 17.3)) * 2.2),
            d: 2.4 + (i % 5) * 0.7,
            delay: -(i * 0.31),
        }))
    ).current;

    return (
        <motion.div
            style={{ x: parallaxX, y: parallaxY }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            <Box
                sx={{
                    position: "relative",
                    width: { xs: 240, md: 320 },
                    height: { xs: 240, md: 320 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* ── Deep space background disc ── */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: `
                            radial-gradient(circle at 38% 36%,
                                hsl(${hue1}, 70%, 12%) 0%,
                                hsl(${hue2}, 55%, 8%) 38%,
                                hsl(${hue3}, 40%, 4%) 70%,
                                #050508 100%
                            )
                        `,
                        border: `1px solid ${alpha(`hsl(${hue1}, 80%, 60%)`, 0.18)}`,
                        boxShadow: hovered
                            ? `0 0 60px ${alpha(`hsl(${hue1}, 80%, 60%)`, 0.28)}, 0 0 120px ${alpha(`hsl(${hue2}, 70%, 50%)`, 0.15)}, inset 0 0 40px ${alpha(`hsl(${hue1}, 80%, 60%)`, 0.08)}`
                            : `0 0 30px ${alpha(`hsl(${hue1}, 80%, 60%)`, 0.14)}, 0 0 70px ${alpha(`hsl(${hue2}, 70%, 50%)`, 0.08)}, inset 0 0 20px ${alpha(`hsl(${hue1}, 80%, 60%)`, 0.05)}`,
                        transition: "box-shadow 0.5s ease",
                    }}
                />

                {/* ── Background star field ── */}
                <Box sx={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", zIndex: 1 }}>
                    {stars.map((star, i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [star.s * 0.2, star.s * 0.9, star.s * 0.2], scale: [0.7, 1.1, 0.7] }}
                            transition={{ duration: star.d, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: "absolute",
                                left: `${star.x}%`,
                                top: `${star.y}%`,
                                width: Math.max(1, star.s * 1.1),
                                height: Math.max(1, star.s * 1.1),
                                borderRadius: "50%",
                                background: `hsl(${(hue1 + i * 9) % 360}, 80%, 88%)`,
                                boxShadow: `0 0 ${star.s * 3}px hsl(${(hue1 + i * 9) % 360}, 90%, 80%)`,
                            }}
                        />
                    ))}
                </Box>

                {/* ── Nebula wisps ── */}
                <Box sx={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", zIndex: 2 }}>
                    {[0, 1, 2].map((n) => (
                        <motion.div
                            key={n}
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 28 + n * 12, repeat: Infinity, ease: "linear", delay: -n * 9 }}
                            style={{ position: "absolute", inset: 0, borderRadius: "50%" }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "50%",
                                    background: `radial-gradient(ellipse ${60 - n * 10}% ${40 - n * 5}% at ${30 + n * 20}% ${40 + n * 15}%,
                                        ${alpha(`hsl(${(hue1 + n * 40) % 360}, 80%, 55%)`, 0.07 - n * 0.01)} 0%,
                                        transparent 70%
                                    )`,
                                }}
                            />
                        </motion.div>
                    ))}
                </Box>

                {/* ── Orbital rings (SVG) ── */}
                {orbitals.map((orb, i) => {
                    const size = orb.r * 2 + 20;
                    const center = size / 2;
                    const tilt = 12 + i * 8;
                    return (
                        <Box
                            key={i}
                            sx={{
                                position: "absolute",
                                width: size,
                                height: size,
                                left: "50%",
                                top: "50%",
                                transform: `translate(-50%, -50%) rotateX(${tilt}deg) rotateZ(${seed + i * 45}deg)`,
                                zIndex: 3,
                                pointerEvents: "none",
                            }}
                        >
                            {/* Ring path */}
                            <svg width={size} height={size} style={{ position: "absolute", inset: 0 }}>
                                <circle
                                    cx={center} cy={center} r={orb.r}
                                    fill="none"
                                    stroke={`hsl(${(hue1 + i * 30) % 360}, 75%, 65%)`}
                                    strokeWidth="0.6"
                                    strokeDasharray="3 8"
                                    opacity={0.22}
                                />
                            </svg>
                            {/* Orbiting dot */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: orb.duration, delay: orb.delay, repeat: Infinity, ease: "linear" }}
                                style={{
                                    position: "absolute", inset: 0,
                                    transformOrigin: "center center",
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        width: orb.size,
                                        height: orb.size,
                                        borderRadius: "50%",
                                        top: center - orb.size / 2 - orb.r,
                                        left: center - orb.size / 2,
                                        background: `hsl(${(hue1 + i * 30) % 360}, 90%, 80%)`,
                                        boxShadow: `0 0 ${orb.size * 3}px ${orb.size}px hsl(${(hue1 + i * 30) % 360}, 90%, 70%)`,
                                        opacity: orb.opacity,
                                    }}
                                />
                            </motion.div>
                        </Box>
                    );
                })}

                {/* ── Feature badge: extra corona ring ── */}
                {feature && (
                    <motion.div
                        animate={{ rotate: -360, scale: [1, 1.04, 1] }}
                        transition={{ rotate: { duration: 22, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                        style={{
                            position: "absolute",
                            inset: -8,
                            borderRadius: "50%",
                            border: `1.5px solid ${alpha(`hsl(${hue1}, 90%, 70%)`, 0.38)}`,
                            boxShadow: `0 0 18px ${alpha(`hsl(${hue1}, 90%, 70%)`, 0.22)}`,
                            zIndex: 4,
                        }}
                    />
                )}

                {/* ── Central glow core ── */}
                <Box
                    sx={{
                        position: "absolute",
                        width: 90,
                        height: 90,
                        borderRadius: "50%",
                        background: `radial-gradient(circle,
                            ${alpha(`hsl(${hue1}, 80%, 70%)`, 0.22)} 0%,
                            ${alpha(`hsl(${hue2}, 70%, 60%)`, 0.10)} 45%,
                            transparent 70%
                        )`,
                        zIndex: 5,
                        filter: "blur(6px)",
                    }}
                />

                {/* ── Icon container ── */}
                <motion.div
                    animate={
                        hovered
                            ? { scale: 1.12, y: -4 }
                            : { scale: [1, 1.04, 1], y: [0, -5, 0] }
                    }
                    transition={
                        hovered
                            ? { duration: 0.3, ease: "easeOut" }
                            : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                    }
                    style={{ position: "relative", zIndex: 6 }}
                >
                    {/* Faceted glass shell */}
                    <Box
                        sx={{
                            width: { xs: 68, md: 80 },
                            height: { xs: 68, md: 80 },
                            borderRadius: "28%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            background: `
                                linear-gradient(135deg,
                                    ${alpha(`hsl(${hue1}, 60%, 30%)`, 0.75)} 0%,
                                    ${alpha(`hsl(${hue2}, 50%, 20%)`, 0.85)} 50%,
                                    ${alpha(`hsl(${hue3}, 55%, 15%)`, 0.90)} 100%
                                )
                            `,
                            border: `1px solid ${alpha(`hsl(${hue1}, 85%, 70%)`, 0.35)}`,
                            boxShadow: `
                                0 0 0 1px ${alpha(`hsl(${hue1}, 85%, 70%)`, 0.12)},
                                0 8px 32px ${alpha(`hsl(${hue1}, 80%, 50%)`, 0.35)},
                                0 2px 8px ${alpha("#000", 0.5)},
                                inset 0 1px 0 ${alpha("#fff", 0.18)},
                                inset 0 -1px 0 ${alpha("#000", 0.25)}
                            `,
                            backdropFilter: "blur(12px)",
                            overflow: "hidden",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                inset: 0,
                                borderRadius: "inherit",
                                background: `linear-gradient(135deg, ${alpha("#fff", 0.14)} 0%, transparent 55%)`,
                                pointerEvents: "none",
                            },
                        }}
                    >
                        {Icon && (
                            <Icon
                                sx={{
                                    fontSize: { xs: 30, md: 36 },
                                    color: `hsl(${hue1}, 85%, 85%)`,
                                    filter: `drop-shadow(0 0 8px hsl(${hue1}, 90%, 70%)) drop-shadow(0 0 20px hsl(${hue2}, 80%, 60%))`,
                                    position: "relative",
                                    zIndex: 1,
                                }}
                            />
                        )}
                    </Box>

                    {/* Reflection shimmer on icon shell */}
                    <motion.div
                        animate={{ opacity: [0, 0.6, 0], x: [-20, 20] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.8 }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "28%",
                            background: `linear-gradient(105deg, transparent 30%, ${alpha("#fff", 0.18)} 50%, transparent 70%)`,
                            pointerEvents: "none",
                            zIndex: 7,
                        }}
                    />
                </motion.div>

                {/* ── Subtle index badge ── */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: { xs: 18, md: 24 },
                        right: { xs: 18, md: 24 },
                        zIndex: 8,
                        px: 1.1,
                        py: 0.35,
                        borderRadius: 99,
                        background: alpha(`hsl(${hue1}, 60%, 15%)`, 0.85),
                        border: `1px solid ${alpha(`hsl(${hue1}, 80%, 60%)`, 0.3)}`,
                        backdropFilter: "blur(6px)",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            color: `hsl(${hue1}, 80%, 75%)`,
                            lineHeight: 1,
                        }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </Typography>
                </Box>
            </Box>
        </motion.div>
    );
}

// ─── 3D Tilt Card ────────────────────────────────────────────────────────────
function TiltCard({ children, isSmallDevice, isActive, theme, allowOverflow }) {
    const cardRef = useRef(null);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const glareX = useMotionValue(50);
    const glareY = useMotionValue(50);
    const springConfig = { stiffness: 180, damping: 28, mass: 0.6 };
    const smoothX = useSpring(rawX, springConfig);
    const smoothY = useSpring(rawY, springConfig);
    const rotateY = useTransform(smoothX, [-1, 1], [-12, 12]);
    const rotateX = useTransform(smoothY, [-1, 1], [10, -10]);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (isSmallDevice || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        rawX.set((x - 0.5) * 2);
        rawY.set((y - 0.5) * 2);
        glareX.set(x * 100);
        glareY.set(y * 100);
    };

    const handleMouseLeave = () => {
        rawX.set(0); rawY.set(0);
        glareX.set(50); glareY.set(50);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => !isSmallDevice && setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: isSmallDevice ? 0 : rotateX,
                rotateY: isSmallDevice ? 0 : rotateY,
                transformStyle: "preserve-3d",
                transformPerspective: 900,
                scale: isHovered ? 1.018 : 1,
                transition: "scale 0.3s ease",
                borderRadius: 16,
                position: "relative",
            }}
        >
            <Box
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: 4,
                    position: "relative",
                    background: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.primary.border}`,
                    backdropFilter: "blur(12px)",
                    textAlign: "left",
                    boxShadow: isActive
                        ? `0 20px 70px ${theme.palette.primary.glow}`
                        : isHovered
                            ? `0 28px 80px ${alpha(theme.palette.primary.main, 0.22)}, 0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`
                            : "0 4px 24px rgba(0,0,0,0.12)",
                    overflow: allowOverflow ? "visible" : "hidden",
                    transition: "box-shadow 0.35s ease",
                }}
            >
                {!isSmallDevice && (
                    <motion.div
                        style={{
                            position: "absolute", inset: 0, pointerEvents: "none",
                            borderRadius: "inherit", zIndex: 10,
                            opacity: isHovered ? 1 : 0,
                            transition: "opacity 0.3s ease",
                            background: useTransform(
                                [glareX, glareY],
                                ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, ${alpha("#ffffff", 0.13)} 0%, transparent 65%)`
                            ),
                        }}
                    />
                )}
                {!isSmallDevice && (
                    <motion.div
                        style={{
                            position: "absolute", top: 0, left: 0, right: 0, height: 1,
                            background: useTransform(
                                smoothY, [-1, 0, 1],
                                [
                                    `linear-gradient(90deg, ${alpha("#fff", 0.55)}, ${alpha("#fff", 0.18)})`,
                                    `linear-gradient(90deg, ${alpha("#fff", 0.1)}, ${alpha("#fff", 0.06)})`,
                                    `linear-gradient(90deg, ${alpha("#fff", 0.02)}, transparent)`,
                                ]
                            ),
                            borderRadius: "16px 16px 0 0", pointerEvents: "none", zIndex: 11,
                        }}
                    />
                )}
                {children}
            </Box>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TimelineItem({ item, index, isActive }) {
    const theme = useTheme();
    const isSmallDevice = useMediaQuery(theme.breakpoints.down("sm"));
    const [isExpandedMobile, setIsExpandedMobile] = useState(false);
    const [isCaseStudyHovered, setIsCaseStudyHovered] = useState(false);
    const [activeCaseImage, setActiveCaseImage] = useState(0);
    const [caseProgress, setCaseProgress] = useState(0);
    const [progressTransition, setProgressTransition] = useState("none");
    const isLeft = index % 2 === 0;
    const Icon = item.icon;
    const caseIntervalMs = 4800;
    const caseImages = item.caseStudy?.images ?? (item.caseStudy?.image ? [item.caseStudy.image] : []);
    const caseStudyRef = useRef(null);
    const previousProgressRef = useRef(0);

    const parallaxMultiplier = item.feature ? 1.3 : 0.85;
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const visualX = useTransform(mouseX, (v) => v * 0.55 * parallaxMultiplier * -1);
    const visualY = useTransform(mouseY, (v) => v * 0.55 * parallaxMultiplier * -1);

    const stackIconMap = useRef({
        react: reactLogo,
        "react native": reactLogo,
        javascript: jsLogo,
        js: jsLogo,
        java: javaLogo,
        "spring boot": springLogo,
        "spring batch": springLogo,
        spring: springLogo,
        mysql: mysqlLogo,
        git: gitLogo,
    });

    const getStackIconSrc = (label) => {
        const key = String(label ?? "").trim().toLowerCase();
        return stackIconMap.current[key] ?? null;
    };

    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    };

    useEffect(() => {
        if (isSmallDevice || !isCaseStudyHovered || caseImages.length <= 1) {
            setCaseProgress(0);
            return;
        }
        const startedAt = Date.now();
        const timer = setInterval(() => {
            const elapsed = Date.now() - startedAt;
            const inCycle = elapsed % caseIntervalMs;
            const nextIndex = Math.floor(elapsed / caseIntervalMs) % caseImages.length;
            const nextProgress = (inCycle / caseIntervalMs) * 100;
            setActiveCaseImage(nextIndex);
            setProgressTransition(nextProgress < previousProgressRef.current ? "none" : "width 60ms linear");
            setCaseProgress(nextProgress);
            previousProgressRef.current = nextProgress;
        }, 60);
        return () => clearInterval(timer);
    }, [isCaseStudyHovered, isSmallDevice, caseImages.length]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                px: { xs: 3, md: 8, lg: 16 },
                py: { xs: 6, md: 10 },
                position: "relative",
            }}
        >
            {/* Background glow */}
            <Box
                sx={{
                    position: "absolute", inset: 0,
                    background: `radial-gradient(circle at 50% 50%, ${alpha(theme.palette.primary.main, 0.08)}, transparent 58%)`,
                    filter: "blur(2px)", zIndex: -1,
                }}
            />

            <Box
                sx={{
                    width: "100%", maxWidth: "1600px", mx: "auto",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: { xs: 3, md: 6 },
                }}
                onMouseMove={(e) => {
                    if (isSmallDevice) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
                    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 10);
                }}
                onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            >
                {/* LEFT / TEXT */}
                <Box
                    sx={{
                        flex: 1, display: "flex",
                        justifyContent: isLeft ? "flex-end" : "flex-start",
                        order: { xs: 1, md: isLeft ? 1 : 3 },
                        position: "relative",
                    }}
                >
                    {/* Connector line */}
                    <Box
                        sx={{
                            display: { xs: "none", md: "block" },
                            position: "absolute", top: "50%",
                            transform: "translateY(-50%)",
                            right: isLeft ? -40 : "auto",
                            left: isLeft ? "auto" : -40,
                            width: 40, height: "2px",
                            background: `linear-gradient(to ${isLeft ? "right" : "left"}, ${theme.palette.primary.main}, transparent)`,
                            opacity: 0.6,
                        }}
                    />

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-100px" }}
                        style={{ width: "100%", maxWidth: 600 }}
                    >
                        <TiltCard
                            isSmallDevice={isSmallDevice}
                            isActive={isActive}
                            theme={theme}
                            allowOverflow={!!item.caseStudy || !!item.feature}
                        >
                            {item.feature && (
                                <motion.div
                                    animate={{ y: [0, -7, 0], rotate: [0, 2, 0] }}
                                    transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ position: "absolute", top: -14, right: 20, zIndex: 12 }}
                                >
                                    <Box
                                        sx={{
                                            px: 1.2, py: 0.45, borderRadius: 999,
                                            display: "flex", alignItems: "center", gap: 0.7,
                                            background: `linear-gradient(120deg, ${alpha(theme.palette.accent.main, 0.26)}, ${alpha(theme.palette.primary.main, 0.14)})`,
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                                            boxShadow: `0 0 22px ${alpha(theme.palette.accent.main, 0.35)}`,
                                        }}
                                    >
                                        <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: alpha(theme.palette.accent.main, 0.95), boxShadow: `0 0 10px ${alpha(theme.palette.accent.main, 0.8)}` }} />
                                        <Typography sx={{ fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "text.primary", fontWeight: 700, lineHeight: 1 }}>
                                            Feature
                                        </Typography>
                                    </Box>
                                </motion.div>
                            )}

                            <motion.div variants={itemVariant}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 0.5, gap: 1.5 }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: { xs: "1.35rem", md: "2rem" },
                                            lineHeight: 1.28, fontWeight: 600,
                                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
                                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Box>
                            </motion.div>

                            <motion.div variants={itemVariant}>
                                <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: "0.08em" }}>
                                    {item.period}
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariant}>
                                <Typography sx={{ color: "text.primary", lineHeight: 1.7, fontSize: { xs: "0.92rem", md: "0.98rem" }, fontWeight: 500, mb: 2 }}>
                                    {item.subtitle}
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariant}>
                                <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mb: 2.5 }}>
                                    {item.stack?.map((skill) => (
                                        <Chip
                                            key={skill}
                                            icon={
                                                getStackIconSrc(skill) ? (
                                                    <Box component="img" src={getStackIconSrc(skill)} alt="" aria-hidden="true"
                                                        sx={{ width: 18, height: 18, borderRadius: "6px", filter: `drop-shadow(0 0 10px ${alpha(theme.palette.primary.main, 0.25)})` }}
                                                    />
                                                ) : undefined
                                            }
                                            label={skill}
                                            size="small"
                                            sx={{
                                                borderColor: theme.palette.primary.border,
                                                color: "text.secondary",
                                                background: alpha(theme.palette.primary.main, 0.08),
                                                "& .MuiChip-icon": { ml: "8px", mr: "-4px" },
                                                "& .MuiChip-label": { px: 1, fontSize: { xs: "0.68rem", md: "0.75rem" } },
                                            }}
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>
                            </motion.div>

                            {item.highlights?.length > 0 && isSmallDevice && (
                                <Box>
                                    <Button size="small" variant="outlined"
                                        onClick={() => setIsExpandedMobile((p) => !p)}
                                        sx={{ mb: 1.4, borderColor: theme.palette.primary.border, color: "text.secondary", textTransform: "none" }}
                                    >
                                        {isExpandedMobile ? "Hide highlights" : "Show highlights"}
                                    </Button>
                                </Box>
                            )}

                            {!isSmallDevice && (
                                <motion.div variants={itemVariant}>
                                    <Box sx={{ display: "grid", gap: 1.4 }}>
                                        {item.highlights?.map((point) => (
                                            <Typography key={point} sx={{ color: "text.secondary", lineHeight: 1.65, fontSize: "0.98rem", display: "flex", alignItems: "flex-start", gap: 1 }}>
                                                <Box component="span" sx={{ width: 6, height: 6, mt: "10px", borderRadius: "50%", backgroundColor: "primary.main", flexShrink: 0 }} />
                                                {point}
                                            </Typography>
                                        ))}
                                    </Box>
                                </motion.div>
                            )}

                            {isSmallDevice && (
                                <AnimatePresence initial={false}>
                                    {isExpandedMobile && (
                                        <motion.div key="mobile-highlights"
                                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: "easeOut" }}
                                            style={{ overflow: "hidden" }}
                                        >
                                            <Box sx={{ display: "grid", gap: 1.4, pb: 0.2 }}>
                                                {item.highlights?.map((point) => (
                                                    <Typography key={point} sx={{ color: "text.secondary", lineHeight: 1.65, fontSize: "0.95rem", display: "flex", alignItems: "flex-start", gap: 1 }}>
                                                        <Box component="span" sx={{ width: 6, height: 6, mt: "10px", borderRadius: "50%", backgroundColor: "primary.main", flexShrink: 0 }} />
                                                        {point}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}

                            {!item.highlights?.length && (
                                <motion.div variants={itemVariant}>
                                    <Typography sx={{ color: "text.secondary", lineHeight: 1.8, fontSize: "1.05rem" }}>
                                        {item.desc}
                                    </Typography>
                                </motion.div>
                            )}

                            {item.caseStudy && (
                                <Box
                                    ref={caseStudyRef}
                                    onMouseEnter={() => !isSmallDevice && setIsCaseStudyHovered(true)}
                                    onMouseLeave={() => !isSmallDevice && setIsCaseStudyHovered(false)}
                                    sx={{
                                        position: "relative", mt: 2.2, p: 1.5, borderRadius: 2.5,
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
                                        background: alpha(theme.palette.background.paper, 0.55),
                                        zIndex: 3,
                                        cursor: !isSmallDevice && caseImages.length > 0 ? "pointer" : "default",
                                    }}
                                >
                                    {[0, 1].map((cueStar) => (
                                        <motion.div key={`cue-star-${cueStar}`}
                                            animate={{ opacity: [0.25, 0.85, 0.25], scale: [0.9, 1.15, 0.9] }}
                                            transition={{ duration: 2.6 + cueStar * 0.8, repeat: Infinity, ease: "easeInOut" }}
                                            style={{ position: "absolute", top: cueStar === 0 ? 8 : 12, right: cueStar === 0 ? 10 : 24, width: cueStar === 0 ? 5 : 4, height: cueStar === 0 ? 5 : 4, borderRadius: "50%", background: "rgba(224,231,255,0.9)", boxShadow: "0 0 8px rgba(224,231,255,0.65)", pointerEvents: "none" }}
                                        />
                                    ))}
                                    <Typography sx={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "text.secondary", display: "flex", alignItems: "center", gap: 2, mb: 0.6 }}>
                                        Case Study
                                        {!isSmallDevice && caseImages.length > 0 && (
                                            <motion.div animate={{ opacity: [0.55, 0.95, 0.55], y: [0, -1.5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                                                <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.55, px: 0.8, py: 0.4, borderRadius: 99, background: alpha(theme.palette.primary.main, 0.08) }}>
                                                    <AdsClickIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                                                </Box>
                                            </motion.div>
                                        )}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}>{item.caseStudy.title}</Typography>
                                    <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.5 }}>{item.caseStudy.summary}</Typography>
                                </Box>
                            )}
                        </TiltCard>
                    </motion.div>

                    <AnimatePresence>
                        {!isSmallDevice && isCaseStudyHovered && caseImages.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, x: isLeft ? 12 : -12, y: 6 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, x: isLeft ? 12 : -12, y: 6 }}
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", width: 720, zIndex: 1200, left: isLeft ? "calc(100% + 16px)" : "auto", right: isLeft ? "auto" : "calc(100% + 16px)" }}
                            >
                                <Box sx={{ p: 1.2, borderRadius: 2, border: `1px solid ${alpha(theme.palette.primary.main, 0.26)}`, background: alpha(theme.palette.background.paper, 0.92), backdropFilter: "blur(8px)", boxShadow: `0 14px 40px ${alpha(theme.palette.primary.main, 0.22)}` }}>
                                    <Box component="img" src={caseImages[activeCaseImage]} alt={`${item.caseStudy.title} preview ${activeCaseImage + 1}`}
                                        sx={{ width: "100%", height: 350, objectFit: "contain", borderRadius: 1.4, border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}` }}
                                    />
                                    <Box sx={{ mt: 1, height: 4, borderRadius: 999, background: alpha(theme.palette.primary.main, 0.18), overflow: "hidden" }}>
                                        <Box sx={{ width: `${caseProgress}%`, height: "100%", background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`, transition: progressTransition }} />
                                    </Box>
                                    <Box sx={{ mt: 0.8, display: "flex", gap: 0.6, justifyContent: "center" }}>
                                        {caseImages.map((_, imageIndex) => (
                                            <Box key={`dot-${imageIndex}`} sx={{ width: imageIndex === activeCaseImage ? 14 : 6, height: 6, borderRadius: 99, background: imageIndex === activeCaseImage ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.35), transition: "all 0.2s ease" }} />
                                        ))}
                                    </Box>
                                </Box>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Box>

                {/* RIGHT / VISUAL — now using CosmicIconVisual */}
                <Box sx={{ flex: 1, display: "flex", justifyContent: "center", order: { xs: 0, md: isLeft ? 3 : 1 }, width: "100%" }}>
                    <CosmicIconVisual
                        Icon={Icon}
                        index={index}
                        feature={item.feature}
                        parallaxX={visualX}
                        parallaxY={visualY}
                    />
                </Box>
            </Box>
        </Box>
    );
}