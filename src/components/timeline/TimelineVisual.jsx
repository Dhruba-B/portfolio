import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

export default function TimelineVisual({ Icon }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        height: 420,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* OUTER SOFT GLOW */}
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(
            theme.palette.primary.main,
            0.12
          )}, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* SYSTEM FRAME */}
      <Box
        sx={{
          position: "absolute",
          width: 240,
          height: 240,
        //   borderRadius: 4,
        //   border: `1px solid ${theme.palette.primary.border}`,
          backdropFilter: "blur(10px)",
          background: alpha(theme.palette.background.paper),
        }}
      />

      {/* ROTATING RING */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          border: `1px dashed ${theme.palette.primary.border}`,
          opacity: 0.6,
        }}
      />

      {/* CORE NODE */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Box
          sx={{
            width: 84,
            height: 84,
            borderRadius: "50%",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            background: alpha(theme.palette.primary.main, 0.15),
            border: `1px solid ${theme.palette.primary.border}`,

            boxShadow: `0 0 30px ${theme.palette.primary.glow}`,
          }}
        >
          <Icon sx={{ fontSize: 40, color: "primary.main" }} />
        </Box>
      </motion.div>
    </Box>
  );
}