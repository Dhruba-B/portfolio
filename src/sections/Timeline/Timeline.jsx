import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import TimelineItem from "../../components/timeline/TimelineItem";
import ProgressTimeline from "../../components/timeline/ProgressTimeline";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HubIcon from "@mui/icons-material/Hub";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const data = [
    {
        id: "start",
        title: "2022 — Beginning",
        desc: "Started my journey at Stellablue working on healthcare systems",
        icon: MedicalServicesIcon,
    },
    {
        id: "medepal",
        title: "Medepal Platform",
        desc: "Worked on core modules, dynamic forms, and system architecture",
        icon: HubIcon,
    },
    {
        id: "whitelabel",
        title: "Scaling Systems",
        desc: "Adapted product into multiple white-labeled deployments",
        icon: AccountTreeIcon,
    },
    {
        id: "nomura",
        title: "Nomura Project",
        desc: "Contributed to multi-tenant financial system for Mitsubishi Trust Bank",
        icon: BusinessIcon,
    },
    {
        id: "mobile",
        title: "Mobile Applications",
        desc: "Built React Native apps including Medepal & MAMATA",
        icon: PhoneIphoneIcon,
    },
    {
        id: "ai",
        title: "AI Integration",
        desc: "Integrated natural language to SQL in query builder",
        icon: SmartToyIcon,
    },
];

export default function Timeline() {
    const [activeIndex, setActiveIndex] = useState(0);
    const refs = useRef([]);

    useEffect(() => {
        const observers = refs.current.map((ref, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveIndex(index);
                    }
                },
                { threshold: 0.6 }
            );

            if (ref) observer.observe(ref);

            return observer;
        });

        return () => observers.forEach((obs) => obs.disconnect());
    }, []);

    const scrollTo = (index) => {
        refs.current[index]?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Box>
            <ProgressTimeline
                items={data}
                activeIndex={activeIndex}
                onClick={scrollTo}
            />

            {data.map((item, index) => (
                <Box key={item.id} ref={(el) => (refs.current[index] = el)}>
                    <TimelineItem item={item} index={index} />
                </Box>
            ))}
        </Box>
    );
}