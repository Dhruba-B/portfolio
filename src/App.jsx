import { ThemeProvider, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "./theme/theme";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import Hero from "./sections/Hero/Hero";
import RoleCtaStrip from "./sections/CTA/RoleCtaStrip";
import TechCredibilityPanel from "./sections/Credibility/TechCredibilityPanel";
import ExperienceSection from "./sections/Experience/ExperienceSection";
import Timeline from "./sections/Timeline/Timeline";
import RecruiterSnapshot from "./sections/Recruiter/RecruiterSnapshot";
import Footer from "./sections/Footer/Footer";
import StickyContactOrb from "./components/StickyContactOrb";
import ProgressTimeline from "./components/timeline/ProgressTimeline";

const pageSections = [
  { id: "hero", title: "Home" },
  { id: "tech", title: "Tech" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

function App() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const updateActiveSection = () => {
      const anchorLine = window.innerHeight * 0.35;
      let nextActive = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      pageSections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const isNearViewport = rect.bottom > 0 && rect.top < window.innerHeight;
        const distance = Math.abs(rect.top - anchorLine);
        
        if (isNearViewport && (distance < nearestDistance || true)) {
          nextActive = index;
          nearestDistance = distance;
        }
      });

      setActiveSection(nextActive);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const scrollToSection = (index) => {
    const section = document.getElementById(pageSections[index]?.id);
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const headerOffset = 96;
    const lenis = window.__portfolioLenis;

    if (lenis) {
      lenis.scrollTo(section, {
        offset: -headerOffset,
        immediate: prefersReducedMotion,
        duration: 1.05,
      });
    } else {
      const targetTop =
        section.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }


    window.history.replaceState(null, "", `#${pageSections[index].id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <ProgressTimeline
          items={pageSections}
          activeIndex={activeSection}
          onClick={scrollToSection}
        />
        <Hero sections={pageSections} onSectionSelect={scrollToSection} />
        {/* <RoleCtaStrip /> */}
        <TechCredibilityPanel />
        <ExperienceSection />
        <Timeline />
        <RecruiterSnapshot />
        <Footer />
        <StickyContactOrb />
    </ThemeProvider>
  );
}

export default App;
