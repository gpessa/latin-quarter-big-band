"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { Monoton as Title, Roboto_Serif as Text } from "next/font/google";
// import { Gravitas_One as Title, Poppins as Text } from "next/font/google";

export const BREAKPOINT = "md";

const text = Text({
  weight: ["400", "700"],
  preload: false,
  // subsets: ["latin"],
});

const title = Title({
  weight: "400",
  preload: false,
});

const Colors = {
  rosso_latino_vivo: "#C02B2B",
  giallo_oro: "#F7C325",
  blu: "#2a6583",
};

const theme = createTheme({
  palette: {
    primary: { main: Colors.rosso_latino_vivo },
    secondary: { main: Colors.blu },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "inherit",
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
      lineHeight: 1,
    },
    h2: {
      fontFamily: title.style.fontFamily,
      lineHeight: 1,
    },
    h3: {
      fontFamily: title.style.fontFamily,
      lineHeight: 1,
    },
    h5: {
      fontFamily: title.style.fontFamily,
      lineHeight: 1,
    },
    h6: {
      fontFamily: title.style.fontFamily,
      lineHeight: 1,
    },
  },
});

export default responsiveFontSizes(theme);
