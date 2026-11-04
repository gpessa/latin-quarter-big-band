"use client";

import { NAME } from "@/contants";
import { QUERYResult } from "../../../sanity.types";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Container, Drawer, IconButton } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Menu from "../Menu";

export default function Header({ menu }: { menu: QUERYResult["menu"] }) {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      setShowLogo(progress >= 0.1);
      setCompact(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        bgcolor: "background.default",
        boxShadow: compact ? "0 10px 28px rgba(16, 32, 44, 0.12)" : "none",
        transition: "box-shadow 360ms ease",
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          py: 1.25,
          minHeight: 76,
        }}
      >
        <Box
          component="a"
          href="/"
          aria-hidden={!showLogo}
          tabIndex={showLogo ? 0 : -1}
          sx={{
            display: "flex",
            alignItems: "center",
            color: "inherit",
            textDecoration: "none",
            opacity: showLogo ? 1 : 0,
            pointerEvents: showLogo ? "auto" : "none",
            transition: "opacity 280ms ease",
            "@media (prefers-reduced-motion: reduce)": {
              transition: "none",
            },
          }}
        >
          <Image
            src={require("@/assets/logo.svg").default}
            alt={NAME}
            width={52}
            height={52}
            priority
          />
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 3.5,
          }}
        >
          <Menu menu={menu} />
        </Box>

        <IconButton
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          sx={{ display: { md: "none" }, color: "text.primary" }}
        >
          <MenuIcon />
        </IconButton>
      </Container>

      <Drawer
        anchor="right"
        open={open}
        onClose={close}
      >
        <Menu menu={menu} direction="column" onNavigate={close} />
      </Drawer>
    </Box>
  );
}
