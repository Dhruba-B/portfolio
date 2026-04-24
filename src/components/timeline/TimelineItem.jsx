import { Box, Chip, Typography, Button, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import reactLogo from "../../assets/react.svg";
import jsLogo from "../../assets/icons/js.webp";
import javaLogo from "../../assets/icons/java.svg";
import springLogo from "../../assets/icons/spring.png";
import mysqlLogo from "../../assets/icons/sql.png";
import gitLogo from "../../assets/icons/git.svg";
import CosmicIconVisual from "./CosmicVisual";
import { createPortal } from "react-dom";

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
    const [openCasePreview, setOpenCasePreview] = useState(false);
    const [progressTransition, setProgressTransition] = useState("none");
    const isLeft = index % 2 === 0;
    const Icon = item.icon;
    const caseIntervalMs = 4800;
    const caseImages = item.caseStudy?.images ?? (item.caseStudy?.image ? [item.caseStudy.image] : []);
    const caseStudyRef = useRef(null);
    const previousProgressRef = useRef(0);

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

    useEffect(() => {
        if (!openCasePreview) return;

        const interval = setInterval(() => {
            setActiveCaseImage((prev) => (prev + 1) % caseImages.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [openCasePreview, caseImages.length]);

    function getSemanticTags(item) {
        const map = {
            data: ["Schema", "Query", "Render", "Validate"],
            ai: ["Prompt", "Parse", "Validate", "Execute"],
            mobile: ["Core", "Brand", "Deploy", "Adapt"],
            system: ["Components", "Tokens", "Layout", "Reuse"],
            infra: ["Batch", "Process", "Tenant", "Ledger"],
            health: ["Patient", "Care", "Workflow", "Report"],
            core: ["Fullstack", "API", "UI", "DB"],
        };

        return map[item.visualType] || item.stack?.slice(0, 5);
    }

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
                    // background: `radial-gradient(circle at 50% 50%, ${alpha(theme.palette.primary.main, 0.08)}, transparent 58%)`,
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
            >
                {/* TEXT CARD SIDE */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
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
                                        {isSmallDevice && caseImages.length > 0 && (
                                            <Box
                                                onClick={() => isSmallDevice && setOpenCasePreview(true)}
                                                sx={{
                                                    px: 0.8,
                                                    py: 0.4,
                                                    borderRadius: 99,
                                                    background: alpha(theme.palette.primary.main, 0.08),
                                                    fontSize: "0.65rem",
                                                }}
                                            >
                                                Tap
                                            </Box>
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

                    <AnimatePresence>
                        {isSmallDevice && openCasePreview &&

                            <>
                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.4 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setOpenCasePreview(false)}
                                    style={{
                                        position: "fixed",
                                        inset: 0,
                                        background: "#000",
                                        zIndex: 19999,
                                    }}
                                />

                                {/* Bottom Sheet */}
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "100%" }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    style={{
                                        position: "fixed",
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        zIndex: 20000,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            borderTopLeftRadius: 16,
                                            borderTopRightRadius: 16,
                                            p: 1.2,
                                            background: theme.palette.background.paper,
                                            boxShadow: "0 -10px 40px rgba(0,0,0,0.25)",
                                        }}
                                    >
                                        {/* Drag Handle */}
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 4,
                                                borderRadius: 99,
                                                background: "grey.500",
                                                mx: "auto",
                                                mb: 1,
                                            }}
                                        />

                                        {/* Swipe + Image */}
                                        <motion.div
                                            drag="x"
                                            dragConstraints={{ left: 0, right: 0 }}
                                            onDragEnd={(e, info) => {
                                                if (info.offset.x < -50) {
                                                    setActiveCaseImage((prev) => (prev + 1) % caseImages.length);
                                                } else if (info.offset.x > 50) {
                                                    setActiveCaseImage((prev) =>
                                                        prev === 0 ? caseImages.length - 1 : prev - 1
                                                    );
                                                }
                                            }}
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.img
                                                    key={activeCaseImage}
                                                    src={caseImages[activeCaseImage]}
                                                    initial={{ opacity: 0, x: 40 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -40 }}
                                                    transition={{ duration: 0.35 }}
                                                    style={{
                                                        width: "100%",
                                                        height: 220,
                                                        objectFit: "contain",
                                                        borderRadius: 12,
                                                    }}
                                                />
                                            </AnimatePresence>
                                        </motion.div>

                                        {/* Progress */}
                                        <Box
                                            sx={{
                                                mt: 1,
                                                height: 4,
                                                borderRadius: 999,
                                                background: "grey.300",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: `${caseProgress}%`,
                                                    height: "100%",
                                                    background: theme.palette.primary.main,
                                                    transition: "width 0.2s linear",
                                                }}
                                            />
                                        </Box>

                                        {/* Dots */}
                                        <Box
                                            sx={{
                                                mt: 1,
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: 0.6,
                                            }}
                                        >
                                            {caseImages.map((_, i) => (
                                                <Box
                                                    key={i}
                                                    sx={{
                                                        width: i === activeCaseImage ? 14 : 6,
                                                        height: 6,
                                                        borderRadius: 99,
                                                        background:
                                                            i === activeCaseImage
                                                                ? theme.palette.primary.main
                                                                : "grey.400",
                                                        transition: "all 0.2s ease",
                                                    }}
                                                />
                                            ))}
                                        </Box>

                                        {/* Close */}
                                        <Box
                                            onClick={() => setOpenCasePreview(false)}
                                            sx={{
                                                mt: 1.2,
                                                textAlign: "center",
                                                fontSize: "0.8rem",
                                                color: "primary.main",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Close
                                        </Box>
                                    </Box>
                                </motion.div>
                            </>}
                    </AnimatePresence>
                </Box>

                {/* VISUAL SIDE — fills the full flex column, orb + constellation centred within */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        order: { xs: 0, md: isLeft ? 3 : 1 },
                        // Let the column breathe — min height matches the card side
                        minHeight: { md: 400 },
                        position: "relative",
                    }}
                >
                    <CosmicIconVisual
                        Icon={Icon}
                        index={index}
                        feature={item.feature}
                        visualType={item.visualType}
                        tags={getSemanticTags(item)}
                    />
                </Box>
            </Box>
        </Box>
    );
}