import { Box, Button, Chip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import resumeFile from "../../assets/resume-placeholder.pdf";

export default function RoleCtaStrip() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: { xs: 3, md: 8, lg: 16 },
        mt: { xs: -2, md: -4 },
        mb: { xs: 4, md: 6 },
        position: "relative",
        zIndex: 7,
      }}
    >
      <Box
        sx={{
          maxWidth: 1180,
          mx: "auto",
          p: { xs: 2.2, md: 2.6 },
          borderRadius: 4,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          background: `linear-gradient(100deg, ${alpha(theme.palette.background.paper, 0.78)}, ${alpha(theme.palette.primary.main, 0.1)})`,
          backdropFilter: "blur(8px)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          boxShadow: `0 10px 40px ${alpha(theme.palette.primary.main, 0.12)}`,
        }}
      >
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: "0.08em" }}>
            Open To Opportunities
          </Typography>
          <Typography sx={{ color: "text.primary", fontWeight: 600 }}>
            Full Stack Developer roles with full-cycle ownership from UI to APIs, database workflows, and release pipelines.
          </Typography>
          <Box sx={{ mt: 1.2, display: "flex", gap: 0.8, flexWrap: "wrap" }}>
            {["3+ Years Experience", "5+ Projects Delivered", "Frontend to Backend Ownership"].map((item) => (
              <Chip
                key={item}
                size="small"
                label={item}
                variant="outlined"
                sx={{
                  borderColor: alpha(theme.palette.primary.main, 0.28),
                  background: alpha(theme.palette.primary.main, 0.06),
                  color: "text.secondary",
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2 }}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            href={resumeFile}
            download
          >
            Download Resume
          </Button>
          <Button
            variant="outlined"
            startIcon={<MailOutlineIcon />}
            href="mailto:dhrubashis.basak@gmail.com"
          >
            Email Me
          </Button>
          <Button
            variant="outlined"
            startIcon={<CalendarMonthIcon />}
            href="#"
          >
            Schedule Call
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
