import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import TimelineItem from "../../components/timeline/TimelineItem";

import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import SchemaTwoToneIcon from "@mui/icons-material/SchemaTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import HubTwoToneIcon from "@mui/icons-material/HubTwoTone";
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
];

export default function Timeline() {
    const theme = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const refs = useRef([]);
    const stars = useMemo(
        () =>
            Array.from({ length: 32 }, (_, i) => {
                const x = (i * 37) % 100;
                const y = (i * 53) % 100;
                const size = 1.5 + ((i * 17) % 16) / 10;
                const delay = (i % 12) * 0.22;
                const duration = 2.6 + (i % 7) * 0.5;

                return { id: i, x, y, size, delay, duration };
            }),
        []
    );

    useEffect(() => {
        const observers = refs.current.map((ref, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveIndex(index);
                    }
                },
                {
                    threshold: 0.35,
                    rootMargin: "-15% 0px -30% 0px",
                }
            );

            if (ref) observer.observe(ref);

            return observer;
        });

        return () => observers.forEach((obs) => obs.disconnect());
    }, []);

    return (
        <Box
            id="projects"
            component="section"
            sx={{
                position: "relative",
                overflow: "hidden",
                overflowX: "hidden",
                pb: 10,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 0,
                    background: `radial-gradient(circle at 50% 0%, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 55%)`,
                }}
            />
            {stars.map((star) => {
                const starStyle = {
                    position: "absolute",
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: star.size,
                    height: star.size,
                    borderRadius: "50%",
                    background:
                        star.id % 4 === 0
                            ? alpha(theme.palette.accent.main, 0.78)
                            : alpha("#e0e7ff", 0.58),
                    boxShadow:
                        star.id % 4 === 0
                            ? `0 0 8px ${alpha(theme.palette.accent.main, 0.42)}`
                            : "0 0 6px rgba(224,231,255,0.34)",
                    zIndex: 0,
                    pointerEvents: "none",
                };

                return star.id < 10 ? (
                    <motion.div
                        key={star.id}
                        animate={{ opacity: [0.24, 0.62, 0.24] }}
                        transition={{
                            duration: star.duration + 3,
                            delay: star.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={starStyle}
                    />
                ) : (
                    <Box key={star.id} sx={starStyle} />
                );
            })}
            {data.map((item, index) => (
                <Box
                    key={item.id}
                    id={index === 0 ? "timeline-start" : undefined}
                    ref={(el) => (refs.current[index] = el)}
                    sx={{ position: "relative", zIndex: 1 }}
                >
                    <TimelineItem
                        item={item}
                        index={index}
                        isActive={index === activeIndex}
                    />
                </Box>
            ))}
        </Box>
    );
}
