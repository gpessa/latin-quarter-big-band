"use client";

import React from "react";
import Footer from "../Footer";
import { QUERYResult } from "../../../sanity.types";
import WhatsApp from "../WhatsApp";
import Header from "../Header";

const Layout: React.FC<{
  children: React.ReactNode;
  menu: QUERYResult["menu"];
  whatsApp: QUERYResult["whatsApp"];
}> = ({ children, menu, whatsApp }) => {
  return (
    <div>
      <Header menu={menu} />
      {children}
      {whatsApp && <WhatsApp {...whatsApp} />}
      <Footer />
    </div>
  );
};

export default Layout;
