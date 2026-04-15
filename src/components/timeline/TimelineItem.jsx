import { Box, Chip, Typography, Button, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import TimelineVisual from "./TimelineVisual";

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
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cardX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const cardY = useSpring(mouseY, { stiffness: 50, damping: 20 });
    const visualX = useTransform(cardX, (v) => v * 0.55);
    const visualY = useTransform(cardY, (v) => v * 0.55);

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
            },
        },
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
            {/* BACKGROUND */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at 50% 50%, ${alpha(theme.palette.primary.main, 0.08)}, transparent 58%)`,
                    filter: "blur(2px)",
                    zIndex: -1,
                }}
            />

            {/* FLEX CONTAINER */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "1600px",
                    mx: "auto",

                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: { xs: 3, md: 6 },
                }}
                onMouseMove={(event) => {
                    if (isSmallDevice) return;
                    const rect = event.currentTarget.getBoundingClientRect();
                    const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
                    const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
                    mouseX.set(normalizedX);
                    mouseY.set(normalizedY);
                }}
                onMouseLeave={() => {
                    if (isSmallDevice) return;
                    mouseX.set(0);
                    mouseY.set(0);
                }}
            >
                {/* LEFT / TEXT */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: isLeft ? "flex-end" : "flex-start",
                        order: { xs: 1, md: isLeft ? 1 : 3 },
                        position: "relative",
                    }}
                >
                    {/* CONNECTOR */}
                    <Box
                        sx={{
                            display: { xs: "none", md: "block" },
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            right: isLeft ? -40 : "auto",
                            left: isLeft ? "auto" : -40,
                            width: 40,
                            height: "2px",
                            background: `linear-gradient(to ${isLeft ? "right" : "left"
                                }, ${theme.palette.primary.main}, transparent)`,
                            opacity: 0.6,
                        }}
                    />

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-100px" }}
                        style={{
                            width: "100%",
                            maxWidth: 600,
                            x: isSmallDevice ? 0 : cardX,
                            y: isSmallDevice ? 0 : cardY,
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

                                transition: "all 0.35s ease",
                                textAlign: "left",
                                transform: isActive ? "translateY(-4px)" : "translateY(0)",
                                boxShadow: isActive
                                    ? `0 20px 70px ${theme.palette.primary.glow}`
                                    : "none",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: `0 25px 80px ${theme.palette.primary.glow}`,
                                },
                            }}
                        >
                            {item.feature && (
                                <motion.div
                                    animate={{ y: [0, -7, 0], rotate: [0, 2, 0], opacity: [1, 1] }}
                                    transition={{
                                        duration: 4.6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: -14,
                                        right: 20,
                                        zIndex: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            px: 1.2,
                                            py: 0.45,
                                            borderRadius: 999,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.7,
                                            background: `linear-gradient(120deg, ${alpha(theme.palette.accent.main, 0.26)}, ${alpha(theme.palette.primary.main, 0.14)})`,
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                                            boxShadow: `0 0 22px ${alpha(theme.palette.accent.main, 0.35)}`,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                background: alpha(theme.palette.accent.main, 0.95),
                                                boxShadow: `0 0 10px ${alpha(theme.palette.accent.main, 0.8)}`,
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                fontSize: "0.68rem",
                                                letterSpacing: "0.08em",
                                                textTransform: "uppercase",
                                                color: "text.primary",
                                                fontWeight: 700,
                                                lineHeight: 1,
                                            }}
                                        >
                                            Feature
                                        </Typography>
                                    </Box>
                                </motion.div>
                            )}
                            <motion.div variants={itemVariant}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: .5,
                                        gap: 1.5,
                                    }}
                                >
                                    {/* <Icon sx={{ color: "primary.main" }} /> */}

                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: { xs: "1.35rem", md: "2rem" },
                                            lineHeight: 1.28,
                                            fontWeight: 600,
                                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Box>
                            </motion.div>

                            <motion.div variants={itemVariant}>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        color: "text.secondary",
                                        letterSpacing: "0.08em",
                                    }}
                                >
                                    {item.period}
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariant}>
                                <Typography
                                    sx={{
                                        color: "text.primary",
                                        lineHeight: 1.7,
                                        fontSize: { xs: "0.92rem", md: "0.98rem" },
                                        fontWeight: 500,
                                        mb: 2,
                                    }}
                                >
                                    {item.subtitle}
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariant}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                        mb: 2.5,
                                    }}
                                >
                                    {item.stack?.map((skill) => (
                                        <Chip
                                            key={skill}
                                            label={skill}
                                            size="small"
                                            sx={{
                                                borderColor: theme.palette.primary.border,
                                                color: "text.secondary",
                                                background: alpha(theme.palette.primary.main, 0.08),
                                                "& .MuiChip-label": {
                                                    px: 1,
                                                    fontSize: { xs: "0.68rem", md: "0.75rem" },
                                                },
                                            }}
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>
                            </motion.div>

                            {item.highlights?.length > 0 && isSmallDevice && (
                                <Box>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => setIsExpandedMobile((prev) => !prev)}
                                        sx={{
                                            mb: 1.4,
                                            borderColor: theme.palette.primary.border,
                                            color: "text.secondary",
                                            textTransform: "none",
                                        }}
                                    >
                                        {isExpandedMobile ? "Hide highlights" : "Show highlights"}
                                    </Button>
                                </Box>
                            )}

                            {!isSmallDevice && (
                                <motion.div variants={itemVariant}>
                                    <Box sx={{ display: "grid", gap: 1.4 }}>
                                        {item.highlights?.map((point) => (
                                            <Typography
                                                key={point}
                                                sx={{
                                                    color: "text.secondary",
                                                    lineHeight: 1.65,
                                                    fontSize: "0.98rem",
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    gap: 1,
                                                }}
                                            >
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        width: 6,
                                                        height: 6,
                                                        mt: "10px",
                                                        borderRadius: "50%",
                                                        backgroundColor: "primary.main",
                                                        flexShrink: 0,
                                                    }}
                                                />
                                                {point}
                                            </Typography>
                                        ))}
                                    </Box>
                                </motion.div>
                            )}

                            {isSmallDevice && (
                                <AnimatePresence initial={false}>
                                    {isExpandedMobile && (
                                        <motion.div
                                            key="mobile-highlights"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.28, ease: "easeOut" }}
                                            style={{ overflow: "hidden" }}
                                        >
                                            <Box sx={{ display: "grid", gap: 1.4, pb: 0.2 }}>
                                                {item.highlights?.map((point) => (
                                                    <Typography
                                                        key={point}
                                                        sx={{
                                                            color: "text.secondary",
                                                            lineHeight: 1.65,
                                                            fontSize: "0.95rem",
                                                            display: "flex",
                                                            alignItems: "flex-start",
                                                            gap: 1,
                                                        }}
                                                    >
                                                        <Box
                                                            component="span"
                                                            sx={{
                                                                width: 6,
                                                                height: 6,
                                                                mt: "10px",
                                                                borderRadius: "50%",
                                                                backgroundColor: "primary.main",
                                                                flexShrink: 0,
                                                            }}
                                                        />
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
                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            lineHeight: 1.8,
                                            fontSize: "1.05rem",
                                        }}
                                    >
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
                                        position: "relative",
                                        mt: 2.2,
                                        p: 1.5,
                                        borderRadius: 2.5,
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
                                        background: alpha(theme.palette.background.paper, 0.55),
                                        zIndex: 3,
                                        cursor: !isSmallDevice && caseImages.length > 0 ? "pointer" : "default",
                                    }}
                                >
                                    {[0, 1].map((cueStar) => (
                                        <motion.div
                                            key={`cue-star-${cueStar}`}
                                            animate={{
                                                opacity: [0.25, 0.85, 0.25],
                                                scale: [0.9, 1.15, 0.9],
                                            }}
                                            transition={{
                                                duration: 2.6 + cueStar * 0.8,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            style={{
                                                position: "absolute",
                                                top: cueStar === 0 ? 8 : 12,
                                                right: cueStar === 0 ? 10 : 24,
                                                width: cueStar === 0 ? 5 : 4,
                                                height: cueStar === 0 ? 5 : 4,
                                                borderRadius: "50%",
                                                background: "rgba(224,231,255,0.9)",
                                                boxShadow: "0 0 8px rgba(224,231,255,0.65)",
                                                pointerEvents: "none",
                                            }}
                                        />
                                    ))}
                                    <Typography
                                        sx={{
                                            fontSize: "0.72rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.07em",
                                            color: "text.secondary",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2,
                                            mb: 0.6,
                                        }}
                                    >
                                        Case Study
                                        {!isSmallDevice && caseImages.length > 0 && (
                                            <motion.div
                                                animate={{
                                                    opacity: [0.55, 0.95, 0.55],
                                                    y: [0, -1.5, 0],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: 0.55,
                                                        px: 0.8,
                                                        py: 0.4,
                                                        borderRadius: 99,
                                                        // border: `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
                                                        background: alpha(theme.palette.primary.main, 0.08),
                                                    }}
                                                >
                                                    <AdsClickIcon
                                                        sx={{
                                                            fontSize: 14,
                                                            color: "text.secondary",
                                                        }}
                                                    />
                                                </Box>
                                            </motion.div>
                                        )}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}>
                                        {item.caseStudy.title}
                                    </Typography>
                                    <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.5 }}>
                                        {item.caseStudy.summary}
                                    </Typography>

                                    {caseImages.length === 0 && (
                                        <Typography
                                            sx={{
                                                mt: 0.8,
                                                fontSize: "0.76rem",
                                                color: "text.secondary",
                                                opacity: 0.85,
                                            }}
                                        >
                                            Add screenshot paths in `item.caseStudy.images` to enable hover preview carousel.
                                        </Typography>
                                    )}

                                    <AnimatePresence>
                                        {!isSmallDevice && isCaseStudyHovered && caseImages.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: isLeft ? 12 : -12, y: 6 }}
                                                animate={{ opacity: 1, x: 0, y: 0 }}
                                                exit={{ opacity: 0, x: isLeft ? 12 : -12, y: 6 }}
                                                transition={{ duration: 0.22, ease: "easeOut" }}
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    width: 720,
                                                    zIndex: 1200,
                                                    left: isLeft ? "calc(100% + 16px)" : "auto",
                                                    right: isLeft ? "auto" : "calc(100% + 16px)",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        p: 1.2,
                                                        borderRadius: 2,
                                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.26)}`,
                                                        background: alpha(theme.palette.background.paper, 0.92),
                                                        backdropFilter: "blur(8px)",
                                                        boxShadow: `0 14px 40px ${alpha(theme.palette.primary.main, 0.22)}`,
                                                    }}
                                                >
                                                    <Box
                                                        component="img"
                                                        src={caseImages[activeCaseImage]}
                                                        alt={`${item.caseStudy.title} preview ${activeCaseImage + 1}`}
                                                        sx={{
                                                            width: "100%",
                                                            height: 350,
                                                            objectFit: "contain",
                                                            borderRadius: 1.4,
                                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
                                                        }}                                                        
                                                    />
                                                    <Box
                                                        sx={{
                                                            mt: 1,
                                                            height: 4,
                                                            borderRadius: 999,
                                                            background: alpha(theme.palette.primary.main, 0.18),
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: `${caseProgress}%`,
                                                                height: "100%",
                                                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
                                                                transition: progressTransition,
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box sx={{ mt: 0.8, display: "flex", gap: 0.6, justifyContent: "center" }}>
                                                        {caseImages.map((_, imageIndex) => (
                                                            <Box
                                                                key={`dot-${imageIndex}`}
                                                                sx={{
                                                                    width: imageIndex === activeCaseImage ? 14 : 6,
                                                                    height: 6,
                                                                    borderRadius: 99,
                                                                    background:
                                                                        imageIndex === activeCaseImage
                                                                            ? theme.palette.primary.main
                                                                            : alpha(theme.palette.primary.main, 0.35),
                                                                    transition: "all 0.2s ease",
                                                                }}
                                                            />
                                                        ))}
                                                    </Box>
                                                </Box>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Box>
                            )}
                        </Box>
                    </motion.div>
                </Box>


                {/* RIGHT / VISUAL */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        order: { xs: 0, md: isLeft ? 3 : 1 },
                        width: "100%",
                    }}
                >
                    <TimelineVisual
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