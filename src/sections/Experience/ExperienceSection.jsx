import { Box, Chip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import SchemaTwoToneIcon from "@mui/icons-material/SchemaTwoTone";
import reactLogo from "../../assets/react.svg";
import jsLogo from "../../assets/icons/js.webp";
import javaLogo from "../../assets/icons/java.svg";
import springLogo from "../../assets/icons/spring.png";
import mysqlLogo from "../../assets/icons/sql.png";

const experiences = [
  {
    company: "Stellablue",
    role: "Full Stack Developer",
    period: "Aug 2022 - Present",
    domain: "MEDePAL, MHCP - Healthcare Platforms",
    stack: ["React", "React Native", "Spring Boot", "MySQL", "MUI"],
    highlights: [
      "Built and shipped production features across healthcare web and mobile platforms.",
      "Worked across product flows from responsive UI and API contracts to schema design.",
      "Applied reusable architecture patterns for multi-tenant, configurable delivery.",
    ],
    metric: Math.floor((Date.now() - new Date(2022, 7, 1)) / 31557600000) + "+ yrs",
    Icon: RocketLaunchIcon,
    accent: "#4FE7F2",
  },
  {
    company: "Nomura / Mitsubishi Trust Bank",
    role: "Backend / Batch Systems Contributor",
    period: "Enterprise fintech systems",
    domain: "Multi-tenant financial reconciliation",
    stack: ["Java", "Spring Batch", "Tenant Isolation", "Enterprise Review"],
    highlights: [
      "Contributed to trade and ledger settlement reconciliation batch workflows.",
      "Worked on tenant-isolated processing with client-specific configurations.",
      "Delivered within regulated fintech review and production-readiness pipelines.",
    ],
    metric: "Fintech",
    Icon: AccountBalanceIcon,
    accent: "#356EE9",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] },
  }),
};

const highlightVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.3 + i * 0.08, ease: "easeOut" },
  }),
};

/* Subtle parallax star that drifts on scroll */
function ParallaxStar({ star, scrollY }) {
  const theme = useTheme();
  const y = useTransform(scrollY, [0, 800], [0, star.parallaxFactor * 60]);

  return (
    <motion.div
      key={star.id}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: star.opacity, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: star.delay, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: `${star.x}%`,
        top: `${star.y}%`,
        y,
        width: star.size,
        height: star.size,
        borderRadius: "50%",
        background:
          star.id % 3 === 0
            ? alpha(theme.palette.accent.main, 0.82)
            : alpha("#e0e7ff", 0.62),
        boxShadow:
          star.id % 3 === 0
            ? `0 0 6px ${alpha(theme.palette.accent.main, 0.5)}`
            : "0 0 5px rgba(224,231,255,0.36)",
        pointerEvents: "none",
      }}
    />
  );
}

