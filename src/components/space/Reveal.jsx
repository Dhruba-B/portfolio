import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

/**
 * Fade/slide-in on first view. Sets data-visible="true|false" so children can
 * react in CSS, e.g.  sx={{ '[data-visible="true"] &': { transform: 'scaleY(1)' } }}
 */
export default function Reveal({ children, delay = 0, y = 28, sx, ...rest }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        if (typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return undefined;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const ease = "cubic-bezier(.2,.7,.2,1)";
    return (
        <Box
            ref={ref}
            data-visible={visible}
            sx={[
                {
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : `translate3d(0, ${y}px, 0)`,
                    transition: `opacity 900ms ${ease} ${delay}ms, transform 900ms ${ease} ${delay}ms`,
                    willChange: "opacity, transform",
                    "@media (prefers-reduced-motion: reduce)": { opacity: 1, transform: "none", transition: "none" },
                },
                ...(sx ? [sx] : []),
            ]}
            {...rest}
        >
            {children}
        </Box>
    );
}