import { Box, Typography } from "@mui/material";
import { alpha, keyframes, useTheme } from "@mui/material/styles";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import TimelineItem from "../../components/timeline/TimelineItem";

import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import SchemaTwoToneIcon from "@mui/icons-material/SchemaTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import HubTwoToneIcon from "@mui/icons-material/HubTwoTone";
import SecurityTwoToneIcon from "@mui/icons-material/SecurityTwoTone";
import BiotechTwoToneIcon from "@mui/icons-material/BiotechTwoTone";
import formImage from "../../assets/images/formImage.png";
import chatImage_1 from "../../assets/images/chatImage_1.png";
import chatImage_2 from "../../assets/images/chatImage_2.png";
import chatImage_load from "../../assets/images/chatImage_load.png";
import widget_1 from "../../assets/images/widget_1.png";
import widget_2 from "../../assets/images/widget_2.png";
import collabflow_1 from "../../assets/images/collabflow1.png";
import collabflow_2 from "../../assets/images/collabflow2.png";
import collabflow_3 from "../../assets/images/collabflow3.png";
import pulsequeue_1 from "../../assets/images/pulsequeue_1.png";
import pulsequeue_2 from "../../assets/images/pulsequeue_2.png";
import pulsequeue_3 from "../../assets/images/pulsequeue_3.png";
import pulsequeue_4 from "../../assets/images/pulsequeue_4.png";
import interviewGuardian_1 from "../../assets/images/interviewGuardian_1.png";
import interviewGuardian_2 from "../../assets/images/interviewGuardian_2.png";
import interviewGuardian_3 from "../../assets/images/interviewGuardian_3.png";
import interviewGuardian_4 from "../../assets/images/interviewGuardian_4.png";
import interviewGuardian_5 from "../../assets/images/interviewGuardian_5.png";
import interviewGuardian_6 from "../../assets/images/interviewGuardian_6.png";

