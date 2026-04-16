import { Box, Chip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
      "Builds scalable, component-driven interfaces with responsive architecture, reusable UI patterns, and performance-focused rendering across web and mobile.",
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
      "Designs secure, production-grade backend services with REST API contracts, modular service boundaries, and multi-tenant controls for configurable delivery.",
    skills: ["REST APIs", "JPQL", "Native SQL", "Multi-tenant Architecture", "DTO-first APIs"],
    accentColor: "#6DB33F",
  },
  {
    title: "Database",
    spotlight: [{ name: "MySQL", logo: mysqlLogo }],
    summary:
      "Implements schema design and query optimization strategies for reliable transactional workflows, high-read reporting, and maintainable relational models.",
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
      "Integrates LLM APIs into user workflows to convert natural-language prompts into validated outputs with safety checks, schema guards, and operational reliability.",
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
      "Executes disciplined delivery workflows with version control, API validation, integration testing support, and repeatable release readiness for client environments.",
    skills: ["Selenium (Python)", "Ngrok", "White-label Deployment", "Release Workflow", "Code Review Standards"],
    accentColor: "#F97316",
  },
];

// Floating animation variants for logos
const floatVariants = {
  animate: (i) => ({
    y: [0, -6, 0, 4, 0],
    rotate: [0, i % 2 === 0 ? 4 : -4, 0, i % 2 === 0 ? -2 : 2, 0],
    transition: {
      duration: 3.5 + i * 0.7,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.4,
    },
  }),
};

// Orbit animation for multi-logo groups
const orbitVariants = (index, total, accentColor) => ({
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 10 + index * 3,
      repeat: Infinity,
      ease: "linear",
      delay: index * 1.2,
    },
  },
});

