import { Box, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export default function RecruiterSnapshot() {
  const theme = useTheme();

  return (
    <Box
      id="snapshot"
      component="section"
      sx={{ px: { xs: 3, md: 8, lg: 16 }, mb: { xs: 6, md: 8 }, mt: 4 }}
    >
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
          Full Stack Engineer focused on scalable product systems across React, React Native, Spring Boot, Node.js,
          real-time collaboration, distributed queues, relational databases, and LLM-assisted workflows.
        </Typography>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.75, mt: 1 }}>
          Snapshot metrics: 3+ years of professional experience, 7+ delivered projects/modules, and ownership across
          frontend implementation, backend services, database design, and version-controlled delivery workflows.
        </Typography>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.75, mt: 1 }}>
          Core keywords: Full Stack Engineer, React.js, React Native, Material UI, JavaScript ES6+, Spring Boot, Node.js,
          Express.js, REST APIs, WebSockets, Redis, PostgreSQL, MySQL, Docker, queue architectures, worker systems,
          schema design, query optimisation, multi-tenant architecture, LLM integration, Selenium, Postman, Git.
        </Typography>
      </Box>
    </Box>
  );
}