const data = [
    {
        id: "medepal",
        title: "React Native Healthcare App / Web",
        period: "MEDePAL + MHCP",
        subtitle: "Cross-platform caregiver and patient workflows",
        stack: ["React", "React Native", "Role-based UX"],
        highlights: [
            "Delivered MEDePAL + MHCP apps in production across many healthcare roles.",
            "Built prescription flows, patient reports, lab bookings and other end-to-end services.",
            "Enabled white-label variants without forking core app logic.",
        ],
        icon: HealthAndSafetyIcon,
        visualType: "health"
    },
    {
        id: "health-risk-forecasting",
        title: "MedEpal Health Risk Forecasting",
        feature: true,
        period: "ML Disease Surveillance & Forecasting",
        subtitle: "LightGBM modules for Dengue, Delhi respiratory illness and TB, with calibrated forecasts and state-level priority alerts",
        stack: ["Python", "LightGBM", "Quantile Regression", "Conformal Prediction", "Time-Series Forecasting"],
        modelKeywords: [
            "Quantile Gradient Boosting",
            "P10 · P50 · P90",
            "1–6 Month Horizons",
            "Global Model (36 States/UTs)",
            "Rate per Lakh",
            "Conformal Widening",
            "Rolling-Origin Backtesting",
            "Leave-One-Fold-Out Validation",
            "80% Interval Coverage",
            "Lagged Covariates",
            "No Incidence Leakage",
            "Testing-Effort Adjustment",
            "Priority Scoring",
        ],
        highlights: [
            "Built LightGBM modules for Dengue, Delhi respiratory illness and TB under one shared forecasting framework.",
            "TB module: a single quantile LightGBM model shared across 36 states and UTs, forecasting rate per lakh against the recent 3-month average and predicting P10, P50 and P90 for each 1–6 month horizon, with COVID months down-weighted rather than dropped.",
            "Used testing effort (tests per lakh, positivity, active case-finding) as inputs so drops in notifications from reduced testing are not read as falling TB, and kept estimated incidence out of the model to prevent leakage, using it only to measure the case-finding gap.",
            "Added structural and environmental drivers (undernutrition, diabetes, tobacco, HIV, poverty, urbanisation, treatment success, PM2.5, temperature, rainfall), lagged one year for publication delay.",
            "Calibrated uncertainty with conformal widening from rolling-origin backtests, checked on leave-one-fold-out validation against an 80% coverage target.",
            "Combined burden, momentum, case-finding gap and vulnerability into a transparent weighted priority score with operational alerts.",
        ],
        caseStudy: {
            title: "Calibrated Multi-Disease Forecasting",
            summary: "Notification history and testing effort, plus lagged structural and environmental factors, feed a quantile LightGBM model. Conformal calibration and priority scoring turn forecasts into state-level alerts.",
            // images: [pulseguard_1, pulseguard_2, pulseguard_3],
        },
        links: {
            // github: "",
            // demo: "",
        },
        icon: BiotechTwoToneIcon,
        visualType: "ai",
    },
    {
        id: "collabflow",
        title: "CollabFlow",
        feature: true,
        period: "Real-time Collaboration Platform",
        subtitle: "Kanban-style workflow management with socket-driven team updates",
        stack: ["React", "Node.js", "Express", "WebSockets", "PostgreSQL", "MUI"],
        highlights: [
            "Built a project workflow experience with drag-and-drop task movement, team collaboration, and mobile-responsive boards.",
            "Used socket-driven real-time sync so task state, notifications, and board activity stay consistent across active sessions.",
            "Structured the React frontend around reusable board, task, snackbar, and collaboration primitives for maintainable growth.",
        ],
        caseStudy: {
            title: "Realtime Board Architecture",
            summary: "Kanban UI, socket events, API-backed persistence, and notification feedback working as one collaborative product loop.",
            images: [collabflow_1, collabflow_2, collabflow_3],
        },
        links: {
            github: "https://github.com/Dhruba-B/collabflow",
            demo: "https://collabflow-cyan.vercel.app/",
        },
        icon: AccountTreeTwoToneIcon,
        visualType: "collab",
    },
    {
        id: "pulsequeue",
        title: "PulseQueue",
        feature: true,
        period: "Distributed Queue + Worker System",
        subtitle: "Redis-backed job processing with orchestration, retries, and live queue analytics",
        stack: ["Node.js", "Redis", "Express", "React", "Docker", "Distributed Systems"],
        highlights: [
            "Designed a Redis-backed queue with worker orchestration, priority handling, and retry mechanics for resilient background jobs.",
            "Built dashboard views for real-time worker health, job throughput, queue depth, and processing visualization.",
            "Modeled the backend for scalable processing boundaries with clear producer, queue, worker, and monitoring responsibilities.",
        ],
        caseStudy: {
            title: "Queue Processing Architecture",
            summary: "Producer APIs, Redis queue state, worker execution, retry policy, and analytics surfaced through a monitoring dashboard.",
            images: [pulsequeue_1, pulsequeue_2, pulsequeue_3, pulsequeue_4],
        },
        links: {
            github: "https://github.com/Dhruba-B/pulsequeue/tree/ai-pulsequeue",
            demo: "https://pulsequeue-olive.vercel.app/",
        },
        icon: HubTwoToneIcon,
        visualType: "ds",
    },
    {
        id: "key-project-query-builder",
        title: "AI-Assisted Query Builder",
        feature: true,
        period: "LLM APIs + Spring Boot + React",
        subtitle: "Natural language to validated SQL",
        stack: ["LLM APIs", "SQL Validation", "React", "Spring Boot"],
        highlights: [
            "Converted natural language prompts into executable SQL via controlled LLM integration.",
            "Blocked destructive and schema-violating queries through backend validation.",
        ],
        caseStudy: {
            title: "NL to SQL Query Builder",
            summary: "Prompt input to validated SQL flow with server-side safety checks and role-based execution.",
            images: [chatImage_1, chatImage_2, chatImage_load],
        },
        icon: AutoAwesomeTwoToneIcon,
        visualType: "ai"
    },
    {
        id: "key-project-dynamic-forms",
        title: "Schema-Driven UI & Data Engine",
        feature: true,
        period: "Forms + SQL + Reports + Widgets",
        subtitle: "Configuration as stored data",
        stack: ["React", "Dynamic Rendering", "Validation Rules", "SQL Engine"],

        highlights: [
            "Designed a schema-driven engine to dynamically generate forms, reports, and UI widgets from backend configuration.",
            "Enabled runtime SQL execution, validation logic, and database mappings without requiring frontend changes or redeployments.",
        ],

        caseStudy: {
            title: "Schema-Driven UI & Data Engine",
            summary:
                "A configuration-driven system enabling dynamic forms, SQL-powered reports, and widget generation from backend-defined schemas.",
            images: [formImage, widget_1, widget_2],
        },

        icon: SchemaTwoToneIcon,
        visualType: "data"
    },
    {
        id: "interview-guardian",
        title: "Interview Guardian",
        feature: true,
        period: "Multi-tenant exam & proctoring SaaS",
        subtitle: "Exam management with automated grading and AI-assisted proctoring",
        stack: ["React", "Node.js", "PostgreSQL", "Prisma", "AI Proctoring"],
        highlights: [
            "Multi-tenant platform with role-based access for admins, teachers and students, isolated per organization.",
            "Full exam lifecycle: authoring, assignments, timed attempts with autosave, auto-graded MCQs and manual grading for descriptive answers.",
            "AI-assisted proctoring that tracks browser activity and violations and scores risk.",
        ],
        caseStudy: {
            title: "Assessment & Proctoring",
            summary: "Exam authoring, student attempts, grading and proctoring in one multi-tenant engine.",
            images: [
                interviewGuardian_1,
                interviewGuardian_2,
                interviewGuardian_3,
                interviewGuardian_4,
                interviewGuardian_5,
                interviewGuardian_6,
            ],
        },
        links: {
            github: "https://github.com/Dhruba-B/local_interviewGuard",
            demo: "https://local-interview-guard.vercel.app/",
        },
        icon: SecurityTwoToneIcon,
        visualType: "ai",
    },
];


