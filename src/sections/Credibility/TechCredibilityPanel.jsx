import { Box, Chip, Typography, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import reactLogo from "../../assets/react.svg";
import pythonLogo from "../../assets/icons/python.png";
import jsLogo from "../../assets/icons/js.png";
import ngrokLogo from "../../assets/icons/ngrok.png";
import javaLogo from "../../assets/icons/java.svg";
import springLogo from "../../assets/icons/spring.png";
import mysqlLogo from "../../assets/icons/sql.png";
import gitLogo from "../../assets/icons/git.png";
import nodeLogo from "../../assets/icons/node.png";
import redisLogo from "../../assets/icons/redis.png";
import ollamaLogo from "../../assets/icons/ollama.png";
import postgresqlLogo from "../../assets/icons/Postgresql.svg.png";
import dockerLogo from "../../assets/icons/docker.png";
import { useEffect, useRef, useState } from "react";

const skillGroups = [
  {
    title: "Frontend",
    spotlight: [{ name: "React + React Native", logo: reactLogo }],
    summary:
      "Build scalable, component-driven interfaces with responsive architecture, reusable UI patterns, drag-and-drop workflows, and real-time product feedback.",
    skills: ["Material UI (MUI)", "JavaScript ES6+", "Responsive UI Engineering", "Drag & Drop Systems", "State Management", "Real-time UI"],
    accentColor: "#61DAFB",
  },
  {
    title: "Backend",
    spotlight: [
      { name: "Spring Boot", logo: springLogo },
      { name: "Java", logo: javaLogo },
    ],
    summary:
      "Design production-grade backend services with REST API contracts, modular service boundaries, socket-driven collaboration, and scalable processing flows.",
    skills: ["REST APIs", "Express.js", "WebSockets", "Distributed Systems", "Queue Architectures", "Worker Systems"],
    accentColor: "#6DB33F",
  },
  {
    title: "AI & LLMs",
    spotlight: [
      { name: "JavaScript", logo: jsLogo },
      { name: "Spring Boot", logo: springLogo },
    ],
    summary:
      "Built LLM-powered features for healthcare and analytics products: NL-to-SQL with destructive-query blocking, prescription digitisation with strict JSON-schema outputs, and AI analysis assistants grounded in forecast data, backed by validation, and production guardrails.",
    skills: [
      "LLM API Integration (OpenAI)", "Structured Outputs", "Natural Language to SQL", "Prompt Engineering", "Validation & Guardrails", "AI Question Generation", "Agentic AI Tools (Codex)",
    ],
    accentColor: "#fcf967",
  },
  {
    title: "Machine Learning",
    spotlight: [
      { name: "JavaScript", logo: jsLogo },
      { name: "Python", logo: pythonLogo },
    ],
    summary:
      "Built an end-to-end disease forecasting pipeline: feature engineering, quantile models with conformal calibration, rolling-origin backtesting, and a REST API feeding a live risk dashboard.",
    skills: [
      "Time-series Forecasting",
      "LightGBM",
      "Prediction Intervals",
      "Conformal Calibration",
      "Backtesting",
      "Feature Engineering",
    ],
    accentColor: "#7dd3fc",
  },
  {
    title: "Scalable Backend Systems",
    spotlight: [
      { name: "Node.js", logo: nodeLogo },
      { name: "Redis", logo: redisLogo },
    ],
    summary:
      "Build scalable backend architectures powering real-time collaboration, distributed job processing, worker orchestration, and resilient API-driven systems.",
    skills: [
      "REST APIs", "Express.js", "WebSockets", "Redis Queues", "Real-time Communication", "Scalable Processing Pipelines",
    ],
    accentColor: "#DC382D",
  },
  {
    title: "Database",
    spotlight: [
      { name: "MySQL", logo: mysqlLogo },
      { name: "PostgreSQL", logo: postgresqlLogo },
    ],
    summary:
      "Implemented schema design and query optimization strategies for transactional workflows, reporting, and queue-backed system state.",
    skills: ["PostgreSQL", "MySQL", "Redis", "Schema Design", "Query Optimisation", "Data Modeling"],
    accentColor: "#61DAFB",
  },
  {
    title: "Distributed AI Infrastructure",
    spotlight: [
      { name: "Ollama", logo: ollamaLogo },
      { name: "Redis", logo: redisLogo },
    ],
    summary:
      "Engineered a distributed AI execution platform with specialized worker orchestration, local LLM inference, capability-based scheduling, realtime observability, and resilient AI processing pipelines.",
    skills: ["AI Worker Orchestration", "Local LLM Inference", "Ollama", "Capability-Based Routing", "Redis Coordination", "Background AI Processing"],
    accentColor: "#A78BFA",
  },
  {
    title: "DevOps & Infra",
    spotlight: [
      { name: "Git", logo: gitLogo },
      { name: "Docker", logo: dockerLogo },
    ],
    summary:
      "Shape delivery-ready systems with containerized services, background processing, observable worker flows, and architecture choices that keep growth manageable.",
    skills: ["Docker", "Redis", "Scalable Architecture", "Background Job Processing", "System Design"],
    accentColor: "#38BDF8",
  },
  {
    title: "Tooling",
    spotlight: [
      { name: "Git", logo: gitLogo },
      { name: "Ngrok", logo: ngrokLogo },
    ],
    summary:
      "Executed disciplined delivery workflows with version control, API validation, integration testing support, and repeatable release readiness for client environments.",
    skills: ["Postman", "Ngrok", "White-label Deployment", "Release Workflow", "CI/CD Pipelines", "Code Review Standards"],
    accentColor: "#F97316",
  },
];

// ─── LogoOrb ──────────────────────────────────────────────────────────────────
function LogoOrb({ item, index, total, accentColor, isHovered }) {
  const floatDuration = 3.2 + index * 0.9;
  const floatY = total === 1 ? [-5, 0, -5] : [-4, 2, -4];
  const orbSize = total === 1 ? 52 : 46;
  const imgSize = total === 1 ? 30 : 24;

  return (
    <motion.div
      animate={{ y: floatY }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.5,
      }}
      whileHover={{ scale: 1.14 }}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          width: orbSize,
          height: orbSize,
          borderRadius: "50%",
          background: `radial-gradient(circle at 32% 32%,
                        ${alpha(accentColor, 0.28)} 0%,
                        ${alpha(accentColor, 0.07)} 100%
                    )`,
          border: `1.5px solid ${alpha(accentColor, isHovered ? 0.55 : 0.32)}`,
          boxShadow: isHovered
            ? `0 0 20px ${alpha(accentColor, 0.45)}`
            : `0 0 10px ${alpha(accentColor, 0.16)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.35s ease, box-shadow 0.35s ease",
          cursor: "default",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 4,
            borderRadius: "50%",
            border: `1px dashed ${alpha(accentColor, 0.28)}`,
            animation: `orbRing${index % 2 === 0 ? "Cw" : "Ccw"} ${18 + index * 4}s linear infinite`,
            "@keyframes orbRingCw": { to: { transform: "rotate(360deg)" } },
            "@keyframes orbRingCcw": { to: { transform: "rotate(-360deg)" } },
          }}
        />
        <img
          src={item.logo}
          alt={item.name}
          style={{
            width: imgSize,
            height: imgSize,
            objectFit: "contain",
            borderRadius: 3,
            position: "relative",
            zIndex: 1,
          }}
        />
      </Box>
    </motion.div>
  );
}

// ─── Variants ─────────────────────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  }),
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.12 + i * 0.045, type: "spring", stiffness: 300, damping: 24 },
  }),
};

// Mobile slide between categories
const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir * 36 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir * -36 }),
};

// ─── SkillCard (shared by desktop grid + mobile single-card view) ─────────────
function SkillCard({ group, groupIndex, highlighted, fullHeight, staticChips }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: { xs: 2.2, md: 2.6 },
        width: "100%",
        boxSizing: "border-box",
        borderRadius: 3,
        border: `1px solid ${highlighted ? alpha(group.accentColor, 0.42) : alpha(theme.palette.primary.main, 0.18)}`,
        background: alpha(theme.palette.background.paper, 0.72),
        backdropFilter: "blur(8px)",
        boxShadow: highlighted ? `0 8px 28px ${alpha(group.accentColor, 0.13)}` : "none",
        display: "grid",
        alignContent: "start",
        gap: 1.6,
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        height: fullHeight ? "100%" : "auto",
      }}
    >
      {/* Title row */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ fontWeight: 700, color: "text.primary" }}>{group.title}</Typography>
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: group.accentColor,
            animation: "pulseDot 2.4s ease-in-out infinite",
            animationDelay: `${groupIndex * 0.3}s`,
            "@keyframes pulseDot": {
              "0%, 100%": { transform: "scale(1)", opacity: 0.55 },
              "50%": { transform: "scale(1.6)", opacity: 1 },
            },
          }}
        />
      </Box>

      {/* Logo + summary panel */}
      <Box
        sx={{
          p: { xs: 1.6, md: 1.8 },
          borderRadius: 2.5,
          background: alpha(group.accentColor, 0.05),
          border: `1px solid ${alpha(group.accentColor, 0.16)}`,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 1.4, md: 2 },
          alignItems: { xs: "stretch", md: "flex-start" },
        }}
      >
        {/* Logos: a row on mobile (names beside them), a column on desktop */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: group.spotlight.length > 1 ? "column" : "row" },
            gap: { xs: 1.2, md: 1 },
            alignItems: "center",
            flexShrink: 0,
            pt: { xs: 0, md: group.spotlight.length > 1 ? 0.5 : 0 },
          }}
        >
          {group.spotlight.map((item, i) => (
            <LogoOrb
              key={item.name}
              item={item}
              index={i}
              total={group.spotlight.length}
              accentColor={group.accentColor}
              isHovered={highlighted}
            />
          ))}

          {/* mobile-only name, next to the logos */}
          <Typography
            sx={{
              display: { xs: "block", md: "none" },
              ml: 0.5,
              color: "text.primary",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.01em",
              lineHeight: 1.25,
            }}
          >
            {group.spotlight.map((s) => s.name).join(" + ")}
          </Typography>
        </Box>

        <Box>
          {/* desktop-only name, above the summary */}
          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              color: "text.primary",
              fontWeight: 700,
              mb: 0.6,
              letterSpacing: "0.01em",
              fontSize: "0.9rem",
            }}
          >
            {group.spotlight.map((s) => s.name).join(" + ")}
          </Typography>
          <Typography sx={{ color: "text.secondary", lineHeight: 1.65, fontSize: "0.88rem" }}>
            {group.summary}
          </Typography>
        </Box>
      </Box>

      {/* Skill chips */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2 }}>
        {group.skills.map((skill, skillIndex) => {
          const chip = (
            <Chip
              label={skill}
              size="small"
              variant="outlined"
              sx={{
                borderColor: highlighted ? alpha(group.accentColor, 0.5) : theme.palette.primary.border,
                color: "text.secondary",
                background: alpha(group.accentColor, 0.06),
                transition: "border-color 0.3s ease, background 0.3s ease",
                "& .MuiChip-label": {
                  px: { xs: 1, md: 1.2 },
                  fontSize: { xs: "0.68rem", md: "0.75rem" },
                  whiteSpace: "nowrap",
                },
              }}
            />
          );

          if (staticChips) return <Box key={skill}>{chip}</Box>;

          return (
            <motion.div
              key={skill}
              custom={skillIndex}
              variants={chipVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, y: -1 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              {chip}
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
}

// ─── Mobile: tabs + one card at a time ────────────────────────────────────────
const SLIDE_GAP = 12;

function MobileSkillViewer() {
  const theme = useTheme();
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const tabsRef = useRef(null);
  const lockRef = useRef(false); // ignore scroll events while a tab-click scroll is running
  const lockTimer = useRef(0);

  const stride = () => {
    const first = trackRef.current?.children[0];
    return first ? first.offsetWidth + SLIDE_GAP : 0;
  };

  const handleScroll = () => {
    if (lockRef.current) return;
    const s = stride();
    if (!s) return;
    const i = Math.round(trackRef.current.scrollLeft / s);
    setActive(Math.min(skillGroups.length - 1, Math.max(0, i)));
  };

  const goTo = (i) => {
    lockRef.current = true;
    clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => (lockRef.current = false), 600);
    setActive(i);
    trackRef.current?.scrollTo({ left: i * stride(), behavior: "smooth" });
  };

  // keep the active tab centred in the strip (strip scrolls only, the page never moves)
  useEffect(() => {
    const strip = tabsRef.current;
    const tab = strip?.children[active];
    if (!strip || !tab) return;
    strip.scrollTo({ left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  useEffect(() => () => clearTimeout(lockTimer.current), []);

  const group = skillGroups[active];
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <Box>
      {/* Category strip */}
      <Box
        ref={tabsRef}
        role="tablist"
        aria-label="Skill categories"
        sx={{
          position: "relative",
          display: "flex",
          gap: 1,
          overflowX: "auto",
          pb: 1.2,
          mb: 1.2,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {skillGroups.map((g, i) => {
          const isActive = i === active;
          return (
            <Box
              key={g.title}
              component="button"
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => goTo(i)}
              sx={{
                flexShrink: 0,
                cursor: "pointer",
                px: 1.6,
                py: 0.8,
                borderRadius: 999,
                font: "inherit",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                color: isActive ? "text.primary" : "text.secondary",
                border: `1px solid ${isActive ? alpha(g.accentColor, 0.7) : alpha(theme.palette.primary.main, 0.2)}`,
                background: isActive ? alpha(g.accentColor, 0.16) : alpha(theme.palette.background.paper, 0.4),
                boxShadow: isActive ? `0 0 14px ${alpha(g.accentColor, 0.25)}` : "none",
                transition: "all 0.25s ease",
              }}
            >
              {g.title}
            </Box>
          );
        })}
      </Box>

      {/* Swipe track: every slide is stretched to the tallest card, so nothing ever resizes */}
      <Box
        ref={trackRef}
        onScroll={handleScroll}
        sx={{
          display: "flex",
          alignItems: "stretch",
          gap: `${SLIDE_GAP}px`,
          mx: -3,
          px: 3,
          scrollPaddingLeft: "24px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          overscrollBehaviorX: "contain",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {skillGroups.map((g, i) => (
          <Box
            key={g.title}
            sx={{
              flex: "0 0 86%",
              display: "flex",
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
            }}
          >
            <SkillCard group={g} groupIndex={i} highlighted={i === active} fullHeight staticChips />
          </Box>
        ))}
      </Box>

      {/* Counter + dots */}
      <Box sx={{ mt: 1.8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            color: "text.secondary",
          }}
        >
          {pad(active + 1)} / {pad(skillGroups.length)}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
          {skillGroups.map((g, i) => (
            <Box
              key={g.title}
              component="button"
              type="button"
              aria-label={`Go to ${g.title}`}
              onClick={() => goTo(i)}
              sx={{
                p: 0,
                border: 0,
                cursor: "pointer",
                height: 6,
                width: i === active ? 18 : 6,
                borderRadius: 999,
                background: i === active ? group.accentColor : alpha(theme.palette.text.primary, 0.25),
                transition: "width 0.25s ease, background 0.25s ease",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function TechCredibilityPanel() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box id="tech" component="section" sx={{ px: { xs: 3, md: 8, lg: 16 }, my: { xs: 4, md: 10 } }}>
      <Box sx={{ maxWidth: 1180, mx: "auto", textAlign: "left" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48 }}>
          <Typography variant="overline" sx={{ letterSpacing: "0.09em", color: "text.secondary" }}>
            Tech Credibility
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mt: 0.8,
              mb: 1.4,
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "2.125rem" },
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Core Strengths Across Product Systems
          </Typography>
          <Typography sx={{ mb: 3, color: "text.secondary", maxWidth: 860, fontSize: { xs: "0.88rem", md: "1rem" } }}>
            Production-focused capability coverage across frontend engineering, backend services, real-time
            workflows, distributed processing, database systems, AI-assisted features, and release tooling.
          </Typography>
        </motion.div>

        {isMobile ? (
          <MobileSkillViewer />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
            {skillGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                custom={groupIndex}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                onHoverStart={() => setHoveredCard(group.title)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
                style={{ height: "100%" }}
              >
                <SkillCard
                  group={group}
                  groupIndex={groupIndex}
                  highlighted={hoveredCard === group.title}
                  fullHeight
                />
              </motion.div>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}