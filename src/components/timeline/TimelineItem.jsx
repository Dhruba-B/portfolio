import { Box, Button, Collapse, Dialog, IconButton, Typography, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState, useRef } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
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
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import ZoomOutRoundedIcon from "@mui/icons-material/ZoomOutRounded";

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

const getStackIconSrc = (label) => stackIconMap[String(label ?? "").trim().toLowerCase()] ?? null;

const EASE = [0.16, 1, 0.3, 1];

// ─── Node: the "star" this project sits on along the path ────────────────────
// When active it lights up and a tiny planet orbits it.
function Node({ Icon, active, reduce }) {
    const theme = useTheme();
    const size = { xs: 34, md: 44 };

    return (
        <Box sx={{ position: "relative", width: size, height: size }}>
            <AnimatePresence>
                {active && (
                    <motion.div
                        key="orbit"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, rotate: 360 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                            opacity: { duration: 0.4 },
                            scale: { duration: 0.4, ease: EASE },
                            rotate: { duration: 12, ease: "linear", repeat: Infinity },
                        }}
                        style={{
                            position: "absolute",
                            inset: -9,
                            borderRadius: "50%",
                            border: `1px dashed ${alpha(theme.palette.primary.main, 0.4)}`,
                            pointerEvents: "none",
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: -3,
                                left: "50%",
                                width: 6,
                                height: 6,
                                ml: "-3px",
                                borderRadius: "50%",
                                background: theme.palette.accent.main,
                                boxShadow: `0 0 8px ${alpha(theme.palette.accent.main, 0.9)}`,
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // solid fill so the path line doesn't show through the node
                    background: theme.palette.background.default,
                    border: `1px solid ${alpha(theme.palette.primary.main, active ? 0.75 : 0.3)}`,
                    color: active ? theme.palette.accent.main : theme.palette.text.secondary,
                    boxShadow: active ? `0 0 18px ${alpha(theme.palette.primary.main, 0.45)}` : "none",
                    transition: "border-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease",
                }}
            >
                <Icon sx={{ fontSize: { xs: 18, md: 22 } }} />
            </Box>
        </Box>
    );
}

// ─── Screenshot stack: front image + two peeking behind, fans out on hover ───
function PreviewStack({ images, title, summary, onOpen }) {
    const theme = useTheme();
    const reduce = useReducedMotion();
    const [hover, setHover] = useState(false);
    const layers = images.slice(0, 3);

    const frame = {
        position: "absolute",
        inset: 0,
        borderRadius: 2,
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.28)}`,
        background: theme.palette.background.paper,
    };

    return (
        <Box>
            <Box sx={{ pt: 2, pr: 3 }}>
                <Box
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${title} screenshots`}
                    onClick={onOpen}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onOpen();
                        }
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onFocus={() => setHover(true)}
                    onBlur={() => setHover(false)}
                    sx={{
                        position: "relative",
                        aspectRatio: "16 / 10",
                        cursor: "zoom-in",
                        borderRadius: 2,
                        outline: "none",
                        "&:focus-visible": { outline: `2px solid ${theme.palette.accent.main}`, outlineOffset: 4 },
                    }}
                >
                    {/* back layers, drawn furthest first */}
                    {layers
                        .map((src, i) => ({ src, i }))
                        .slice(1)
                        .reverse()
                        .map(({ src, i }) => (
                            <motion.div
                                key={src}
                                aria-hidden="true"
                                animate={{
                                    x: reduce ? i * 10 : hover ? i * 18 : i * 10,
                                    y: reduce ? -i * 8 : hover ? -i * 14 : -i * 8,
                                }}
                                transition={{ duration: 0.35, ease: EASE }}
                                style={{ ...frame, opacity: 1 - i * 0.3, zIndex: 3 - i }}
                            >
                                <Box component="img" src={src} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", display: "block" }} />
                            </motion.div>
                        ))}

                    {/* front image */}
                    <motion.div
                        animate={{ y: reduce ? 0 : hover ? 2 : 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        style={{ ...frame, zIndex: 4, boxShadow: `0 12px 32px ${alpha("#000", 0.35)}` }}
                    >
                        <Box
                            component="img"
                            src={layers[0]}
                            alt={`${title} screenshot`}
                            sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", display: "block" }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                left: 10,
                                bottom: 10,
                                px: 1.2,
                                py: 0.4,
                                borderRadius: 99,
                                fontSize: "0.75rem",
                                color: "text.primary",
                                background: alpha(theme.palette.background.default, 0.78),
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                backdropFilter: "blur(6px)",
                            }}
                        >
                            {images.length > 1 ? `View ${images.length} screenshots` : "View screenshot"}
                        </Box>
                    </motion.div>
                </Box>
            </Box>

            <Typography sx={{ mt: 1.5, fontWeight: 600, color: "text.primary", fontSize: "0.95rem" }}>{title}</Typography>
            <Typography sx={{ mt: 0.4, color: "text.secondary", fontSize: "0.88rem", lineHeight: 1.6, }}>
                {summary}
            </Typography>
        </Box>
    );
}

