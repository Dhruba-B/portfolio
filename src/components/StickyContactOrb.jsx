import { useState } from "react";
import { Box, IconButton, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import PublicIcon from "@mui/icons-material/Public";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import resumeFile from "../assets/dhrubashis_cv.pdf";

const options = [
  {
    id: "email",
    label: "Email",
    value: "dhrubashis.basak@gmail.com",
    href: "mailto:dhrubashis.basak@gmail.com",
    Icon: EmailOutlinedIcon,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/dhrubashis-basak",
    href: "https://linkedin.com/in/dhrubashis-basak",
    Icon: LinkedInIcon,
  },
  {
    id: "contact",
    label: "Contact",
    value: "+91 9903859325",
    href: "tel:+919903859325",
    Icon: LocalPhoneIcon,
  },
  {
    id: "resume",
    label: "Resume",
    value: "Download CV (PDF)",
    href: resumeFile,
    download: true,
  },
];

export default function StickyContactOrb() {
  const theme = useTheme();
  const isTouch = useMediaQuery(theme.breakpoints.down("md"));
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      // onMouseEnter={() => !isTouch && setIsOpen(true)}
      // onMouseLeave={() => !isTouch && setIsOpen(false)}
      sx={{
        position: "fixed",
        right: { xs: 14, md: 24 },
        bottom: { xs: 14, md: 22 },
        width: { xs: 264, md: 320 },
        height: { xs: 360, md: 390 },
        zIndex: 1700,
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: 0,
          bottom: 76,
          width: { xs: 250, md: 280 },
          borderRadius: 3,
          p: 1.6,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
          background: `linear-gradient(140deg, ${alpha(theme.palette.background.paper, 0.92)}, ${alpha(theme.palette.primary.main, 0.14)})`,
          backdropFilter: "blur(10px)",
          boxShadow: `0 14px 50px ${alpha(theme.palette.primary.main, 0.25)}`,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(8px) scale(0.98)",
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.22s ease",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 1,
          }}
        >
          {options.map((option) => (
            <Tooltip key={option.id} title={option.label} placement="top">
              <IconButton
                component="a"
                href={option.href}
                download={option.download}
                target={option.download ? undefined : "_blank"}
                rel={option.download ? undefined : "noopener noreferrer"}
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
                  background: alpha(theme.palette.background.paper, 0.66),
                  color: "primary.main",
                  mx: "auto",
                  pointerEvents: "auto",
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.14),
                    transform: "translateY(-1px)",
                  },
                }}
              >
                {option.id === "resume" ? (
                  <Typography
                    sx={{
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      color: "primary.main",
                    }}
                  >
                    CV
                  </Typography>
                ) : (
                  <option.Icon sx={{ fontSize: 20 }} />
                )}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Box>

      {[0, 1, 2].map((star) => (
        <Box
          key={`orbit-star-${star}`}
          sx={{
            position: "absolute",
            right: { xs: 0, md: 0 },
            bottom: { xs: 0, md: 0 },
            width: { xs: 52, md: 78 },
            height: { xs: 52, md: 78 },
            borderRadius: "50%",
            pointerEvents: "none",
            animation: `orb-spin-${star} ${9 + star * 1.4}s linear infinite`,
            "@keyframes orb-spin-0": {
              from: { transform: "rotate(0deg)" },
              to: { transform: "rotate(360deg)" },
            },
            "@keyframes orb-spin-1": {
              from: { transform: "rotate(120deg)" },
              to: { transform: "rotate(480deg)" },
            },
            "@keyframes orb-spin-2": {
              from: { transform: "rotate(240deg)" },
              to: { transform: "rotate(600deg)" },
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: star === 0 ? -8 : star === 1 ? "50%" : "84%",
              left: star === 0 ? "58%" : star === 1 ? "94%" : "10%",
              width: star === 1 ? 5 : 4,
              height: star === 1 ? 5 : 4,
              borderRadius: "50%",
              background: alpha(theme.palette.accent.main, 0.92),
              boxShadow: `0 0 10px ${alpha(theme.palette.accent.main, 0.75)}`,
              opacity: 0.9,
            }}
          />
        </Box>
      ))}

      <IconButton
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open contact options"
        sx={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: { xs: 52, md: 58 },
          height: { xs: 52, md: 58 },
          pointerEvents: "auto",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.45)}`,
          background: `radial-gradient(circle at 32% 28%, ${alpha(theme.palette.accent.main, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.6)} 55%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
          boxShadow: `0 0 22px ${alpha(theme.palette.accent.main, 0.45)}`,
          "&:hover": {
            transform: "scale(1.05)",
            background: `radial-gradient(circle at 32% 28%, ${alpha(theme.palette.accent.main, 1)} 0%, ${alpha(theme.palette.primary.main, 0.68)} 55%, ${alpha(theme.palette.primary.main, 0.25)} 100%)`,
          },
          transition: "all 0.2s ease",
        }}
      >
        <PublicIcon sx={{ color: "common.white", fontSize: { xs: 24, md: 28 } }} />
      </IconButton>
    </Box>
  );
}
