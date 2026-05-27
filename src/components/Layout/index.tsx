"use client";

import { NAME } from "@/contants";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React from "react";
import { Footer, Menu } from "..";
import { QUERYResult } from "@/types/query";
import WhatsApp from "../WhatsApp";
import { BREAKPOINT } from "@/theme";

const Logo = styled(Image)(({ theme }) => ({
  width: "300px",
  height: "300px",
  position: "fixed",
  zIndex: 1,
  padding: theme.spacing(4),

  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  animationName: "move-box",
  animationTimeline: "scroll(root)",
  animationRange: "0px 600px",
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
      top: theme.spacing(2),
      left: "50%",
      padding: theme.spacing(1.25),
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
  locale: string;
}> = ({ children, menu, whatsApp, locale }) => {
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
