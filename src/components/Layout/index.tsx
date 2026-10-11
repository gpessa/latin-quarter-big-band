"use client";

import React from "react";
import Footer from "../Footer";
import { QUERYResult } from "@/types/query";
import WhatsApp from "../WhatsApp";
import Header from "../Header";

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
