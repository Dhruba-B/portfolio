import { Box, Chip, Typography, Button, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import reactLogo from "../../assets/react.svg";
import jsLogo from "../../assets/icons/js.webp";
import javaLogo from "../../assets/icons/java.svg";
import springLogo from "../../assets/icons/spring.png";
import mysqlLogo from "../../assets/icons/sql.png";
import gitLogo from "../../assets/icons/git.svg";
import postgresqlLogo from "../../assets/icons/Postgresql.svg.png";
import nodeLogo from "../../assets/icons/node.png";
import redis from "../../assets/icons/redis.png";
import dockerLogo from "../../assets/icons/docker.png";
import CosmicIconVisual from "./CosmicVisual";

// ─── 3D Tilt Card ────────────────────────────────────────────────────────────
function TiltCard({ children, isSmallDevice, isActive, theme, allowOverflow }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => !isSmallDevice && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={isSmallDevice ? undefined : { y: -4 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ borderRadius: 16, position: "relative" }}
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
                        ? `0 14px 46px ${alpha(theme.palette.primary.main, 0.26)}`
                        : isHovered
                            ? `0 16px 46px ${alpha(theme.palette.primary.main, 0.18)}, 0 4px 18px ${alpha(theme.palette.primary.main, 0.08)}`
                            : "0 4px 24px rgba(0,0,0,0.12)",
                    overflow: allowOverflow ? "visible" : "hidden",
                    transition: "box-shadow 0.28s ease, border-color 0.28s ease",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "inherit",
                        pointerEvents: "none",
                        opacity: isHovered ? 1 : 0.55,
                        background: `linear-gradient(135deg, ${alpha("#fff", 0.07)} 0%, transparent 34%)`,
                        transition: "opacity 0.28s ease",
                    },
                }}
            >
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
    const caseIntervalMs = 7500;
    const caseImages = item.caseStudy?.images ?? (item.caseStudy?.image ? [item.caseStudy.image] : []);

    // --- Hover bridge logic ---
    // We use a leave-delay so that when the mouse moves from the card trigger
    // into the gap before reaching the floating preview, we don't dismiss it.
    // As soon as the pointer enters the preview panel the pending close is cancelled.
    const leaveTimerRef = useRef(null);
    const LEAVE_DELAY_MS = 120; // ms — enough to cross a small gap

    const handleHoverZoneEnter = useCallback(() => {
        if (isSmallDevice) return;
        clearTimeout(leaveTimerRef.current);
        setIsCaseStudyHovered(true);
    }, [isSmallDevice]);

    const handleHoverZoneLeave = useCallback(() => {
        if (isSmallDevice) return;
        leaveTimerRef.current = setTimeout(() => {
            setIsCaseStudyHovered(false);
        }, LEAVE_DELAY_MS);
    }, [isSmallDevice]);

    // Cleanup on unmount
    useEffect(() => () => clearTimeout(leaveTimerRef.current), []);

    const previousProgressRef = useRef(0);
    // Epoch timestamp reset each time the user manually navigates — restarts progress from 0
    const timerEpochRef = useRef(Date.now());

    // Navigate manually; resets the auto-advance timer to 0
    const goToImage = useCallback((nextIndex) => {
        setActiveCaseImage(nextIndex);
        setCaseProgress(0);
        setProgressTransition("none");
        previousProgressRef.current = 0;
        timerEpochRef.current = Date.now();
    }, []);

    const goPrev = useCallback((e) => {
        e.stopPropagation();
        goToImage((activeCaseImage - 1 + caseImages.length) % caseImages.length);
    }, [activeCaseImage, caseImages.length, goToImage]);

    const goNext = useCallback((e) => {
        e.stopPropagation();
        goToImage((activeCaseImage + 1) % caseImages.length);
    }, [activeCaseImage, caseImages.length, goToImage]);

    const stackIconMap = {
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
        postgresql: postgresqlLogo,
        "node.js": nodeLogo,
        redis: redis,
        docker: dockerLogo,
    };

    const getStackIconSrc = (label) => {
        const key = String(label ?? "").trim().toLowerCase();
        return stackIconMap[key] ?? null;
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
        if (isSmallDevice || !isCaseStudyHovered || caseImages.length <= 1) return;
        // timerEpochRef is reset by goToImage() on manual nav — the interval
        // picks it up on its next tick, restarting the progress bar from 0.
        const timer = setInterval(() => {
            const elapsed = Date.now() - timerEpochRef.current;
            const inCycle = elapsed % caseIntervalMs;
            const nextProgress = (inCycle / caseIntervalMs) * 100;

            if (elapsed >= caseIntervalMs && inCycle < 60) {
                // Full cycle completed — advance image and reset epoch
                setActiveCaseImage((prev) => (prev + 1) % caseImages.length);
                timerEpochRef.current = Date.now();
                setCaseProgress(0);
                setProgressTransition("none");
                previousProgressRef.current = 0;
            } else {
                setProgressTransition(nextProgress < previousProgressRef.current ? "none" : "width 60ms linear");
                setCaseProgress(nextProgress);
                previousProgressRef.current = nextProgress;
            }
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
            collab: ["Realtime", "Socket", "Collaborative", "Authenicated"],
            ds: ["Queue", "Prioritization", "Socket", "Redis"],
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
            <Box sx={{ position: "absolute", inset: 0, filter: "blur(2px)", zIndex: -1 }} />

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
                        viewport={{ once: true, margin: "-100px" }}
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
                                    initial={{ opacity: 0, y: -4 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
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

                            {item.links && (
                                <motion.div variants={itemVariant}>
                                    <Box sx={{ mt: 2.2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                                        <Button
                                            size="small" variant="outlined" startIcon={<GitHubIcon />}
                                            href={item.links.github || undefined}
                                            target={item.links.github ? "_blank" : undefined}
                                            rel={item.links.github ? "noopener noreferrer" : undefined}
                                            disabled={!item.links.github}
                                            sx={{
                                                borderColor: theme.palette.primary.border, color: "text.secondary", textTransform: "none",
                                                background: alpha(theme.palette.primary.main, 0.05),
                                                "&:hover": { borderColor: alpha(theme.palette.primary.main, 0.5), background: alpha(theme.palette.primary.main, 0.12) },
                                                "&.Mui-disabled": { borderColor: alpha(theme.palette.primary.main, 0.16), color: alpha(theme.palette.text.secondary, 0.52) },
                                            }}
                                        >
                                            GitHub
                                        </Button>
                                        <Button
                                            size="small" variant="contained" endIcon={<OpenInNewIcon />}
                                            href={item.links.demo || undefined}
                                            target={item.links.demo ? "_blank" : undefined}
                                            rel={item.links.demo ? "noopener noreferrer" : undefined}
                                            disabled={!item.links.demo}
                                            sx={{
                                                textTransform: "none",
                                                boxShadow: item.links.demo ? `0 8px 24px ${alpha(theme.palette.primary.main, 0.22)}` : "none",
                                                "&.Mui-disabled": { background: alpha(theme.palette.primary.main, 0.12), color: alpha(theme.palette.text.secondary, 0.52) },
                                            }}
                                        >
                                            Live demo
                                        </Button>
                                    </Box>
                                </motion.div>
                            )}

                            {item.caseStudy && (
                                <Box
                                    onMouseEnter={handleHoverZoneEnter}
                                    onMouseLeave={handleHoverZoneLeave}
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
                                        Hover to see more
                                        {!isSmallDevice && caseImages.length > 0 && (
                                            <motion.div animate={{ opacity: [0.55, 0.95, 0.55], y: [0, -1.5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                                                <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.55, px: 0.8, py: 0.4, borderRadius: 99, background: alpha(theme.palette.primary.main, 0.08) }}>
                                                    <AdsClickIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                                                </Box>
                                            </motion.div>
                                        )}
                                        {isSmallDevice && caseImages.length > 0 && (
                                            <Box
                                                onClick={() => setOpenCasePreview(true)}
                                                sx={{ px: 0.8, py: 0.4, borderRadius: 99, background: alpha(theme.palette.primary.main, 0.08), fontSize: "0.65rem" }}
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

                    {/* ── Floating preview panel (desktop) ── */}
                    <AnimatePresence>
                        {!isSmallDevice && isCaseStudyHovered && caseImages.length > 0 && (
                            <motion.div
                                onMouseEnter={handleHoverZoneEnter}
                                onMouseLeave={handleHoverZoneLeave}
                                initial={{ opacity: 0, x: isLeft ? 12 : -12, y: 6 }}
                                animate={{ opacity: 1, x: isLeft ? -150 : 150, y: -150 }}
                                exit={{ opacity: 0, x: isLeft ? 12 : -12, y: 6 }}
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    width: 1080,
                                    zIndex: 100,
                                    left: isLeft ? "calc(100% + 16px)" : "auto",
                                    right: isLeft ? "auto" : "calc(100% + 16px)",
                                }}
                            >
                                <Box sx={{ p: 1.2, borderRadius: 2, border: `1px solid ${alpha(theme.palette.primary.main, 0.26)}`, background: alpha(theme.palette.background.paper, 0.92), backdropFilter: "blur(8px)", boxShadow: `0 14px 40px ${alpha(theme.palette.primary.main, 0.22)}` }}>
                                    {/* Image with prev/next arrow overlays */}
                                    <Box sx={{ position: "relative" }}>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeCaseImage}
                                                initial={{ opacity: 0, x: 18 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -18 }}
                                                transition={{ duration: 0.22, ease: "easeOut" }}
                                            >
                                                <Box component="img"
                                                    src={caseImages[activeCaseImage]}
                                                    alt={`${item.caseStudy.title} preview ${activeCaseImage + 1}`}
                                                    sx={{ width: "100%", height: 500, objectFit: "contain", borderRadius: 1.4, border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`, display: "block" }}
                                                />
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* Prev button */}
                                        {caseImages.length > 1 && (
                                            <Box
                                                onClick={goPrev}
                                                sx={{
                                                    position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                                                    width: 36, height: 36, borderRadius: "50%",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    background: alpha(theme.palette.background.paper, 0.82),
                                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.28)}`,
                                                    backdropFilter: "blur(6px)",
                                                    cursor: "pointer",
                                                    color: "text.primary",
                                                    fontSize: "1rem",
                                                    transition: "background 0.15s ease, border-color 0.15s ease, transform 0.15s ease",
                                                    "&:hover": {
                                                        background: alpha(theme.palette.primary.main, 0.18),
                                                        borderColor: alpha(theme.palette.primary.main, 0.6),
                                                        transform: "translateY(-50%) scale(1.1)",
                                                    },
                                                    userSelect: "none",
                                                    zIndex: 2,
                                                }}
                                            >
                                                ‹
                                            </Box>
                                        )}

                                        {/* Next button */}
                                        {caseImages.length > 1 && (
                                            <Box
                                                onClick={goNext}
                                                sx={{
                                                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                                                    width: 36, height: 36, borderRadius: "50%",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    background: alpha(theme.palette.background.paper, 0.82),
                                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.28)}`,
                                                    backdropFilter: "blur(6px)",
                                                    cursor: "pointer",
                                                    color: "text.primary",
                                                    fontSize: "1rem",
                                                    transition: "background 0.15s ease, border-color 0.15s ease, transform 0.15s ease",
                                                    "&:hover": {
                                                        background: alpha(theme.palette.primary.main, 0.18),
                                                        borderColor: alpha(theme.palette.primary.main, 0.6),
                                                        transform: "translateY(-50%) scale(1.1)",
                                                    },
                                                    userSelect: "none",
                                                    zIndex: 2,
                                                }}
                                            >
                                                ›
                                            </Box>
                                        )}

                                        {/* Slide counter badge */}
                                        {caseImages.length > 1 && (
                                            <Box sx={{
                                                position: "absolute", bottom: 10, right: 10,
                                                px: 1, py: 0.3, borderRadius: 99,
                                                background: alpha(theme.palette.background.paper, 0.78),
                                                border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
                                                backdropFilter: "blur(6px)",
                                                fontSize: "0.68rem", fontFamily: "'Space Mono', monospace",
                                                color: "text.secondary", letterSpacing: "0.06em",
                                                userSelect: "none",
                                            }}>
                                                {activeCaseImage + 1} / {caseImages.length}
                                            </Box>
                                        )}
                                    </Box>

                                    {/* Progress bar */}
                                    {/* <Box sx={{ mt: 1, height: 3, borderRadius: 999, background: alpha(theme.palette.primary.main, 0.18), overflow: "hidden" }}>
                                        <Box sx={{ width: `${caseProgress}%`, height: "100%", background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`, transition: progressTransition }} />
                                    </Box> */}

                                    {/* Dot indicators */}
                                    <Box sx={{ mt: 0.8, display: "flex", gap: 0.6, justifyContent: "center", alignItems: "center" }}>
                                        {caseImages.map((_, imageIndex) => (
                                            <Box
                                                key={`dot-${imageIndex}`}
                                                onClick={(e) => { e.stopPropagation(); goToImage(imageIndex); }}
                                                sx={{
                                                    width: imageIndex === activeCaseImage ? 14 : 6,
                                                    height: 6, borderRadius: 99,
                                                    background: imageIndex === activeCaseImage ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.35),
                                                    transition: "all 0.2s ease",
                                                    cursor: "pointer",
                                                    "&:hover": { background: alpha(theme.palette.primary.main, 0.7) },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Mobile bottom sheet ── */}
                    <AnimatePresence>
                        {isSmallDevice && openCasePreview && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }}
                                    onClick={() => setOpenCasePreview(false)}
                                    style={{ position: "fixed", inset: 0, background: "#000", zIndex: 19999 }}
                                />
                                <motion.div
                                    initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 20000 }}
                                >
                                    <Box sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, p: 1.2, background: theme.palette.background.paper, boxShadow: "0 -10px 40px rgba(0,0,0,0.25)" }}>
                                        <Box sx={{ width: 40, height: 4, borderRadius: 99, background: "grey.500", mx: "auto", mb: 1 }} />
                                        <motion.div
                                            drag="x"
                                            dragConstraints={{ left: 0, right: 0 }}
                                            onDragEnd={(e, info) => {
                                                if (info.offset.x < -50) setActiveCaseImage((prev) => (prev + 1) % caseImages.length);
                                                else if (info.offset.x > 50) setActiveCaseImage((prev) => prev === 0 ? caseImages.length - 1 : prev - 1);
                                            }}
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.img
                                                    key={activeCaseImage}
                                                    src={caseImages[activeCaseImage]}
                                                    initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                                                    transition={{ duration: 0.35 }}
                                                    style={{ width: "100%", height: 220, objectFit: "contain", borderRadius: 12 }}
                                                />
                                            </AnimatePresence>
                                        </motion.div>
                                        {/* <Box sx={{ mt: 1, height: 4, borderRadius: 999, background: "grey.300", overflow: "hidden" }}>
                                            <Box sx={{ width: `${caseProgress}%`, height: "100%", background: theme.palette.primary.main, transition: "width 0.2s linear" }} />
                                        </Box> */}
                                        <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 0.6 }}>
                                            {caseImages.map((_, i) => (
                                                <Box key={i} sx={{ width: i === activeCaseImage ? 14 : 6, height: 6, borderRadius: 99, background: i === activeCaseImage ? theme.palette.primary.main : "grey.400", transition: "all 0.2s ease" }} />
                                            ))}
                                        </Box>
                                        <Box onClick={() => setOpenCasePreview(false)} sx={{ mt: 1.2, textAlign: "center", fontSize: "0.8rem", color: "primary.main", cursor: "pointer" }}>
                                            Close
                                        </Box>
                                    </Box>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </Box>

                {/* VISUAL SIDE */}
                <Box
                    sx={{
                        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                        order: { xs: 0, md: isLeft ? 3 : 1 },
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