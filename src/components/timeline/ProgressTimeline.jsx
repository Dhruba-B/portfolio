import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

export default function ProgressTimeline({ items, activeIndex, onClick }) {
    const nodeSize = 14;
    const nodeGap = 16;
    const trackHeight = Math.max((items.length - 1) * (nodeSize + nodeGap), 0);
    const activeProgress = Math.min(activeIndex, items.length - 1) * (nodeSize + nodeGap);

    return (
        <Box
            sx={{
                position: "fixed",
                left: { md: 22, lg: 30 },
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1000,
                display: { xs: "none", md: "block" },
                py: 2,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    left: "50%",
                    top: `${nodeSize / 2}px`,
                    transform: "translateX(-50%)",
                    width: "2px",
                    height: `${trackHeight}px`,
                    bgcolor: alpha("#7c3aed", 0.22),
                    borderRadius: 999,
                }}
            />
            <motion.div
                animate={{ height: activeProgress }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                style={{
                    position: "absolute",
                    left: "50%",
                    top: `${nodeSize / 2}px`,
                    transform: "translateX(-50%)",
                    width: "2px",
                    height: 0,
                    borderRadius: 999,
                    background:
                        "linear-gradient(180deg, rgba(124,58,237,0.9) 0%, rgba(56,189,248,0.9) 100%)",
                }}
            />
            {[0, 1, 2].map((star) => (
                <motion.div
                    key={`rail-star-${star}`}
                    animate={{ opacity: [0.35, 0.95, 0.35], scale: [0.9, 1.25, 0.9] }}
                    transition={{
                        duration: 2.2 + star * 0.7,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{
                        position: "absolute",
                        left: star === 0 ? -10 : star === 1 ? 24 : 30,
                        top: star === 0 ? -20 : star === 1 ? `${trackHeight * 0.5}px` : `${trackHeight + 16}px`,
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "rgba(192,132,252,0.95)",
                        boxShadow: "0 0 10px rgba(192,132,252,0.8)",
                    }}
                />
            ))}
            <Box sx={{ position: "relative", zIndex: 1 }}>
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        animate={
                            index === activeIndex
                                ? { y: [0, -2, 0] }
                                : { y: 0 }
                        }
                        transition={{
                            duration: 2.2,
                            repeat: index === activeIndex ? Infinity : 0,
                            ease: "easeInOut",
                        }}
                    >
                        <Box
                        onClick={() => onClick(index)}
                        title={item.title}
                        sx={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            mb: 2,
                            cursor: "pointer",
                            border: "1px solid",
                            borderColor:
                                index === activeIndex
                                    ? "primary.main"
                                    : "rgba(124,58,237,0.4)",
                            backgroundColor:
                                index === activeIndex
                                    ? "primary.main"
                                    : "background.paper",
                            boxShadow:
                                index === activeIndex
                                    ? "0 0 16px rgba(124,58,237,0.65)"
                                    : "none",
                            transform:
                                index === activeIndex ? "scale(1.2)" : "scale(1)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                transform: "scale(1.2)",
                                borderColor: "primary.main",
                            },
                        }}
                    />
                    </motion.div>
                ))}
            </Box>
        </Box>
    );
}