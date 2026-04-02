import { Box, Typography, Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion, useScroll, useTransform } from "framer-motion";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import MemoryIcon from "@mui/icons-material/Memory";
import Face6 from "@mui/icons-material/Face6";
import { useRef } from "react";

export default function Hero() {
    const theme = useTheme();
    const ref = useRef(null);

    const { scrollY } = useScroll();

    // PARALLAX LAYERS
    const yBg = useTransform(scrollY, [0, 600], [0, 150]);
    const yMid = useTransform(scrollY, [0, 600], [0, 80]);
    const yFront = useTransform(scrollY, [0, 600], [0, 40]);

    return (
        <Box
            ref={ref}
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",

                px: { xs: 3, md: 8, lg: 16 },
                position: "relative",
                overflow: "hidden",
                textAlign: { xs: "center", md: "left" },
            }}
        >
            {/* 🔥 BACKGROUND GLOW */}
            <motion.div style={{ y: yBg }}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "20%",
                        left: "10%",
                        width: 400,
                        height: 400,
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${alpha(
                            theme.palette.primary.main,
                            0.15
                        )}, transparent 70%)`,
                        filter: "blur(40px)",
                    }}
                />
            </motion.div>

            {/* 🔥 COMPUTER SYSTEM BACKGROUND */}
            <motion.div style={{ y: yBg }}>
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0.12,
                    }}
                >
                    {/* MONITOR FRAME */}
                    <Box
                        sx={{
                            width: { xs: 280, md: 600 },
                            height: { xs: 180, md: 360 },
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.primary.border}`,
                            background: theme.palette.background.paper,
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <motion.div
                            animate={{ y: ["0%", "100%"] }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                height: 2,
                                background: theme.palette.primary.main,
                                opacity: 0.2,
                            }}
                        />
                        {/* HEADER BAR */}
                        <Box
                            sx={{
                                height: 32,
                                borderBottom: `1px solid ${theme.palette.primary.border}`,
                                display: "flex",
                                alignItems: "center",
                                px: 2,
                                gap: 1,
                            }}
                        >
                            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main" }} />
                            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "secondary.main" }} />
                            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "text.secondary" }} />
                        </Box>

                        {/* FAKE CODE LINES */}
                        <Box sx={{ p: 2 }}>
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{
                                        duration: 2 + i,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: 8,
                                            mb: 1.5,
                                            borderRadius: 1,
                                            width: `${60 + Math.random() * 30}%`,
                                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </motion.div>

            <motion.div style={{ y: yMid }}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "15%",
                        right: "10%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        opacity: 0.15,
                    }}
                >
                    {[CodeIcon, StorageIcon, MemoryIcon].map((Icon, i) => (
                        <motion.div
                            key={i}
                            animate={{ y: [0, -20, 0] }}
                            transition={{
                                duration: 4 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Icon sx={{ fontSize: 40 }} />
                        </motion.div>
                    ))}
                </Box>
            </motion.div>

            {/* MAIN CONTENT */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "1400px",
                    mx: "auto",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                }}
            >
                {/* 🔷 LEFT TEXT */}
                <Box sx={{ maxWidth: 600 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography
                            variant="overline"
                            sx={{ color: "text.secondary" }}
                        >
                            Full Stack Engineer • System Builder
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 700,
                                lineHeight: 1.2,
                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Building Systems,
                            <br />
                            Not Just Interfaces
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <Typography
                            sx={{
                                mt: 3,
                                color: "text.secondary",
                                lineHeight: 1.8,
                            }}
                        >
                            I design and build scalable healthcare, fintech,
                            and AI-powered systems — from architecture to UI.
                        </Typography>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                            <Button
                                variant="contained"
                                sx={{
                                    px: 4,
                                    py: 1.2,
                                    borderRadius: 3,
                                }}
                            >
                                View Work
                            </Button>

                            <Button
                                variant="outlined"
                                sx={{
                                    px: 4,
                                    py: 1.2,
                                    borderRadius: 3,
                                    borderColor: "primary.border",
                                }}
                            >
                                Contact
                            </Button>
                        </Box>
                    </motion.div>
                </Box>

                {/* 🔷 RIGHT PROFILE */}
                <motion.div style={{ y: yFront }}>
                    <Box
                        sx={{
                            width: 320,
                            height: 320,
                            borderRadius: "50%",
                            position: "relative",

                            display: { xs: "none", md: "flex" },

                            alignItems: "center",
                            justifyContent: "center",

                            background: alpha(theme.palette.primary.main, 0.1),
                            border: `1px solid ${theme.palette.primary.border}`,

                            boxShadow: `0 0 60px ${theme.palette.primary.glow}`,
                        }}
                    >
                        {/* Placeholder for your image */}
                        <Box
                            sx={{
                                width: "85%",
                                height: "85%",
                                borderRadius: "50%",
                                background: theme.palette.background.paper,

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                color: "text.secondary",
                            }}
                        >
                            <Face6 sx={{ fontSize: 120 }} />
                        </Box>
                    </Box>
                </motion.div>
            </Box>
        </Box>
    );
}