// {
//     id: "key-projects-mobile-and-fintech",
//     title: "White-label Mobile Delivery",
//     period: "MAMATA, Nursing App,",
//     subtitle: "Client-specific variants from a shared core",
//     stack: ["React Native", "Spring Boot", "Multi-tenant Security"],
//     highlights: [
//         "Engineered MAMATA as a white-label extension of MEDePAL, enabling rapid client-specific deployments from a shared core.",
//         "Translated a single codebase into branded, feature-adaptive mobile variants through modular architecture",
//     ],
//     caseStudy: {
//         title: "White-labeled product Delivery",
//         summary: "Reusable core app adapted into client-specific variants via branding and module configuration.",
//         images: [medepal_1, medepal_2, medepal_3],
//     },
//     icon: MobileFriendlyIcon,
//     visualType: "mobile"
// },
// {
//     id: "UI_Architecture",
//     title: "Scalable, Component-Driven UI Architecture",
//     period: "Platform Modernization",
//     subtitle: "Shared React + MUI design system",
//     stack: ["React", "MUI", "Component Architecture"],
//     highlights: [
//         "Refactored legacy screens into a shared React + MUI component library.",
//         "Reduced duplication and enforced UI consistency across modules.",
//         "Set scalable front-end standards for multi-tenant products.",
//     ],
//     icon: WidgetsIcon,
//     visualType: "system"
// },

// The spine's x-position must match the centre of the node column in TimelineItem.jsx
// (node column: 40px on mobile, 72px from md up).
const SPINE_X = { xs: "20px", md: "36px" };

const twinkle = keyframes`
    0%, 100% { opacity: 0.18; transform: scale(1); }
    50% { opacity: 0.75; transform: scale(1.25); }
`;