function LogoOrb({ item, index, total, accentColor, isHovered }) {
  const theme = useTheme();

  // For single logo — centered floating orb
  if (total === 1) {
    return (
      <motion.div
        custom={index}
        variants={floatVariants}
        animate="animate"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.18, rotate: 8 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: `radial-gradient(circle at 30% 30%, ${alpha(accentColor, 0.28)} 0%, ${alpha(accentColor, 0.08)} 100%)`,
            border: `1.5px solid ${alpha(accentColor, 0.45)}`,
            boxShadow: isHovered
              ? `0 0 24px ${alpha(accentColor, 0.55)}, 0 0 6px ${alpha(accentColor, 0.3)}`
              : `0 0 12px ${alpha(accentColor, 0.22)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "box-shadow 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Inner shimmer ring */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: 2,
              borderRadius: "50%",
              border: `1px dashed ${alpha(accentColor, 0.3)}`,
            }}
          />
          <img
            src={item.logo}
            alt={item.name}
            style={{
              width: 30,
              height: 30,
              objectFit: "contain",
              borderRadius: 4,
              position: "relative",
              zIndex: 1,
            }}
          />
        </motion.div>
      </motion.div>
    );
  }

  // For multiple logos — side-by-side with staggered float
  return (
    <motion.div
      custom={index}
      variants={floatVariants}
      animate="animate"
      whileHover={{ scale: 1.15, rotate: index % 2 === 0 ? 6 : -6 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      style={{
        width: 45,
        height: 45,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 28%, ${alpha(accentColor, 0.3)} 0%, ${alpha(accentColor, 0.07)} 100%)`,
        border: `1.5px solid ${alpha(accentColor, 0.4)}`,
        boxShadow: isHovered
          ? `0 0 20px ${alpha(accentColor, 0.5)}, 0 0 5px ${alpha(accentColor, 0.25)}`
          : `0 0 10px ${alpha(accentColor, 0.18)}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 24 + index * 2, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 3,
          borderRadius: "50%",
          border: `1px dashed ${alpha(accentColor, 0.25)}`,
        }}
      />
      <img
        src={item.logo}
        alt={item.name}
        style={{
          width: 24,
          height: 24,
          objectFit: "contain",
          borderRadius: 3,
          position: "relative",
          zIndex: 1,
        }}
      />
    </motion.div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.3 + i * 0.05, type: "spring", stiffness: 320, damping: 22 },
  }),
};

export default function TechCredibilityPanel() {
  const theme = useTheme();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Box sx={{ px: { xs: 3, md: 8, lg: 16 }, mb: { xs: 8, md: 10 } }}>
      <Box sx={{ maxWidth: 1180, mx: "auto", textAlign: "left" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="overline" sx={{ letterSpacing: "0.09em", color: "text.secondary" }}>
            Tech Credibility
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mt: 0.8,
              mb: 1.4,
              fontWeight: 700,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Core Strengths Across Product Delivery
          </Typography>
          <Typography sx={{ mb: 3, color: "text.secondary", maxWidth: 860 }}>
            Production-focused capability coverage across frontend engineering, backend services, database systems,
            AI-assisted features, and release tooling.
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          {skillGroups.map((group, groupIndex) => {
            const horizontalDirection = groupIndex % 2 === 0 ? 1 : -1;
            const verticalDirection = groupIndex < 2 ? 1 : -1;
            // Invert sign so the movement direction matches cursor intent.
            const mouseOffsetX = (0.5 - mousePosition.x) * 12 * horizontalDirection;
            const mouseOffsetY = (0.5 - mousePosition.y) * 9 * verticalDirection;
            const mouseRotateY = (0.5 - mousePosition.x) * 8 * horizontalDirection;
            const mouseRotateX = (0.5 - mousePosition.y) * 6;

            return (
            <motion.div
              key={group.title}
              custom={groupIndex}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              onHoverStart={() => setHoveredCard(group.title)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{
                y: -4,
                scale: 1.012,
                boxShadow: `0 12px 30px ${alpha(group.accentColor, 0.18)}`,
              }}
              style={{
                x: mouseOffsetX,
                y: mouseOffsetY,
                rotateY: mouseRotateY,
                rotateX: mouseRotateX,
                transformPerspective: 900,
                transformStyle: "preserve-3d",
              }}
              transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.7 }}
            >
              <Box
                sx={{
                  p: { xs: 2.2, md: 2.6 },
                  borderRadius: 3,
                  border: `1px solid ${hoveredCard === group.title
                      ? alpha(group.accentColor, 0.45)
                      : alpha(theme.palette.primary.main, 0.2)
                    }`,
                  background: alpha(theme.palette.background.paper, 0.72),
                  backdropFilter: "blur(8px)",
                  display: "grid",
                  gap: 1.6,
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  boxShadow:
                    hoveredCard === group.title
                      ? `0 8px 32px ${alpha(group.accentColor, 0.14)}`
                      : "none",
                  height: "100%",
                }}
              >
                {/* Title row */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography sx={{ fontWeight: 700, color: "text.primary" }}>{group.title}</Typography>
                  {/* Tiny pulse dot */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: groupIndex * 0.3 }}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: group.accentColor,
                    }}
                  />
                </Box>

                {/* Logo + summary panel */}
                <Box
                  sx={{
                    p: { xs: 1.6, md: 1.8 },
                    borderRadius: 2.5,
                    background: alpha(group.accentColor, 0.06),
                    border: `1px solid ${alpha(group.accentColor, 0.18)}`,
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                  }}
                >
                  {/* Logos cluster */}
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
                      animate="visible"
                      whileHover={{ scale: 1.08, y: -1 }}
                      transition={{ type: "spring", stiffness: 340, damping: 18 }}
                    >
                      <Chip
                        label={skill}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor:
                            hoveredCard === group.title
                              ? alpha(group.accentColor, 0.55)
                              : theme.palette.primary.border,
                          color: "text.secondary",
                          background: alpha(group.accentColor, 0.07),
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
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}