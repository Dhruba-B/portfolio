import { Box, Chip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import jsLogo from "../../assets/icons/js.svg";
import ngrokLogo from "../../assets/icons/ngrok.png";
import javaLogo from "../../assets/icons/java.svg";
import springLogo from "../../assets/icons/spring.svg";
import mysqlLogo from "../../assets/icons/mysql.svg";
import gitLogo from "../../assets/icons/git.png";

const skillGroups = [
  {
    title: "Frontend",
    spotlight: [{ name: "React + React Native", logo: reactLogo }],
    summary:
      "Build scalable, component-driven interfaces with responsive architecture, reusable UI patterns, and performance-focused rendering across web and mobile.",
    skills: ["Material UI (MUI)", "JavaScript ES6+", "Responsive UI", "State Management", "Design Systems"],
    accentColor: "#61DAFB",
  },
  {
    title: "Backend",
    spotlight: [
      { name: "Spring Boot", logo: springLogo },
      { name: "Java", logo: javaLogo },
    ],
    summary:
      "Design secure, production-grade backend services with REST API contracts, modular service boundaries, and multi-tenant controls for configurable delivery.",
    skills: ["REST APIs", "JPQL", "Native SQL", "Multi-tenant Architecture", "DTO-first APIs"],
    accentColor: "#6DB33F",
  },
  {
    title: "Database",
    spotlight: [{ name: "MySQL", logo: mysqlLogo }],
    summary:
      "Implemented schema design and query optimization strategies for reliable transactional workflows, high-read reporting, and maintainable relational models.",
    skills: ["Schema Design", "Query Optimisation", "Indexing Strategy", "Data Modeling"],
    accentColor: "#61DAFB",
  },
  {
    title: "AI & LLMs",
    spotlight: [
      { name: "JavaScript", logo: jsLogo },
      { name: "Spring Boot", logo: springLogo },
    ],
    summary:
      "Integrated LLM APIs into user workflows to convert natural-language prompts into validated outputs with safety checks, schema guards, and operational reliability.",
    skills: ["LLM API Integration", "Natural Language to SQL", "Prompt Engineering", "Validation Pipelines"],
    accentColor: "#A78BFA",
  },
  {
    title: "Tooling",
    spotlight: [
      { name: "Git", logo: gitLogo },
      { name: "Ngrok", logo: ngrokLogo },
    ],
    summary:
      "Executed disciplined delivery workflows with version control, API validation, integration testing support, and repeatable release readiness for client environments.",
    skills: ["Selenium (Python)", "Ngrok", "White-label Deployment", "Release Workflow", "Code Review Standards"],
    accentColor: "#F97316",
  },
];

// ─── LogoOrb ──────────────────────────────────────────────────────────────────
// Clean float per orb — no tilt, no per-frame position tracking.
// Each orb uses a fixed float amplitude and duration derived from its index.
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
      // Spring only for the scale micro-interaction, nothing else
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
        {/* Single slow-rotating dashed ring — CSS via sx, no framer */}
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

// ─── Card ─────────────────────────────────────────────────────────────────────
// Hover: simple y lift + border glow. No tilt, no 3D transform, no mouse tracking.
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
    transition: { delay: 0.28 + i * 0.045, type: "spring", stiffness: 300, damping: 24 },
  }),
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function TechCredibilityPanel() {
  const theme = useTheme();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box sx={{ px: { xs: 3, md: 8, lg: 16 }, mb: { xs: 8, md: 10 } }}>
      <Box sx={{ maxWidth: 1180, mx: "auto", textAlign: "left" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48 }}
        >
          <Typography variant="overline" sx={{ letterSpacing: "0.09em", color: "text.secondary" }}>
            Tech Credibility
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mt: 0.8, mb: 1.4, fontWeight: 700,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Core Strengths Across Product Delivery
          </Typography>
          <Typography sx={{ mb: 3, color: "text.secondary", maxWidth: 860 }}>
            Production-focused capability coverage across frontend engineering, backend services, database
            systems, AI-assisted features, and release tooling.
          </Typography>
        </motion.div>

        {/* Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
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
              // Only lift on hover — no tilt, no 3D, no mouse tracking
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
              style={{ height: "100%" }}
            >
              <Box
                sx={{
                  p: { xs: 2.2, md: 2.6 },
                  borderRadius: 3,
                  border: `1px solid ${hoveredCard === group.title
                      ? alpha(group.accentColor, 0.42)
                      : alpha(theme.palette.primary.main, 0.18)
                    }`,
                  background: alpha(theme.palette.background.paper, 0.72),
                  backdropFilter: "blur(8px)",
                  boxShadow: hoveredCard === group.title
                    ? `0 8px 28px ${alpha(group.accentColor, 0.13)}`
                    : "none",
                  display: "grid",
                  gap: 1.6,
                  transition: "border-color 0.35s ease, box-shadow 0.35s ease",
                  height: "100%",
                }}
              >
                {/* Title row */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography sx={{ fontWeight: 700, color: "text.primary" }}>
                    {group.title}
                  </Typography>
                  {/* Pulse dot — CSS animation, no framer */}
                  <Box
                    sx={{
                      width: 7, height: 7,
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
                    gap: 2,
                    alignItems: "flex-start",
                  }}
                >
                  {/* Logos */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: group.spotlight.length > 1 ? "column" : "row",
                      gap: 1,
                      alignItems: "center",
                      flexShrink: 0,
                      pt: group.spotlight.length > 1 ? 0.5 : 0,
                    }}
                  >
                    {group.spotlight.map((item, i) => (
                      <LogoOrb
                        key={item.name}
                        item={item}
                        index={i}
                        total={group.spotlight.length}
                        accentColor={group.accentColor}
                        isHovered={hoveredCard === group.title}
                      />
                    ))}
                  </Box>

                  {/* Text */}
                  <Box>
                    <Typography
                      sx={{
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
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.9 }}>
                  {group.skills.map((skill, skillIndex) => (
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
                      <Chip
                        label={skill}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: hoveredCard === group.title
                            ? alpha(group.accentColor, 0.5)
                            : theme.palette.primary.border,
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
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
}