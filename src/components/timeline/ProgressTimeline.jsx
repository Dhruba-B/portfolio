import { Box } from "@mui/material";

export default function ProgressTimeline({ items, activeIndex, onClick }) {
    return (
        <Box
            sx={{
                position: "fixed",
                left: 30,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1000,
            }}
        >
            {items.map((_, index) => (
                <Box
                    key={index}
                    onClick={() => onClick(index)}
                    sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        mb: 2,
                        cursor: "pointer",
                        backgroundColor:
                            index === activeIndex ? "primary.main" : "grey.700",
                        boxShadow:
                            index === activeIndex
                                ? "0 0 12px primary.glow"
                                : "none",
                        transition: "0.3s",
                    }}
                />
            ))}
        </Box>
    );
}