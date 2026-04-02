import { createTheme, alpha } from "@mui/material/styles";

const base = createTheme({
    palette: {
        mode: "dark",

        background: {
            default: "#05070F",
            paper: "#0B1022",
        },

        primary: {
            main: "#356EE9",
        },

        secondary: {
            main: "#16213E",
        },

        accent: {
            main: "#4FE7F2",
        },

        text: {
            primary: "#E8EBFF",
            secondary: "#9AA3C7",
        },

        divider: alpha("#FFFFFF", 0.08),
    },

    typography: {
        fontFamily: "Manrope, sans-serif",
    },
});

const theme = createTheme(base, {
    palette: {
        primary: {
            ...base.palette.primary,

            soft: alpha(base.palette.primary.main, 0.12),
            softer: alpha(base.palette.primary.main, 0.06),

            border: alpha(base.palette.primary.main, 0.25),
            glow: alpha(base.palette.primary.main, 0.45),
        },

        secondary: {
            ...base.palette.secondary,

            soft: alpha(base.palette.secondary.main, 0.25),
            border: alpha(base.palette.secondary.main, 0.3),
        },

        accent: {
            ...base.palette.accent,
            soft: alpha(base.palette.accent.main, 0.15),
        },
    },
});

export default theme;