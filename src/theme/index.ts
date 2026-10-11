"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { Anton as Title, Outfit as Text } from "next/font/google";

export const BREAKPOINT = "md";

export const brand = {
  cream: "#F4F0E6",
  ink: "#10202C",
  red: "#C02B2B",
  redDark: "#9E2222",
  teal: "#1B5164",
  field: "#EFE8DC",
  mutedRed: "#8A4548",
};

const text = Text({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const title = Title({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const titleFontFamily = title.style.fontFamily;

const theme = createTheme({
  palette: {
    primary: { main: brand.red, dark: brand.redDark, contrastText: "#ffffff" },
    secondary: { main: brand.teal, contrastText: "#ffffff" },
    background: { default: brand.cream, paper: "#ffffff" },
    text: {
      primary: brand.ink,
      secondary: "rgba(16, 32, 44, 0.62)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: brand.cream,
        },
      },
    },
  },
  typography: {
    allVariants: {
      color: "inherit",
    },
    fontFamily: text.style.fontFamily,
    fontSize: 17,
    h1: {
      fontFamily: title.style.fontFamily,
      fontWeight: 400,
      lineHeight: 1.12,
      letterSpacing: "0.01em",
    },
    h2: {
      fontFamily: title.style.fontFamily,
      fontWeight: 400,
      fontSize: "3.02rem",
      lineHeight: 1.12,
      letterSpacing: "0.012em",
      textTransform: "uppercase",
    },
    h3: {
      fontFamily: title.style.fontFamily,
      fontWeight: 400,
      lineHeight: 1.12,
    },
    button: {
      fontFamily: text.style.fontFamily,
      fontWeight: 600,
    },
  },
});

export const proseSx = {
  fontSize: "1.0625rem",
  lineHeight: 1.65,
  "& p": { margin: 0, marginBottom: "1em" },
  "& p:empty": { display: "none" },
  "& p:last-child": { marginBottom: 0 },
  "& ul, & ol": { margin: "0.6em 0 1em", paddingLeft: "1.2em" },
  "& li": { marginBottom: "0.35em" },
  "& strong": { fontWeight: 700 },
  "& a": { color: "inherit" },
} as const;

theme.typography.h2 = {
  ...theme.typography.h2,
  [theme.breakpoints.up("md")]: {
    fontSize: "4.82rem",
  },
};

export default responsiveFontSizes(theme, {
  variants: [
    "h1",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "caption",
    "button",
    "overline",
  ],
});
