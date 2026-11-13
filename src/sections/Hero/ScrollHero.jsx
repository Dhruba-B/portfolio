import { useMemo, useRef } from "react";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EarthBackdrop from "../../components/space/EarthBackdrop";
import Reveal from "../../components/space/Reveal";
import portrait1 from "../../assets/images/potrait_1.png";
import TechCredibilityPanel from "../Credibility/TechCredibilityPanel";
import { Orbit } from "lucide-react";
import OrbitCapabilities from "./OrbitCapabilities";
import MissionControl from "./MissionControl";

/* ─────────────── content (all taken from your previous hero) ─────────────── */
const HERO_STATS = [
    { value: "4+", label: "Years experience" },
    { value: "20+", label: "Production Deployments" },
    { value: "2+", label: "Industry domains" },
    { value: "100% [ 4 ]", label: "Layer Stack ownership" },
];

const STATS = [
    { value: "4+", label: "Years experience" },
    { value: "4", label: "Mobile / Web Apps developed" },
    { value: "60+", label: "Feature Update Cycles" },
    { value: "40+", label: "Refactoring & Debugging Cycles" },
];

const CAPABILITIES = [
    { title: "Frontend engineering", text: "Accessible, responsive interfaces built with reusable components and shared design tokens." },
    { title: "API design", text: "Versioned REST and typed APIs with documented contracts, validation and consistent error handling." },
    { title: "Database modeling", text: "Relational and document schemas with indexing, constraints and migration plans for existing data." },
    { title: "Background job processing", text: "Queue-based workers with retries, backoff, idempotency and dead-letter handling." },
    { title: "Real-time collaboration", text: "Live, multi-user features built on WebSockets, with conflict handling and presence." },
    { title: "AI-assisted features", text: "LLM integrations with scoped prompts, output validation and fallbacks for failed or low-confidence results." },
];

const DOMAINS = ["Healthcare", "Fintech", "AI Systems"]; // from your commented-out chips – edit/remove freely
const QUALITIES = ["Scalability", "Reliability", "Maintainability"];

const PHONE_HREF = "tel:+919903859325";

/* ─────────────────────────────── shared styles ─────────────────────────────── */
const glass = (t) => ({
    background: `linear-gradient(180deg, ${alpha(t.palette.background.paper, 0.62)}, ${alpha(t.palette.background.default, 0.55)})`,
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: `1px solid ${alpha(t.palette.primary.main, 0.25)}`,
    borderRadius: "16px",
    boxShadow: `0 10px 40px ${alpha(t.palette.primary.main, 0.1)}`,
});

