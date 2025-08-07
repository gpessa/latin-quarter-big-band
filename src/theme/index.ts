"use client";
import { createTheme } from "@mui/material/styles";

import { Monoton as Title, Rubik as Text } from "next/font/google";
// import { Gravitas_One as Title, Poppins as Text } from "next/font/google";

const text = Text({
  weight: "400",
  preload: true,
  subsets: ["latin"],
});

const title = Title({
  weight: "400",
});

const Colors = {
  rosso_latino_vivo: "#C02B2B",
  giallo_oro: "#F7C325",
};

const theme = createTheme({
  typography: {
    fontFamily: text.style.fontFamily,
    fontSize: 17,
    h1: {
      fontFamily: title.style.fontFamily,
      color: Colors.rosso_latino_vivo,
      lineHeight: 1,
    },
    h2: {
      fontFamily: title.style.fontFamily,
      color: Colors.rosso_latino_vivo,
      lineHeight: 1,
    },
  },
});

export default theme;
