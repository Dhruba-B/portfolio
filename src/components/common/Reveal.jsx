import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, direction = "up" }) {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : 0,
            x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
            scale: 0.98,
            filter: "blur(6px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.65,
                delay,
                ease: [0.16, 1, 0.3, 1], // smoother, more "product-like"
            },
        },
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
        >
            {children}
        </motion.div>
    );
}