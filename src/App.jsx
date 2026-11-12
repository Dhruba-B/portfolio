import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
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
import ScrollHero from "./sections/Hero/ScrollHero";

const pageSections = [
  { id: "hero", title: "Home" },
  { id: "tech", title: "Tech" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

function App() {
  const [activeSection, setActiveSection] = useState(0);

  const SPACE = {
    void: "#05060f",
    nebula: "#0d1030",
    blue: "#4f8cff",
    cyan: "#7dd3fc",
    violet: "#8b5cf6",
    magenta: "#c084fc",
  };

  const spaceScrollbar = (
    <GlobalStyles
      styles={{
        // Firefox only; Chrome would ignore the webkit styling if this applied there
        "@supports not selector(::-webkit-scrollbar)": {
          html: {
            scrollbarWidth: "thin",
            scrollbarColor: `${SPACE.violet} ${SPACE.void}`,
          },
        },

        "*::-webkit-scrollbar": {
          width: "12px",
          height: "12px",
        },

        // remove the default arrow buttons
        "*::-webkit-scrollbar-button": {
          display: "none",
          width: 0,
          height: 0,
        },

        "*::-webkit-scrollbar-track": {
          background: `
            radial-gradient(1px 1px at 30% 12%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 70% 38%, rgba(125,211,252,0.55), transparent),
            radial-gradient(1px 1px at 40% 64%, rgba(192,132,252,0.55), transparent),
            radial-gradient(1px 1px at 65% 88%, rgba(255,255,255,0.5), transparent),
            linear-gradient(180deg, ${SPACE.void}, ${SPACE.nebula} 50%, ${SPACE.void})
          `,
          backgroundSize: "100% 220px, 100% 220px, 100% 220px, 100% 220px, 100% 100%",
          borderLeft: "1px solid rgba(139, 92, 246, 0.18)",
        },

        "*::-webkit-scrollbar-thumb": {
          background: `linear-gradient(180deg, ${SPACE.cyan} 0%, ${SPACE.blue} 35%, ${SPACE.violet} 75%, ${SPACE.magenta} 100%)`,
          borderRadius: "999px",
          border: `3px solid ${SPACE.void}`,
          boxShadow: "inset 0 0 6px rgba(255,255,255,0.4)",
          minHeight: "64px",
        },

        "*::-webkit-scrollbar-thumb:hover": {
          background: `linear-gradient(180deg, #a5e8ff 0%, ${SPACE.blue} 30%, ${SPACE.magenta} 100%)`,
          boxShadow: "inset 0 0 8px rgba(255,255,255,0.6)",
        },

        "*::-webkit-scrollbar-thumb:active": {
          background: `linear-gradient(180deg, ${SPACE.blue}, ${SPACE.violet})`,
        },

        "*::-webkit-scrollbar-corner": {
          background: SPACE.void,
        },
      }}
    />
  );


  useEffect(() => {
    const updateActiveSection = () => {
      const anchorLine = window.innerHeight * 0.35;
      let nextActive = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      pageSections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        if (rect.top <= anchorLine && rect.bottom > anchorLine) nextActive = index;
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
      {spaceScrollbar}
      <CssBaseline />
      <ProgressTimeline
        items={pageSections}
        activeIndex={activeSection}
        onClick={scrollToSection}
      />
      <ScrollHero sections={pageSections} onSectionSelect={scrollToSection} />
      {/* <Hero sections={pageSections} onSectionSelect={scrollToSection} /> */}
      {/* <RoleCtaStrip /> */}
      
      <ExperienceSection />
      <Timeline />
      {/* <RecruiterSnapshot /> */}
      <Footer />
      <StickyContactOrb />
    </ThemeProvider>
  );
}

export default App;