// ─── Scroll-driven path: the one big motion moment ───────────────────────────
function Spine({ targetRef }) {
    const theme = useTheme();
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start 0.6", "end 0.6"],
    });
    const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
    const headTop = useTransform(progress, (v) => `${v * 100}%`);

    return (
        <Box
            aria-hidden="true"
            sx={{
                position: "absolute",
                top: { xs: 54, md: 86 },
                bottom: 0,
                left: SPINE_X,
                width: 2,
                transform: "translateX(-50%)",
                zIndex: 0,
                pointerEvents: "none",
                WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 82%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, #000 0%, #000 82%, transparent 100%)",
            }}
        >
            {/* faint full-length track */}
            <Box sx={{ position: "absolute", inset: 0, background: alpha(theme.palette.primary.main, 0.16) }} />

            {/* filled path that grows with scroll */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: 0,
                    scaleY: progress,
                    transformOrigin: "top",
                    background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
                    boxShadow: `0 0 12px ${alpha(theme.palette.accent.main, 0.5)}`,
                }}
            />

            {/* comet head */}
            <motion.div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: headTop,
                    width: 10,
                    height: 10,
                    marginLeft: -5,
                    marginTop: -5,
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow: `0 0 10px 3px ${alpha(theme.palette.accent.main, 0.75)}, 0 0 28px 8px ${alpha(theme.palette.primary.main, 0.35)}`,
                }}
            />
        </Box>
    );
}

function SectionHeader() {
    const reduce = useReducedMotion();
    return (
        <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <Box sx={{ pl: { xs: "60px", md: "108px" }, mb: { xs: 1, md: 2 } }}>
                <Typography
                    component="h2"
                    sx={{ fontSize: { xs: "1.9rem", md: "2.6rem" }, fontWeight: 600, lineHeight: 1.15, color: "text.primary" }}
                >
                    Projects
                </Typography>
            </Box>
        </motion.div>
    );
}

export default function Timeline() {
    const theme = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const refs = useRef([]);
    const listRef = useRef(null);

    // Same deterministic layout as before, fewer stars, CSS-only twinkle (cheap).
    const stars = useMemo(
        () =>
            Array.from({ length: 28 }, (_, i) => ({
                id: i,
                x: (i * 37) % 100,
                y: (i * 53) % 100,
                size: 1.5 + ((i * 17) % 14) / 10,
                delay: (i % 12) * 0.45,
                duration: 3.5 + (i % 7) * 0.7,
                warm: i % 5 === 0,
            })),
        []
    );

    // The project crossing the middle band of the viewport is the "active" one.
    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveIndex(Number(entry.target.dataset.index));
                });
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
        );
        refs.current.forEach((el) => el && io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <Box
            id="projects"
            component="section"
            sx={{
                position: "relative",
                overflow: "hidden",
                py: { xs: 8, md: 12 },
            }}
        >
            {/* soft horizon glow at the top */}
            <Box
                aria-hidden="true"
                sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background: `radial-gradient(ellipse at 50% 0%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 55%)`,
                }}
            />

            {/* starfield */}
            <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {stars.map((s) => (
                    <Box
                        key={s.id}
                        sx={{
                            position: "absolute",
                            left: `${s.x}%`,
                            top: `${s.y}%`,
                            width: s.size,
                            height: s.size,
                            borderRadius: "50%",
                            background: s.warm ? theme.palette.accent.main : "#e0e7ff",
                            animation: `${twinkle} ${s.duration}s ease-in-out ${s.delay}s infinite`,
                            "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 0.4 },
                        }}
                    />
                ))}
            </Box>

            <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1080, mx: "auto", px: { xs: 2.5, md: 6 } }}>
                <SectionHeader />

                <Box ref={listRef} sx={{ position: "relative" }}>
                    <Spine targetRef={listRef} />

                    {data.map((item, index) => (
                        <Box
                            key={item.id}
                            id={index === 0 ? "timeline-start" : undefined}
                            data-index={index}
                            ref={(el) => (refs.current[index] = el)}
                            sx={{ position: "relative", zIndex: 1 }}
                        >
                            <TimelineItem item={item} index={index} isActive={index === activeIndex} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}