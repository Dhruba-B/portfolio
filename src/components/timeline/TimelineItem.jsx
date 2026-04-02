import { Box, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import TimelineVisual from "./TimelineVisual";

export default function TimelineItem({ item, index }) {
    const theme = useTheme();
    const isLeft = index % 2 === 0;
    const Icon = item.icon;

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",

                px: { xs: 3, md: 8, lg: 16 },
                py: { xs: 6, md: 10 },

                position: "relative",
            }}
        >
            {/* BACKGROUND */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at ${isLeft ? "20% 50%" : "80% 50%"
                        }, ${alpha(theme.palette.primary.main, 0.12)}, transparent 40%)`,
                    zIndex: -1,
                }}
            />

            {/* FLEX CONTAINER */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "1600px",
                    mx: "auto",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 6,
                }}
            >
                {/* LEFT / TEXT */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: isLeft ? "flex-end" : "flex-start",
                        order: { xs: 1, md: isLeft ? 1 : 3 },
                        position: "relative",
                    }}
                >
                    {/* CONNECTOR */}
                    <Box
                        sx={{
                            display: { xs: "none", md: "block" },
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            right: isLeft ? -40 : "auto",
                            left: isLeft ? "auto" : -40,
                            width: 40,
                            height: "2px",
                            background: `linear-gradient(to ${isLeft ? "right" : "left"
                                }, ${theme.palette.primary.main}, transparent)`,
                            opacity: 0.6,
                        }}
                    />

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-100px" }}
                        style={{ width: "100%", maxWidth: 600 }}
                    >
                        <Box
                            sx={{
                                p: 5,
                                borderRadius: 4,

                                background: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.primary.border}`,

                                backdropFilter: "blur(12px)",

                                transition: "all 0.3s ease",
                                textAlign: "left",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: `0 25px 80px ${theme.palette.primary.glow}`,
                                },
                            }}
                        >
                            <motion.div variants={itemVariant}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 2,
                                        gap: 1.5,
                                    }}
                                >
                                    {/* <Icon sx={{ color: "primary.main" }} /> */}

                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 600,
                                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Box>
                            </motion.div>

                            <motion.div variants={itemVariant}>
                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        lineHeight: 1.8,
                                        fontSize: "1.05rem",
                                    }}
                                >
                                    {item.desc}
                                </Typography>
                            </motion.div>
                        </Box>
                    </motion.div>
                </Box>


                {/* RIGHT / VISUAL */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        order: { xs: 2, md: isLeft ? 3 : 1 },
                    }}
                >
                    <TimelineVisual Icon={Icon} />
                </Box>
            </Box>
        </Box>
    );
}