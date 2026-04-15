import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import Hero from "./sections/Hero/Hero";
import RoleCtaStrip from "./sections/CTA/RoleCtaStrip";
import TechCredibilityPanel from "./sections/Credibility/TechCredibilityPanel";
import Timeline from "./sections/Timeline/Timeline";
import RecruiterSnapshot from "./sections/Recruiter/RecruiterSnapshot";
import Footer from "./sections/Footer/Footer";
import StickyContactOrb from "./components/StickyContactOrb";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SmoothScrollProvider>
        <Hero />
        {/* <RoleCtaStrip /> */}
        <TechCredibilityPanel />
        <Timeline />
        <RecruiterSnapshot />
        <Footer />
        <StickyContactOrb />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}

export default App;