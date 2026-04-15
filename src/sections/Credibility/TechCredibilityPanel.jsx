import { Box, Chip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React.js", "React Native", "Material UI (MUI)", "JavaScript ES6+", "Responsive UI"],
  },
  {
    title: "Backend",
    skills: ["Spring Boot", "REST APIs", "JPQL", "Native SQL", "Multi-tenant Architecture"],
  },
  {
    title: "Database",
    skills: ["MySQL", "Schema Design", "Query Optimisation"],
  },
  {
    title: "AI & LLMs",
    skills: ["LLM API Integration", "Natural Language to SQL", "Prompt Engineering"],
  },
  {
    title: "Tooling",
    skills: ["Git", "Postman", "Selenium (Python)", "Ngrok", "White-label Deployment"],
  },
];

export default function TechCredibilityPanel() {
  const theme = useTheme();

  return (
    <Box sx={{ px: { xs: 3, md: 8, lg: 16 }, mb: { xs: 8, md: 10 } }}>
      <Box sx={{ maxWidth: 1180, mx: "auto", textAlign: "left" }}>
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
          Practical, production-focused stack coverage across frontend, backend, database, AI integration, and release tooling.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          {skillGroups.map((group) => (
            <Box
              key={group.title}
              sx={{
                p: 2.2,
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
                background: alpha(theme.palette.background.paper, 0.72),
                backdropFilter: "blur(6px)",
              }}
            >
              <Typography sx={{ fontWeight: 700, color: "text.primary", mb: 1.2 }}>
                {group.title}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.9 }}>
                {group.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: theme.palette.primary.border,
                      color: "text.secondary",
                      background: alpha(theme.palette.primary.main, 0.06),
                      "& .MuiChip-label": {
                        px: { xs: 1, md: 1.2 },
                        fontSize: { xs: "0.68rem", md: "0.75rem" },
                        whiteSpace: "nowrap",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
