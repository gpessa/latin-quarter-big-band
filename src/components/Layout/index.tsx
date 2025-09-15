"use client";

import { NAME } from "@/contants";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React from "react";
import { Footer } from "..";
import { QUERYResult } from "../../../sanity.types";
import WhatsApp from "../WhatsApp";
import { BREAKPOINT } from "@/theme";

const Logo = styled(Image)(({ theme }) => ({
  width: "300px",
  height: "300px",
  position: "fixed",
  zIndex: 1,
  padding: theme.spacing(4), // 🔹 use theme spacing instead of raw px

  // Center at start
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  // Animation
  animationName: "move-box",
  animationTimeline: "scroll(root)",
  animationRange: "0px 400px",
  animationFillMode: "both",

  [theme.breakpoints.up(BREAKPOINT)]: {
    height: "500px",
    width: "500px",
  },

  "@keyframes move-box": {
    "0%": {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    "100%": {
      top: 0,
      left: "50%",
      padding: theme.spacing(1.25), // instead of 10px
      width: 140,
      height: 140,
      transform: "translate(-50%, 0%)",
    },
  },
}));

const Layout: React.FC<{
  children: React.ReactNode;
  menu: QUERYResult["menu"];
  whatsApp: QUERYResult["whatsApp"];
}> = ({ children, whatsApp }) => {
  return (
    <div>
      <Logo
        src={require("@/assets/logo.svg").default}
        alt={NAME}
        width={500}
        height={500}
      />

      {children}

      {whatsApp && <WhatsApp {...whatsApp} />}

      <Footer />
    </div>
  );
};

export default Layout;
