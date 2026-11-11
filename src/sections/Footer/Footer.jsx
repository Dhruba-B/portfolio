import { Box, Button, Link, Typography } from "@mui/material";
import { alpha, keyframes, useTheme } from "@mui/material/styles";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import resumeFile from "../../assets/dhrubashis_cv.pdf";

const EMAIL = "dhrubashis.basak@gmail.com";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dhrubashis-basak", Icon: LinkedInIcon, external: true },
  { label: "GitHub", href: "https://github.com/Dhruba-B", Icon: GitHubIcon, external: true },
  { label: "+91 9903859325", href: "tel:+919903859325", Icon: LocalPhoneIcon, external: false },
];

// Matches the path in Timeline.jsx / TimelineItem.jsx (node column: 40px mobile, 72px from md up).
const SPINE_X = { xs: "20px", md: "36px" };
const EASE = [0.16, 1, 0.3, 1];

const twinkle = keyframes`
    0%, 100% { opacity: 0.18; transform: scale(1); }
    50% { opacity: 0.75; transform: scale(1.25); }
`;

// ─── Tiny star burst, fired when the email is copied ─────────────────────────
function Burst({ id }) {
  if (!id) return null;
  return (
    <>
      {Array.from({ length: 7 }, (_, i) => {
        const angle = (i / 7) * Math.PI * 2;
        return (
          <motion.span
            key={`${id}-${i}`}
            aria-hidden="true"
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
            animate={{ x: Math.cos(angle) * 40, y: Math.sin(angle) * 40, opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 5,
              height: 5,
              marginLeft: -2.5,
              marginTop: -2.5,
              borderRadius: "50%",
              background: "#e0e7ff",
              boxShadow: "0 0 8px rgba(224,231,255,0.9)",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
}

// ─── The planet where the path ends ──────────────────────────────────────────
function Planet({ landed, reduce }) {
  const theme = useTheme();
  const size = { xs: 40, md: 52 };
  const ring = (front) => ({
    position: "absolute",
    left: "-28%",
    width: "156%",
    top: "32%",
    height: "36%",
    borderRadius: "50%",
    border: `2px solid ${alpha(theme.palette.accent.main, front ? 0.7 : 0.4)}`,
    transform: "rotate(-18deg)",
    pointerEvents: "none",
    zIndex: front ? 3 : 0,
    ...(front ? { clipPath: "inset(50% 0 0 0)" } : {}),
  });

  return (
    <Box sx={{ position: "relative", width: size, height: size }}>
      {/* one ripple when the comet lands */}
      <AnimatePresence>
        {landed && !reduce && (
          <motion.div
            key="ripple"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `1px solid ${theme.palette.accent.main}`,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={reduce ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <Box aria-hidden="true" sx={ring(false)} />
        <Box
          aria-hidden="true"
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: `radial-gradient(circle at 32% 28%, ${alpha("#fff", 0.9)} 0%, ${theme.palette.accent.main} 26%, ${theme.palette.primary.main} 68%, ${alpha(theme.palette.primary.main, 0.55)} 100%)`,
            boxShadow: landed
              ? `0 0 30px ${alpha(theme.palette.primary.main, 0.65)}`
              : `0 0 10px ${alpha(theme.palette.primary.main, 0.25)}`,
            transition: "box-shadow 0.8s ease",
          }}
        />
        <Box aria-hidden="true" sx={ring(true)} />

        {/* moon */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: -14, zIndex: 4, pointerEvents: "none" }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: 7,
                height: 7,
                ml: "-3.5px",
                borderRadius: "50%",
                background: "#e0e7ff",
                boxShadow: "0 0 8px rgba(224,231,255,0.9)",
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </Box>
  );
}

export default function Footer() {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const gridRef = useRef(null);
  const copyTimer = useRef(null);
  const launchTimer = useRef(null);
  const [landed, setLanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [burstId, setBurstId] = useState(0);
  const [launching, setLaunching] = useState(false);

  // The path continues from the timeline and ends on the planet.
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start 0.85", "end 1"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  const headTop = useTransform(progress, (v) => `${v * 100}%`);
  useMotionValueEvent(progress, "change", (v) => setLanded(v > 0.96));

  const stars = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: (i * 41) % 100,
        y: (i * 59) % 100,
        size: 1.5 + ((i * 13) % 14) / 10,
        delay: (i % 10) * 0.5,
        duration: 3.5 + (i % 6) * 0.8,
        warm: i % 5 === 0,
      })),
    []
  );

  useEffect(
    () => () => {
      clearTimeout(copyTimer.current);
      clearTimeout(launchTimer.current);
    },
    []
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      /* clipboard unavailable: still show feedback, the address is on the page */
    }
    setCopied(true);
    setBurstId((n) => n + 1);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2200);
  };

  const handleBackToTop = () => {
    setLaunching(true);
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    clearTimeout(launchTimer.current);
    launchTimer.current = setTimeout(() => setLaunching(false), 900);
  };

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 6 },
      }}
    >
      {/* starfield */}
      <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {stars.map((s) => (
          <Box
            key={s.id}
            sx={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: s.warm ? theme.palette.accent.main : "#e0e7ff",
              animation: `${twinkle} ${s.duration}s ease-in-out ${s.delay}s infinite`,
              "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 0.4 },
            }}
          />
        ))}
      </Box>

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1080, mx: "auto", px: { xs: 2.5, md: 6 } }}>
        <Box
          ref={gridRef}
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: { xs: "40px minmax(0, 1fr)", md: "72px minmax(0, 1fr)" },
            gridTemplateRows: "auto 64px",
            columnGap: { xs: 2, md: 4 },
          }}
        >
          {/* path arriving at the planet */}
          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              top: -48,
              bottom: "32px",
              left: SPINE_X,
              width: 2,
              transform: "translateX(-50%)",
              pointerEvents: "none",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 12%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, #000 12%)",
            }}
          >
            <Box sx={{ position: "absolute", inset: 0, background: alpha(theme.palette.primary.main, 0.16) }} />
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                scaleY: progress,
                transformOrigin: "top",
                background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
                boxShadow: `0 0 12px ${alpha(theme.palette.accent.main, 0.5)}`,
              }}
            />
            <motion.div
              style={{
                position: "absolute",
                left: "50%",
                top: headTop,
                width: 10,
                height: 10,
                marginLeft: -5,
                marginTop: -5,
                borderRadius: "50%",
                background: "#fff",
                boxShadow: `0 0 10px 3px ${alpha(theme.palette.accent.main, 0.75)}, 0 0 28px 8px ${alpha(theme.palette.primary.main, 0.35)}`,
              }}
            />
          </Box>

          {/* Row 1: the outro and its calls to action */}
          <Box id="contact" sx={{ gridColumn: 2, gridRow: 1, pb: { xs: 6, md: 8 }, scrollMarginTop: 24 }}>
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "3.2rem" },
                  fontWeight: 600,
                  lineHeight: 1.15,
                  color: "text.primary",
                  maxWidth: "15em",
                  mb: 5
                }}
              >
                Got an idea? Let&apos;s make it real.
              </Typography>
              <Typography sx={{ mt: 2, color: "text.secondary", lineHeight: 1.7, fontSize: { xs: "0.98rem", md: "1.08rem" }, textAlign: "center" }}>
                I build full-stack products across web and mobile. If you&apos;re working on something interesting, or hiring, I&apos;d love to hear about it.
              </Typography>

              <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
                <motion.div whileHover={reduce ? undefined : { y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<EmailOutlinedIcon />}
                    href={`mailto:${EMAIL}`}
                    sx={{ textTransform: "none", boxShadow: "none", px: 3 }}
                  >
                    Say hello
                  </Button>
                </motion.div>

                <motion.div whileHover={reduce ? undefined : { y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<DownloadRoundedIcon />}
                    href={resumeFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: "none",
                      px: 3,
                      color: "text.primary",
                      borderColor: alpha(theme.palette.primary.main, 0.4),
                      "&:hover": { borderColor: theme.palette.primary.main, background: alpha(theme.palette.primary.main, 0.08) },
                    }}
                  >
                    Download CV
                  </Button>
                </motion.div>

                <Box sx={{ position: "relative" }}>
                  <Button
                    onClick={handleCopy}
                    startIcon={copied ? <CheckRoundedIcon /> : <ContentCopyRoundedIcon />}
                    aria-live="polite"
                    sx={{
                      textTransform: "none",
                      color: copied ? theme.palette.accent.main : "text.secondary",
                      transition: "color 0.25s ease",
                    }}
                  >
                    {copied ? "Copied" : "Copy email"}
                  </Button>
                  <Burst id={reduce ? 0 : burstId} />
                </Box>
              </Box>

              <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", columnGap: 3, rowGap: 1.25 }}>
                {links.map(({ label, href, Icon, external }) => (
                  <Link
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    underline="hover"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.9,
                      color: "text.secondary",
                      fontSize: "0.92rem",
                      transition: "color 0.2s ease",
                      "&:hover": { color: "text.primary" },
                      "&:hover svg": { color: theme.palette.accent.main },
                      "& svg": { transition: "color 0.2s ease" },
                    }}
                  >
                    <Icon sx={{ fontSize: 18 }} />
                    {label}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Box>

          {/* Row 2: the planet and the sign-off */}
          <Box sx={{ gridColumn: 1, gridRow: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Planet landed={landed} reduce={reduce} />
          </Box>

          <Box sx={{ gridColumn: 2, gridRow: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
            <Typography
              sx={{
                color: "text.primary",
                fontSize: { xs: "0.75rem", md: ".9rem" },
                opacity: landed ? 1 : 0.35,
                transform: landed || reduce ? "none" : "translateX(-6px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              Thanks for scrolling this far. Hope to see you again <Box component="span" aria-hidden="true" sx={{ color: theme.palette.accent.main }}>✦</Box>
            </Typography>

            <Button
              onClick={handleBackToTop}
              aria-label="Back to top"
              sx={{
                textTransform: "none",
                color: "text.secondary",
                flexShrink: 0,
                minWidth: 0,
                "&:hover": { color: "text.primary", background: alpha(theme.palette.primary.main, 0.08) },
              }}
              startIcon={
                <motion.span
                  animate={launching && !reduce ? { y: [0, -22, 22, 0], opacity: [1, 0, 0, 1] } : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, times: [0, 0.4, 0.41, 1], ease: "easeInOut" }}
                  style={{ display: "inline-flex" }}
                >
                  <RocketLaunchRoundedIcon fontSize="small" />
                </motion.span>
              }
            >
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>Back to top</Box>
            </Button>
          </Box>
        </Box>

        <Typography sx={{ mt: 1, pl: { xs: "56px", md: "108px" }, color: "text.secondary", fontSize: "0.82rem" }}>
          Dhrubashis Basak. Built with React, MUI and a little cosmic flair.
        </Typography>
      </Box>
    </Box>
  );
}