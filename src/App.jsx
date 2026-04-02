import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import Hero from "./sections/Hero/Hero";
import Timeline from "./sections/Timeline/Timeline";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SmoothScrollProvider>
        <Hero />
        <Timeline />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}

export default App;