/* Gently pulsing nebula orb */
function NebulaOrb({ color, size, top, left, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      animate={{
        scale: [1, 1.06, 1],
        opacity: [0.55, 0.72, 0.55],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: "blur(48px)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* Animated underline drawn on scroll-into-view */
function AnimatedAccentLine({ color }) {
  return (
    <Box sx={{ position: "relative", display: "inline-block", mt: 0.5, mb: 1.6 }}>
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: 2,
          width: 64,
          borderRadius: 2,
          background: color,
          transformOrigin: "left center",
        }}
      />
    </Box>
  );
}

function ExperienceCard({ item, index }) {
  const theme = useTheme();
  const Icon = item.Icon;

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
  };

  const getStackIconSrc = (label) => {
    const key = String(label ?? "").trim().toLowerCase();
    return stackIconMap[key] ?? null;
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
      style={{ height: "100%" }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          p: { xs: 2.4, md: 3 },
          borderRadius: 4,
          overflow: "hidden",
          textAlign: "left",
          border: `1px solid ${alpha(item.accent, 0.32)}`,
          background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.86)}, ${alpha(item.accent, 0.08)})`,
          boxShadow: `0 14px 44px ${alpha(item.accent, 0.12)}`,
          backdropFilter: "blur(10px)",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
          "&:hover": {
            boxShadow: `0 20px 56px ${alpha(item.accent, 0.22)}`,
            borderColor: alpha(item.accent, 0.52),
          },
        }}
      >
        {/* Decorative corner orb */}
        <Box
          sx={{
            position: "absolute",
            top: -72,
            right: -70,
            width: 210,
            height: 210,
            borderRadius: "50%",
            border: `1px dashed ${alpha(item.accent, 0.28)}`,
            background: `radial-gradient(circle, ${alpha(item.accent, 0.18)} 0%, transparent 68%)`,
            pointerEvents: "none",
          }}
        />

        {/* Subtle inner shimmer line at card top */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.1 + index * 0.14, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1.5,
            background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
            opacity: 0.6,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 2,
              mb: 2,
            }}
          >
            {/* Icon with subtle pulse ring */}
            <Box sx={{ position: "relative" }}>
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.8 }}
                style={{
                  position: "absolute",
                  inset: -6,
                  borderRadius: 14,
                  border: `1.5px solid ${item.accent}`,
                  pointerEvents: "none",
                }}
              />
              <Box
                sx={{
                  width: 54,
                  height: 54,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: alpha(item.accent, 0.12),
                  border: `1px solid ${alpha(item.accent, 0.36)}`,
                  boxShadow: `0 0 24px ${alpha(item.accent, 0.2)}`,
                  flexShrink: 0,
                }}
              >
                <Icon sx={{ color: item.accent, fontSize: 28 }} />
              </Box>
            </Box>

            <Box
              sx={{
                px: 1.2,
                py: 0.7,
                borderRadius: 999,
                border: `1px solid ${alpha(item.accent, 0.28)}`,
                background: alpha(theme.palette.background.paper, 0.58),
                color: "text.primary",
                fontSize: "0.74rem",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              {item.metric}
            </Box>
          </Box>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.74rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              mb: 0.7,
            }}
          >
            {item.period}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 750,
              lineHeight: 1.25,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {item.role}
          </Typography>
          <Typography sx={{ mt: 0.7, color: "text.primary", fontWeight: 700 }}>
            {item.company}
          </Typography>
          <Typography sx={{ mt: 0.6, mb: 2, color: "text.secondary", lineHeight: 1.65 }}>
            {item.domain}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.9, mb: 2.2 }}>
            {item.stack.map((skill) => (
              <Chip
                key={skill}
                size="small"
                label={skill}
                variant="outlined"
                icon={
                  getStackIconSrc(skill) ? (
                    <Box
                      component="img"
                      src={getStackIconSrc(skill)}
                      alt=""
                      aria-hidden="true"
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "6px",
                        filter: `drop-shadow(0 0 10px ${alpha(theme.palette.primary.main, 0.25)})`,
                      }}
                    />
                  ) : undefined
                }
                sx={{
                  borderColor: theme.palette.primary.border,
                  color: "text.secondary",
                  background: alpha(theme.palette.primary.main, 0.08),
                  "& .MuiChip-icon": { ml: "8px", mr: "-4px" },
                  "& .MuiChip-label": {
                    px: 1,
                    fontSize: { xs: "0.68rem", md: "0.75rem" },
                  },
                }}
              />
            ))}
          </Box>

          {/* Staggered highlight points */}
          <Box sx={{ display: "grid", gap: 1.25 }}>
            {item.highlights.map((point, i) => (
              <motion.div
                key={point}
                custom={i}
                variants={highlightVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                <Typography
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    fontSize: { xs: "0.9rem", md: "0.95rem" },
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      mt: "0.58rem",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: item.accent,
                      boxShadow: `0 0 10px ${alpha(item.accent, 0.55)}`,
                      flexShrink: 0,
                    }}
                  />
                  {point}
                </Typography>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const theme = useTheme();
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  const stars = getExperienceStars();

  return (
    <Box
      ref={sectionRef}
      id="experience"
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        px: { xs: 3, md: 8, lg: 16 },
        py: { xs: 7, md: 9 },
      }}
    >
      {/* Ambient nebula orbs — subtle, non-distracting */}
      <NebulaOrb
        color={alpha(theme.palette.primary.main, 0.18)}
        size={340}
        top="-60px"
        left="-80px"
        delay={0}
      />
      <NebulaOrb
        color={alpha(theme.palette.accent.main, 0.13)}
        size={280}
        top="30%"
        left="72%"
        delay={2}
      />

      {/* Parallax stars */}
      {stars.map((star) => (
        <ParallaxStar key={star.id} star={star} scrollY={scrollY} />
      ))}

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1360,
          mx: "auto",
          p: { xs: 2.5, md: 6 },
          borderRadius: "28px",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
          background: `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.84)}, ${alpha(theme.palette.background.default, 0.72)})`,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: `0 20px 60px ${alpha(theme.palette.background.default, 0.6)}, inset 0 0 0 1px ${alpha(theme.palette.accent.main, 0.08)}`,
        }}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Typography
            variant="overline"
            sx={{ letterSpacing: "0.09em", color: "text.secondary" }}
          >
            Experience
          </Typography>

          <Typography
            variant="h4"
            sx={{
              mt: 0.8,
              mb: 0.5,
              fontWeight: 700,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Engineering Roles & Production Context
          </Typography>

          {/* Animated accent underline */}
          <AnimatedAccentLine
            color={`linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`}
          />

          <Typography
            sx={{ color: "text.secondary", maxWidth: 820, lineHeight: 1.7, mb: 3.4, textAlign: "center", width: "100%", mx: "auto" }}
          >
            Professional experience across healthcare platforms and regulated financial systems,
            with ownership from product UI through backend services, schema design, and
            production delivery workflows.
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          {experiences.map((item, index) => (
            <ExperienceCard key={item.company} item={item} index={index} />
          ))}
        </Box>

        {/* Footer callout — fade + slide up */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.52, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Box
            sx={{
              mt: 2,
              p: { xs: 1.8, md: 2.2 },
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
              background: alpha(theme.palette.background.paper, 0.45),
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "auto 1fr auto" },
              alignItems: "center",
              gap: { xs: 1.3, md: 2 },
            }}
          >
            <WorkHistoryOutlinedIcon sx={{ color: "primary.main", fontSize: 24 }} />
            <Typography sx={{ color: "text.secondary", lineHeight: 1.6, textAlign: { xs: "center", md: "left" } }}>
              Experience anchors the project work below: production platforms, enterprise
              constraints, and systems thinking shaped into reusable full-stack delivery patterns.
            </Typography>
            <SchemaTwoToneIcon
              sx={{
                color: "accent.main",
                fontSize: 24,
                justifySelf: { xs: "start", md: "end" },
              }}
            />
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}

function getExperienceStars() {
  return [
    { id: 0, x: 7, y: 18, size: 4, opacity: 0.7, delay: 0.05, parallaxFactor: -0.06 },
    { id: 1, x: 18, y: 72, size: 2, opacity: 0.46, delay: 0.12, parallaxFactor: 0.09 },
    { id: 2, x: 38, y: 10, size: 2.5, opacity: 0.52, delay: 0.2, parallaxFactor: -0.04 },
    { id: 3, x: 64, y: 18, size: 3.5, opacity: 0.64, delay: 0.28, parallaxFactor: 0.07 },
    { id: 4, x: 88, y: 64, size: 2.2, opacity: 0.42, delay: 0.36, parallaxFactor: -0.08 },
    { id: 5, x: 78, y: 84, size: 2, opacity: 0.48, delay: 0.44, parallaxFactor: 0.05 },
  ];
}