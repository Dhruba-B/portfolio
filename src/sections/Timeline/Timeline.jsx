import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import TimelineItem from "../../components/timeline/TimelineItem";
import ProgressTimeline from "../../components/timeline/ProgressTimeline";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import SchemaTwoToneIcon from "@mui/icons-material/SchemaTwoTone";
import InsightsIcon from "@mui/icons-material/Insights";
import formImage from "../../assets/images/formImage.png";
import portrait1 from "../../assets/images/potrait_1.png";
import portrait2 from "../../assets/images/potrait_2.png";
import chatImage_1 from "../../assets/images/chatImage_1.png";
import chatImage_2 from "../../assets/images/chatImage_2.png";
import chatImage_load from "../../assets/images/chatImage_load.png";
import widget_1 from "../../assets/images/widget_1.png";
import widget_2 from "../../assets/images/widget_2.png";
import medepal_1 from "../../assets/images/medepal_1.png";
import medepal_2 from "../../assets/images/medepal_2.png";
import medepal_3 from "../../assets/images/medepal_3.png";
import workflowGif from "../../assets/images/programming-language.gif";

const data = [
    {
        id: "start",
        title: "Full Stack Developer — Stellablue",
        period: "Aug 2022 - Present",
        subtitle: "MEDePAL, MHCP - Healthcare Platforms",
        stack: ["React", "React Native", "Spring Boot", "MySQL"],
        highlights: [
            "Built and shipped production features across healthcare web and mobile platforms.",
            "Worked across the full stack — from schema design to UI delivery.",
            "Applied reusable architecture patterns to support multi-tenant scale.",
        ],
        icon: RocketLaunchIcon,
        visualType: "data"
    },
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
        id: "key-projects-mobile-and-fintech",
        title: "White-label Mobile Delivery",
        period: "MAMATA, Nursing App,",
        subtitle: "Client-specific variants from a shared core",
        stack: ["React Native", "Spring Boot", "Multi-tenant Security"],
        highlights: [
            "Engineered MAMATA as a white-label extension of MEDePAL, enabling rapid client-specific deployments from a shared core.",
            "Translated a single codebase into branded, feature-adaptive mobile variants through modular architecture",
        ],
        caseStudy: {
            title: "White-labeled product Delivery",
            summary: "Reusable core app adapted into client-specific variants via branding and module configuration.",
            images: [medepal_1, medepal_2, medepal_3],
        },
        icon: MobileFriendlyIcon,
        visualType: "mobile"
    },
    {
        id: "UI_Architecture",
        title: "Scalable, Component-Driven UI Architecture",
        period: "Platform Modernization",
        subtitle: "Shared React + MUI design system",
        stack: ["React", "MUI", "Component Architecture"],
        highlights: [
            "Refactored legacy screens into a shared React + MUI component library.",
            "Reduced duplication and enforced UI consistency across modules.",
            "Set scalable front-end standards for multi-tenant products.",
        ],
        icon: WidgetsIcon,
        visualType: "system"
    },
    {
        id: "nomura",
        title: "Nomura / Mitsubishi Trust Bank",
        period: "Multi-Tenant Financial Reconciliation System",
        subtitle: "Java + Spring Batch in regulated production",
        stack: ["Java", "Spring Batch", "Enterprise Processes"],
        highlights: [
            "Contributed to trade and ledger settlement reconciliation batch workflows.",
            "Worked on tenant-isolated processing with client-specific configurations.",
            "Delivered under fintech-grade compliance and enterprise review pipelines.",
        ],
        icon: AccountBalanceIcon,
        visualType: "infra"
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
            Array.from({ length: 95 }, (_, i) => {
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

    const scrollTo = (index) => {
        refs.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    };

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "visible",
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
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    animate={{
                        opacity: [0.2, 0.85, 0.2],
                        scale: [0.9, 1.25, 0.9],
                        y: [0, -3, 0],
                    }}
                    transition={{
                        duration: star.duration,
                        delay: star.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{
                        position: "absolute",
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                        borderRadius: "50%",
                        background:
                            star.id % 4 === 0
                                ? alpha(theme.palette.accent.main, 0.95)
                                : alpha("#e0e7ff", 0.9),
                        boxShadow:
                            star.id % 4 === 0
                                ? `0 0 10px ${alpha(theme.palette.accent.main, 0.75)}`
                                : "0 0 8px rgba(224,231,255,0.7)",
                        zIndex: 0,
                        pointerEvents: "none",
                    }}
                />
            ))}
            <ProgressTimeline
                items={data}
                activeIndex={activeIndex}
                onClick={scrollTo}
            />

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