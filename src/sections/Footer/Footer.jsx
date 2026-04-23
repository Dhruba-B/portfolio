import { Box, Link, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import resumeFile from "../../assets/dhrubashis_cv.pdf";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const credentials = [
  { label: "Email", value: "dhrubashis.basak@gmail.com", href: "dhrubashis.basak@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/dhrubashis-basak", href: "linkedin.com/in/dhrubashis-basak" },
  { label: "Contact", value: "+91 9903859325", href: "tel:+919903859325" },
  { label: "Resume", value: "Download CV (PDF)", href: resumeFile },
];

const iconMap = {
  Email: EmailOutlinedIcon,
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Resume: BadgeOutlinedIcon,
  Contact: LocalPhoneIcon
};

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        overflow: "hidden",
        px: { xs: 3, md: 8, lg: 16 },
        py: { xs: 8, md: 10 },
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
        background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.6)}, ${alpha(theme.palette.primary.main, 0.06)})`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.24)} 0%, transparent 70%)`,
          filter: "blur(26px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 36,
          left: "8%",
          width: 26,
          height: 26,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 30%, rgba(192,132,252,0.95) 0%, rgba(124,58,237,0.45) 62%, rgba(124,58,237,0.12) 100%)",
          boxShadow: "0 0 20px rgba(192,132,252,0.35)",
          pointerEvents: "none",
        }}
      />

      {[0, 1, 2].map((star) => (
        <motion.div
          key={star}
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.2, 0.85] }}
          transition={{ duration: 2.2 + star, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: star === 0 ? 26 : star === 1 ? 74 : 42,
            right: star === 0 ? "16%" : star === 1 ? "34%" : "48%",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "rgba(224,231,255,0.95)",
            boxShadow: "0 0 10px rgba(224,231,255,0.8)",
            pointerEvents: "none",
          }}
        />
      ))}

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1200, mx: "auto" }}>
        <Typography
          variant="overline"
          sx={{ letterSpacing: "0.1em", color: "text.secondary" }}
        >
          Let&apos;s Connect
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mt: 1,
            mb: 1.5,
            fontWeight: 700,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Credentials & Contact
        </Typography>
        <Typography sx={{ mb: 4, color: "text.secondary" }}>
          Driven by clean design and efficient code. Always exploring new ideas and opportunities to grow.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          {credentials.map((item) => {
            const Icon = iconMap[item.label];
            return (
              <Box
                key={item.label}
                sx={{
                  display: "flex",
                  // alignItems: "center",
                  gap: 1.5,
                  p: 2,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
                  background: alpha(theme.palette.background.paper, 0.72),
                  backdropFilter: "blur(6px)",
                }}
              >
                <Icon sx={{ color: "primary.main", fontSize: 20 }} />
                <Box sx={{ textAlign: "left", minWidth: 0 }}>
                  <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                    {item.label}
                  </Typography>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    color="inherit"
                    sx={{
                      fontSize: "0.95rem",
                      color: "text.primary",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.value}
                  </Link>
                </Box>
              </Box>
            );
          })}
        </Box>

        <Typography sx={{ mt: 4, color: "text.secondary", fontSize: "0.85rem" }}>
          Dhrubashis Basak . Crafted with React, MUI, and a little cosmic flair.
        </Typography>
      </Box>
    </Box>
  );
}
