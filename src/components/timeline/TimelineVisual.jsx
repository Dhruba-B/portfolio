import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

export default function TimelineVisual({
  Icon,
  index = 0,
  feature = false,
  parallaxX,
  parallaxY,
}) {
  const theme = useTheme();
  const variants = [
    { angle: "135deg", glow: 0.3, ringRotate: 22 },
    { angle: "215deg", glow: 0.24, ringRotate: -16 },
    { angle: "300deg", glow: 0.28, ringRotate: 30 },
    { angle: "80deg", glow: 0.26, ringRotate: -24 },
  ];
  const current = variants[index % variants.length];

  return (
    <motion.div
      style={{
        x: parallaxX,
        y: parallaxY,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: 210, sm: 250, md: 340 },
          height: { xs: 210, sm: 250, md: 340 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* AMBIENT GLOW */}
        <Box
          sx={{
            position: "absolute",
            width: "92%",
            height: "92%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, current.glow)}, transparent 72%)`,
            filter: "blur(28px)",
          }}
        />

        {/* GLASS PANEL */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", width: "108%", height: "78%" }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: 7,
              border: `1px solid ${alpha(theme.palette.primary.border, 0.9)}`,
              background: `linear-gradient(${current.angle}, ${alpha(theme.palette.primary.main, 0.16)}, ${alpha(theme.palette.background.paper, 0.9)})`,
              backdropFilter: "blur(10px)",
              boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
            }}
          />
        </motion.div>

        {/* OUTER RING */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: "86%",
            height: "86%",
            borderRadius: "50%",
            border: `1px dashed ${alpha(theme.palette.primary.main, 0.45)}`,
          }}
        />

        {/* INNER TECH RING */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: "64%",
            height: "64%",
            borderRadius: "50%",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        />

        {/* ORBIT NODES */}
        <Box
          sx={{
            position: "absolute",
            width: "86%",
            height: "86%",
            borderRadius: "50%",
            transform: `rotate(${current.ringRotate}deg)`,
          }}
        >
          {[0, 1, 2, 3].map((node) => (
            <Box
              key={node}
              sx={{
                position: "absolute",
                top:
                  node === 0
                    ? "2%"
                    : node === 1
                      ? "78%"
                      : node === 2
                        ? "42%"
                        : "18%",
                left:
                  node === 0
                    ? "52%"
                    : node === 1
                      ? "16%"
                      : node === 2
                        ? "92%"
                        : "74%",
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: alpha(theme.palette.primary.main, 0.92),
                boxShadow: `0 0 14px ${alpha(theme.palette.primary.main, 0.65)}`,
              }}
            />
          ))}
        </Box>

        {feature && (
          <>
            {[0, 1].map((star) => (
              <motion.div
                key={star}
                animate={{ opacity: [0.35, 1, 0.35, 1], scale: [0.95, 1.2, 0.95] }}
                transition={{
                  duration: 2.4 + star * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  top: star === 0 ? "12%" : star === 1 ? "80%" : "28%",
                  left: star === 0 ? "78%" : star === 1 ? "74%" : "16%",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: alpha(theme.palette.accent.main, 0.9),
                  boxShadow: `0 0 14px ${alpha(theme.palette.accent.main, 0.7)}`,
                }}
              />
            ))}
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, 3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "14%",
                left: "18%",
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 30% 30%, ${alpha(theme.palette.accent.main, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.6)} 52%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                  boxShadow: `0 0 20px ${alpha(theme.palette.accent.main, 0.45)}`,
                }}
              />
            </motion.div>
          </>
        )}

        {/* CORE NODE */}
        <motion.div
          animate={{ scale: [1, 1.04, 1], y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Box
            sx={{
              width: { xs: 78, sm: 86, md: 96 },
              height: { xs: 78, sm: 86, md: 96 },
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(155deg, ${alpha(theme.palette.primary.main, 0.28)}, ${alpha(theme.palette.background.paper, 0.94)})`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.55)}`,
              boxShadow: `0 14px 38px ${alpha(theme.palette.primary.main, 0.33)}`,
            }}
          >
            <Icon sx={{ fontSize: { xs: 32, sm: 38, md: 42 }, color: "primary.main" }} />
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
}