const gradientText = (t) => ({
    background: `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.accent.main})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
});

const pill = (t) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 1,
    px: 1.4,
    py: 0.6,
    borderRadius: 999,
    border: `1px solid ${alpha(t.palette.accent.main, 0.28)}`,
    background: alpha(t.palette.accent.main, 0.06),
});

const primaryBtn = (t) => ({
    px: 3.2,
    py: 1.2,
    borderRadius: 999,
    fontWeight: 700,
    fontSize: "0.85rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#fff",
    background: `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.accent.main} 120%)`,
    boxShadow: `0 0 24px ${alpha(t.palette.primary.main, 0.45)}`,
    transition: "box-shadow 0.3s ease",
    "&:hover": {
        boxShadow: `0 0 36px ${alpha(t.palette.primary.main, 0.65)}`,
        background: `linear-gradient(90deg, ${t.palette.primary.main} -20%, ${t.palette.accent.main} 140%)`,
    },
});

const outlineBtn = (t) => ({
    px: 3.2,
    py: 1.2,
    borderRadius: 999,
    fontWeight: 700,
    fontSize: "0.85rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    borderColor: alpha(t.palette.accent.main, 0.5),
    color: "text.primary",
    backdropFilter: "blur(8px)",
    background: alpha(t.palette.accent.main, 0.06),
    transition: "all 0.3s ease",
    "&:hover": {
        borderColor: t.palette.accent.main,
        background: alpha(t.palette.accent.main, 0.12),
        boxShadow: `0 0 20px ${alpha(t.palette.accent.main, 0.25)}`,
    },
});

const sectionPanel = (t) => ({
    ...glass(t),
    // darker than the default glass so the Earth never washes out the text
    background: `linear-gradient(180deg, ${alpha(t.palette.background.default, 0.84)}, ${alpha(t.palette.background.default, 0.72)})`,
    borderRadius: "28px",
    p: { xs: 3, md: 6 },
    boxShadow: `0 20px 80px ${alpha(t.palette.background.default, 0.6)}, 0 0 0 1px ${alpha(t.palette.accent.main, 0.08)} inset`,
});

/* ──────────────────────────── small building blocks ──────────────────────────── */
const Eyebrow = ({ children, center }) => (
    <Typography
        sx={{
            color: "text.secondary",
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
            mb: 1.5,
            textAlign: center ? "center" : "left",
        }}
    >
        {children}
    </Typography>
);

const Title = ({ children, center }) => (
    <Typography
        variant="h2"
        sx={(t) => ({
            ...gradientText(t),
            fontWeight: 700,
            lineHeight: 1.15,
            fontSize: { xs: "1.9rem", md: "3rem" },
            textAlign: center ? "center" : "left",
            filter: "drop-shadow(0 2px 14px rgba(5,6,15,0.75))",
        })}
    >
        {children}
    </Typography>
);

const Sub = ({ children, center }) => (
    <Typography
        sx={{
            mt: 2.5,
            maxWidth: 620,
            mx: center ? "auto" : 0,
            color: "text.secondary",
            lineHeight: 1.8,
            fontSize: { xs: "0.9rem", md: "1rem" },
            textAlign: center ? "center" : "left",
        }}
    >
        {children}
    </Typography>
);

const Act = ({ children, sx }) => (
    <Box
        component="section"
        data-earth-act
        sx={[
            {
                minHeight: { xs: "auto", md: "100vh" },
                display: "flex",
                alignItems: "center",
                px: { xs: 3, md: 8, lg: 16 },
                py: { xs: 8, md: 14 },
            },
            ...(sx ? [sx] : []),
        ]}
    >
        <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto" }}>{children}</Box>
    </Box>
);

/**
 * Multi-act scroll hero – drop-in replacement for the old <HeroSection />.
 * Keep id="hero": App.jsx's progress timeline and scroll helper use it.
 */
export default function ScrollHero({ sections = [], onSectionSelect }) {
    const theme = useTheme();
    const zoneRef = useRef(null);

    const goTo = (id) => {
        const i = sections.findIndex((s) => s.id === id);
        if (i >= 0) onSectionSelect?.(i);
    };

    const orbitalBodies = useMemo(
        () => [
            { id: "planet-a", size: 12, top: "14%", left: "10%", hue: "accent", moon: false },
            { id: "planet-b", size: 40, top: "26%", left: "84%", hue: "primary", moon: false },
            { id: "planet-c", size: 36, top: "72%", left: "80%", hue: "accent", moon: true },
            { id: "planet-d", size: 26, top: "80%", left: "24%", hue: "primary", moon: false },
        ],
        []
    );

    return (
        <Box
            ref={zoneRef}
            id="hero"
            sx={{
                position: "relative",
                color: "text.primary",
                backgroundColor: theme.palette.background.default,
                overflowX: "clip", // not "hidden" – that would break the sticky Earth canvas
            }}
        >
            {/* must be the first child */}
            <EarthBackdrop zoneRef={zoneRef} />

            <Box sx={{ position: "relative", zIndex: 1 }}>
                {/* ── Header pill (same as before) ───────────────────────────── */}
                <Box
                    component="header"
                    sx={{
                        position: "absolute",
                        top: { xs: 24, md: 36 },
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
                        onClick={(e) => {
                            e.preventDefault();
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
                            "&:focus-visible": { outline: `2px solid ${alpha(theme.palette.accent.main, 0.6)}`, outlineOffset: 3 },
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
                            "&::-webkit-scrollbar": { display: "none" },
                        }}
                    >
                        {sections.map((section, index) => (
                            <Button
                                key={section.id}
                                size="small"
                                href={`#${section.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
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
                                    "&:hover, &:focus-visible": { color: "text.primary", background: alpha(theme.palette.primary.main, 0.12) },
                                }}
                            >
                                {section.title}
                            </Button>
                        ))}
                    </Box>
                </Box>

                {/* ── Act 0 · your original hero ─────────────────────────────── */}
                <Act sx={{ py: { xs: 12, md: 14 } }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: { xs: "center", md: "space-between" },
                            gap: { xs: 6, md: 10 },
                            flexDirection: { xs: "column-reverse", md: "row" },
                            textAlign: { xs: "center", md: "left" },
                        }}
                    >
                        {/* LEFT */}
                        <Box
                            sx={(t) => ({
                                ...glass(t),
                                background: `linear-gradient(180deg, ${alpha(t.palette.background.default, 0.84)}, ${alpha(t.palette.background.default, 0.72)})`,
                                borderRadius: "24px",
                                p: { xs: 3, md: 5 },
                                position: "relative",
                                width: "100%",
                                maxWidth: { xs: 560, md: 800 },
                                mx: { xs: "auto", md: 0 },
                            })}
                        >
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
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

                                <Typography
                                    sx={{
                                        display: "block",
                                        fontWeight: 200,
                                        fontSize: { xs: "2.2rem", md: "3.4rem" },
                                        fontFamily: "'JetBrains Mono', monospace",
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1.05,
                                        color: "text.primary",
                                    }}
                                >
                                    <motion.span
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ display: "inline-block" }}
                                    >
                                        <Box
                                            component="span"
                                            sx={{
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontWeight: 700,
                                                fontSize: { xs: "2rem", md: "3.2rem" },
                                                letterSpacing: "-0.03em",
                                                background: `linear-gradient(45deg, white, ${theme.palette.accent.main})`,
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                            }}
                                        >
                                            Dhrubashis Basak
                                        </Box>
                                    </motion.span>
                                </Typography>

                                {/* badges */}
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    gap={1}
                                    sx={{ my: 2, flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-start" } }}
                                >
                                    {[
                                        { label: "Full Stack Engineer", color: theme.palette.accent.main },
                                        { label: "System Builder", color: theme.palette.accent.secondary ?? theme.palette.primary.main },
                                    ].map((b) => (
                                        <Box key={b.label} sx={pill(theme)}>
                                            <motion.div
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                                                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                                            >
                                                <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: b.color, boxShadow: `0 0 8px ${alpha(b.color, 0.8)}` }} />
                                            </motion.div>
                                            <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "text.secondary" }}>
                                                {b.label}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        ...gradientText(theme),
                                        fontWeight: 700,
                                        lineHeight: 1.15,
                                        fontSize: { xs: "1.8rem", md: "3.2rem" },
                                        textAlign: { xs: "center", md: "left" },
                                    }}
                                >
                                    Designing &amp; Engineering
                                    <br />
                                    complete product systems.
                                </Typography>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <Typography sx={{ mt: 2.5, color: "text.secondary", lineHeight: 1.8, fontSize: { xs: "0.85rem", md: "1rem" }, maxWidth: 760, mb: 4 }}>
                                    From responsive user interfaces and design systems to API contracts, schema architecture, distributed
                                    workflows, and batch processing pipelines — built and shipped full-stack solutions across regulated
                                    production environments with a focus on scalability, reliability, and maintainability.
                                </Typography>

                                <Box sx={{ display: "flex", gap: 3, mt: 3, flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-start" } }}>
                                    {HERO_STATS.map((s, i) => (
                                        <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.08 }}>
                                            <Typography sx={{ ...gradientText(theme), fontWeight: 800, fontSize: "1.4rem" }}>{s.value}</Typography>
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
                                        onClick={(e) => {
                                            e.preventDefault();
                                            goTo("experience");
                                        }}
                                        sx={primaryBtn(theme)}
                                    >
                                        View Work
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                                    <Button
                                        href={PHONE_HREF}
                                        variant="outlined"
                                        startIcon={<LocalPhoneRoundedIcon fontSize="small" />}
                                        sx={outlineBtn(theme)}
                                    >
                                        Get in Touch
                                    </Button>
                                </motion.div>
                            </Box>
                        </Box>

                        {/* RIGHT – portrait with orbit */}
                        <Box
                            sx={{
                                position: "relative",
                                zIndex: 6,
                                flexShrink: 0,
                                width: { xs: 260, md: 400 },
                                height: { xs: 260, md: 400 },
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: alpha(theme.palette.primary.main, 0.16),
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                boxShadow: `0 0 90px ${alpha(theme.palette.primary.main, 0.3)}`,
                            }}
                        >
                            <Box
                                sx={{
                                    width: "75%",
                                    height: "75%",
                                    borderRadius: "50%",
                                    background: theme.palette.background.paper,
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                                    boxShadow: `0 0 45px ${alpha(theme.palette.primary.main, 0.2)}`,
                                    overflow: "hidden",
                                }}
                            >
                                <Box component="img" src={portrait1} alt="Dhrubashis Basak portrait" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                                        <Box sx={{ position: "absolute", inset: -10, borderRadius: "50%" }}>
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
                        </Box>
                    </Box>
                </Act>

                {/* ── Act 1 · what I build ───────────────────────────────────── */}
                <Act>
                    <Box sx={sectionPanel}>
                        <Reveal>
                            <Eyebrow center>Everything in orbit</Eyebrow>
                        </Reveal>
                        <Reveal delay={100}>
                            <Box sx={{ maxWidth: 860, mx: "auto" }}>
                                <Title center>One engineer across the entire product surface</Title>
                            </Box>
                        </Reveal>
                        <Reveal delay={200}>
                            <Sub center>From the interface a user touches to the pipelines running behind it.</Sub>
                        </Reveal>

                        <OrbitCapabilities items={CAPABILITIES} />
                    </Box>
                </Act>

                {/* ── Act 2 · by the numbers ── */}
                <Act>
                    <Box sx={sectionPanel}>
                        <MissionControl
                            Reveal={Reveal}
                            stats={STATS}
                            sectors={DOMAINS}
                            intro={
                                <>
                                    <Reveal>
                                        <Eyebrow>Built for momentum</Eyebrow>
                                    </Reveal>
                                    <Reveal delay={100}>
                                        <Title>Production-grade, end to end.</Title>
                                    </Reveal>
                                    <Reveal delay={200}>
                                        <Sub>
                                            Full ownership of the stack, shipped across regulated production environments with a focus on the
                                            things that keep systems healthy long after launch.
                                        </Sub>
                                    </Reveal>
                                    <Reveal delay={300}>
                                        <Button
                                            href="#experience"
                                            variant="contained"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                goTo("experience");
                                            }}
                                            sx={{ ...primaryBtn(theme), mt: 4 }}
                                        >
                                            View Work
                                        </Button>
                                    </Reveal>
                                </>
                            }
                        />
                    </Box>
                </Act>

                {/* ── Act 3 · call to action ─────────────────────────────────── */}
                <Act sx={{ justifyContent: "center" }}>
                    <Reveal y={40} sx={(t) => ({ ...glass(t), textAlign: "center" })}>
                        <TechCredibilityPanel />
                    </Reveal>
                </Act>
            </Box>
        </Box>
    );
}


{/* <Eyebrow center>Let's talk</Eyebrow>
<Title center>Have a system that needs building?</Title>
<Sub center>
    Tell me about your product and the constraints around it — I'll help you ship it reliably, from interface to
    infrastructure.
</Sub>
<Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4.5 }}>
    <Button href={PHONE_HREF} variant="contained" startIcon={<LocalPhoneRoundedIcon fontSize="small" />} sx={primaryBtn(theme)}>
        Get in Touch
    </Button>
    <Button
        href="#experience"
        variant="outlined"
        onClick={(e) => {
            e.preventDefault();
            goTo("experience");
        }}
        sx={outlineBtn(theme)}
    >
        View Work
    </Button>
</Stack> */}