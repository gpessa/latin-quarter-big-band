"use client";

import { QUERYResult } from "@/types/query";
import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import WhatsApp from "../WhatsApp";

const Layout: React.FC<{
  children: React.ReactNode;
  menu: QUERYResult["menu"];
  locale: string;
  whatsApp: NonNullable<QUERYResult["general"]>["whatsApp"];
  footer: { footer: string };
}> = ({ children, menu, locale, whatsApp, footer }) => {
  return (
    <div>
      <Header menu={menu} locale={locale} />
      {children}
      {whatsApp && <WhatsApp {...whatsApp} />}
      <Footer {...footer} />
    </div>
  );
};

export default Layout;