function Lightbox({ open, onClose, images, title }) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [idx, setIdx] = useState(0);
    const total = images.length;

    // zoom level of the current image, and pointer bookkeeping for swipe-to-change
    const scaleRef = useRef(1);
    const pointers = useRef(new Set());
    const multiTouch = useRef(false);
    const start = useRef({ x: 0, y: 0 });

    const paginate = useCallback(
        (d) => setIdx((i) => (i + d + total) % total),
        [total]
    );

    useEffect(() => {
        if (open) setIdx(0);
    }, [open]);

    // a new image always starts un-zoomed
    useEffect(() => {
        scaleRef.current = 1;
    }, [idx]);

    useEffect(() => {
        if (!open || total < 2) return undefined;
        const onKey = (e) => {
            if (e.key === "ArrowRight") paginate(1);
            if (e.key === "ArrowLeft") paginate(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, total, paginate]);

    // Swipe left/right changes image only when the image is not zoomed in,
    // so panning a zoomed image never flips the page by accident.
    // Mouse is excluded: on desktop a drag always means "pan", and image
    // changes come from the arrow buttons, arrow keys and dots instead.
    const onPointerDownCapture = (e) => {
        if (e.pointerType === "mouse") return;
        pointers.current.add(e.pointerId);
        if (pointers.current.size > 1) multiTouch.current = true;
        else start.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerUpCapture = (e) => {
        if (e.pointerType === "mouse") return;
        const wasSingle = !multiTouch.current;
        pointers.current.delete(e.pointerId);
        if (pointers.current.size === 0) {
            const dx = e.clientX - start.current.x;
            const dy = e.clientY - start.current.y;
            if (wasSingle && total > 1 && scaleRef.current <= 1.02 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                paginate(dx < 0 ? 1 : -1);
            }
            multiTouch.current = false;
        }
    };
    const onPointerCancelCapture = (e) => {
        if (e.pointerType === "mouse") return;
        pointers.current.delete(e.pointerId);
        if (pointers.current.size === 0) multiTouch.current = false;
    };

    const navBtn = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        color: "text.primary",
        background: alpha(theme.palette.background.default, 0.75),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        backdropFilter: "blur(6px)",
        "&:hover": { background: alpha(theme.palette.primary.main, 0.22) },
    };

    const toolBtn = {
        color: "text.primary",
        background: alpha(theme.palette.background.default, 0.8),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        "&:hover": { background: alpha(theme.palette.primary.main, 0.22) },
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={isSmall}
            maxWidth="lg"
            fullWidth
            aria-label={`${title} screenshots`}
            sx={{
                "& .MuiBackdrop-root": { backgroundColor: alpha("#02030a", 0.78), backdropFilter: "blur(6px)" },
                "& .MuiDialog-paper": {
                    m: { xs: 0, sm: 3 },
                    borderRadius: { xs: 0, sm: 3 },
                    backgroundImage: "none",
                    background: theme.palette.background.paper,
                    border: { xs: "none", sm: `1px solid ${alpha(theme.palette.primary.main, 0.28)}` },
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2.5, py: 1.25, flexShrink: 0 }}>
                <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>{title}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    {total > 1 && (
                        <Typography sx={{ color: "text.secondary", fontSize: "0.82rem" }}>
                            {idx + 1} of {total}
                        </Typography>
                    )}
                    <IconButton onClick={onClose} size="small" aria-label="Close" sx={{ color: "text.secondary" }}>
                        <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            <Box
                onPointerDownCapture={onPointerDownCapture}
                onPointerUpCapture={onPointerUpCapture}
                onPointerCancelCapture={onPointerCancelCapture}
                sx={{
                    position: "relative",
                    flex: { xs: 1, sm: "none" },
                    height: { xs: "auto", sm: "66vh" },
                    minHeight: 0,
                    overflow: "hidden",
                    px: { xs: 0, md: 7 },
                    // let the zoom library own touch gestures inside the viewer
                    touchAction: "none",
                }}
            >
                {/* key={idx} resets zoom and pan whenever the image changes */}
                <TransformWrapper
                    key={idx}
                    initialScale={1}
                    minScale={1}
                    maxScale={5}
                    centerOnInit
                    doubleClick={{ mode: "toggle", step: 2.2 }}
                    wheel={{ step: 0.15 }}
                    pinch={{ step: 5 }}
                    onTransformed={(ref) => {
                        scaleRef.current = ref.state.scale;
                    }}
                >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            <TransformComponent
                                wrapperStyle={{ width: "100%", height: "100%" }}
                                contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                                <img
                                    src={images[idx]}
                                    alt={`${title} screenshot ${idx + 1}`}
                                    draggable={false}
                                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", userSelect: "none", display: "block" }}
                                />
                            </TransformComponent>

                            {/* zoom controls */}
                            <Box sx={{ position: "absolute", right: 12, bottom: 12, zIndex: 2, display: "flex", gap: 1 }}>
                                <IconButton size="small" aria-label="Zoom out" onClick={() => zoomOut(0.8)} sx={toolBtn}>
                                    <ZoomOutRoundedIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" aria-label="Zoom in" onClick={() => zoomIn(0.8)} sx={toolBtn}>
                                    <ZoomInRoundedIcon fontSize="small" />
                                </IconButton>
                                <Button size="small" onClick={() => resetTransform()} sx={{ ...toolBtn, textTransform: "none", minWidth: 0, px: 1.5, borderRadius: 99 }}>
                                    Reset
                                </Button>
                            </Box>
                        </>
                    )}
                </TransformWrapper>

                {total > 1 && (
                    <>
                        <IconButton onClick={() => paginate(-1)} aria-label="Previous screenshot" sx={{ ...navBtn, left: 16, display: { xs: "none", md: "inline-flex" } }}>
                            <ChevronLeftRoundedIcon />
                        </IconButton>
                        <IconButton onClick={() => paginate(1)} aria-label="Next screenshot" sx={{ ...navBtn, right: 16, display: { xs: "none", md: "inline-flex" } }}>
                            <ChevronRightRoundedIcon />
                        </IconButton>
                    </>
                )}
            </Box>

            {total > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 0.75, py: 2, flexShrink: 0 }}>
                    {images.map((_, i) => (
                        <Box
                            key={i}
                            component="button"
                            type="button"
                            aria-label={`Go to screenshot ${i + 1}`}
                            onClick={() => setIdx(i)}
                            sx={{
                                p: 0,
                                border: 0,
                                cursor: "pointer",
                                height: 6,
                                width: i === idx ? 18 : 6,
                                borderRadius: 99,
                                background: i === idx ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.35),
                                transition: "width 0.25s ease, background 0.25s ease",
                            }}
                        />
                    ))}
                </Box>
            )}
        </Dialog>
    );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function TimelineItem({ item, index, isActive }) {
    const theme = useTheme();
    const reduce = useReducedMotion();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [showMore, setShowMore] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const Icon = item.icon;
    const images = item.caseStudy?.images ?? (item.caseStudy?.image ? [item.caseStudy.image] : []);
    const hasPreview = images.length > 0;
    const hasLinks = !!(item.links?.github || item.links?.demo);

    // One quiet fade as the project scrolls in; nothing else moves on its own.
    const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
    const reveal = {
        hidden: { opacity: 0, y: reduce ? 0 : 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
    };

    const highlightList = (
        <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 1.25 }}>
            {item.highlights?.map((point) => (
                <Box
                    component="li"
                    key={point}
                    sx={{ display: "flex", gap: 1.25, color: "text.secondary", lineHeight: 1.65, fontSize: { xs: "0.92rem", md: "0.97rem" }, textAlign: "left" }}
                >
                    <Box component="span" aria-hidden="true" sx={{ color: theme.palette.accent.main, fontSize: "0.65rem", mt: "0.5em", flexShrink: 0 }}>
                        ✦
                    </Box>
                    {point}
                </Box>
            ))}
        </Box>
    );

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "40px minmax(0, 1fr)", md: "72px minmax(0, 1fr)" },
                columnGap: { xs: 2, md: 4 },
                py: { xs: 4.5, md: 8 },
            }}
        >
            {/* Node column, centred on the path */}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                <Node Icon={Icon} active={isActive} reduce={reduce} />
            </Box>

            {/* Content */}
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                style={{ minWidth: 0 }}
            >
                <Box>
                    <motion.div variants={reveal}>
                        <Typography
                            component="h3"
                            sx={{ fontSize: { xs: "1.4rem", md: "2rem" }, fontWeight: 600, lineHeight: 1.25, color: "text.primary" }}
                        >
                            {item.title}
                        </Typography>

                        <Typography sx={{ mt: 2, mb: 2, color: "text.primary", opacity: 0.85, lineHeight: 1.65, fontSize: { xs: "0.95rem", md: "1.02rem" }, textAlign: "left" }}>
                            {item.subtitle}
                        </Typography>

                        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", columnGap: 1.5, rowGap: 0.25, mb: 1 }}>
                            <Typography sx={{ color: "text.secondary", fontSize: "0.85rem" }}>{item.period}</Typography>
                            {item.feature && (
                                <Typography
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 0.6,
                                        fontSize: "0.7rem",
                                        color: theme.palette.accent.main,
                                    }}
                                >
                                    <Box component="span" aria-hidden="true" sx={{ fontSize: "0.65rem" }}>✦</Box>
                                    Featured
                                </Typography>
                            )}
                        </Box>

                    </motion.div>

                    <Box
                        sx={{
                            display: "grid",
                            gap: { xs: 3, lg: 6 },
                            gridTemplateColumns: {
                                xs: "minmax(0, 1fr)",
                                lg: hasPreview ? "minmax(0, 1fr) minmax(0, 1fr)" : "minmax(0, 720px)",
                            },
                            alignItems: "start",
                        }}
                    >
                        <Box>
                            {/* Highlights (collapsible on small screens) */}
                            <motion.div variants={reveal}>
                                {item.highlights?.length > 0 ? (
                                    isSmall ? (
                                        <>
                                            <Button
                                                size="small"
                                                onClick={() => setShowMore((p) => !p)}
                                                aria-expanded={showMore}
                                                endIcon={
                                                    <ExpandMoreRoundedIcon
                                                        sx={{ transform: showMore ? "rotate(180deg)" : "none", transition: "transform 0.25s ease" }}
                                                    />
                                                }
                                                sx={{ textTransform: "none", color: "text.secondary", px: 0, mb: 0.5 }}
                                            >
                                                {showMore ? "Hide highlights" : "Show highlights"}
                                            </Button>
                                            <Collapse in={showMore} timeout={280}>
                                                <Box sx={{ pb: 0.5 }}>{highlightList}</Box>
                                            </Collapse>
                                        </>
                                    ) : (
                                        highlightList
                                    )
                                ) : (
                                    <Typography sx={{ color: "text.secondary", lineHeight: 1.8, fontSize: "1.02rem" }}>{item.desc}</Typography>
                                )}
                            </motion.div>

                            {/* Stack */}
                            {item.stack?.length > 0 && (
                                <motion.div variants={reveal}>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 3 }}>
                                        {item.stack.map((skill) => {
                                            const iconSrc = getStackIconSrc(skill);
                                            return (
                                                <Box
                                                    key={skill}
                                                    component="span"
                                                    sx={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: 0.7,
                                                        px: 1.2,
                                                        py: 0.45,
                                                        borderRadius: 99,
                                                        fontSize: { xs: "0.72rem", md: "0.78rem" },
                                                        color: "text.secondary",
                                                        background: alpha(theme.palette.primary.main, 0.07),
                                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                                                    }}
                                                >
                                                    {iconSrc && <Box component="img" src={iconSrc} alt="" aria-hidden="true" sx={{ width: 14, height: 14, objectFit: "contain" }} />}
                                                    {skill}
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </motion.div>
                            )}

                            {/* Links: only the ones that exist */}
                            {hasLinks && (
                                <motion.div variants={reveal}>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 3 }}>
                                        {item.links.demo && (
                                            <Button
                                                size="small"
                                                variant="contained"
                                                endIcon={<OpenInNewIcon />}
                                                href={item.links.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{ textTransform: "none", boxShadow: "none" }}
                                            >
                                                Live demo
                                            </Button>
                                        )}
                                        {item.links.github && (
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                startIcon={<GitHubIcon />}
                                                href={item.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    textTransform: "none",
                                                    color: "text.secondary",
                                                    borderColor: alpha(theme.palette.primary.main, 0.3),
                                                    "&:hover": { borderColor: alpha(theme.palette.primary.main, 0.6), background: alpha(theme.palette.primary.main, 0.08) },
                                                }}
                                            >
                                                GitHub
                                            </Button>
                                        )}
                                    </Box>
                                </motion.div>
                            )}
                        </Box>

                        {hasPreview && (
                            <motion.div variants={reveal}>
                                <Box sx={{ position: { lg: "sticky" }, top: { lg: 96 } }}>
                                    <PreviewStack
                                        images={images}
                                        title={item.caseStudy.title}
                                        summary={item.caseStudy.summary}
                                        onOpen={() => setLightboxOpen(true)}
                                    />
                                </Box>
                            </motion.div>
                        )}
                    </Box>
                </Box>
            </motion.div>

            {hasPreview && (
                <Lightbox
                    open={lightboxOpen}
                    onClose={() => setLightboxOpen(false)}
                    images={images}
                    title={item.caseStudy.title}
                />
            )}
        </Box>
    );
}