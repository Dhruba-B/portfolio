import { Box, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export default function RecruiterSnapshot() {
  const theme = useTheme();

  return (
    <Box sx={{ px: { xs: 3, md: 8, lg: 16 }, mb: { xs: 6, md: 8 } }}>
      <Box
        sx={{
          maxWidth: 1180,
          mx: "auto",
          textAlign: "left",
          p: { xs: 2.2, md: 2.8 },
          borderRadius: 3,
          border: `1px dashed ${alpha(theme.palette.primary.main, 0.32)}`,
          background: alpha(theme.palette.background.paper, 0.6),
        }}
      >
        <Typography sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}>
          Recruiter Snapshot
        </Typography>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.75 }}>
          Full Stack Developer with hands-on product lifecycle delivery across React, React Native, Spring Boot, MySQL,
          multi-tenant architecture, LLM API integration, and Natural Language to SQL systems.
        </Typography>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.75, mt: 1 }}>
          Snapshot metrics: 3+ years of professional experience, 5+ delivered projects/modules, and ownership across
          frontend implementation, backend services, and version-controlled delivery workflows.
        </Typography>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.75, mt: 1 }}>
          Core keywords: Full Stack Developer, React.js, React Native, Material UI, JavaScript ES6+, Spring Boot, REST APIs,
          JPQL, Native SQL, MySQL, schema design, query optimisation, multi-tenant architecture, LLM integration, prompt engineering,
          white-label deployment, Selenium, Postman, Git.
        </Typography>
      </Box>
    </Box>
  );
}
