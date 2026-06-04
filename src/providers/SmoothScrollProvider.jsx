import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScrollProvider({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            smoothWheel: true,
            lerp: 0.08,
        });
        let frameId;
        window.__portfolioLenis = lenis;

        function raf(time) {
            lenis.raf(time);
            frameId = requestAnimationFrame(raf);
        }

        frameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frameId);
            if (window.__portfolioLenis === lenis) {
                delete window.__portfolioLenis;
            }
            lenis.destroy();
        };
    }, []);

    return children;
}
