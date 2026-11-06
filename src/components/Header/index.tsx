"use client";

import { NAME } from "@/contants";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Container, Drawer, IconButton, Link, styled, Toolbar } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { QUERYResult } from "../../../sanity.types";
import Menu from "../Menu";

const Logo = styled(Image)(({ theme }) => ({
    width: 40,
    height: 40,
  [theme.breakpoints.up("md")]: {
    width: 70,
    height: 70,
  }, 
}));

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
    <AppBar position="sticky" elevation={compact ? 5 : 0} 
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Toolbar >

          <Link
            href="/"
            aria-hidden={!showLogo}
            tabIndex={showLogo ? 0 : -1}
            sx={{
              opacity: showLogo ? 1 : 0,
              pointerEvents: showLogo ? "auto" : "none",
              transition: "opacity 280ms ease",
              display: "flex", 
              flexGrow: 1, 
              py: 2,
              "@media (prefers-reduced-motion: reduce)": {
                transition: "none",
              }, 
            }}
          >
            <Logo
              src={require("@/assets/logo.svg").default}
              alt={NAME}
              width={60}
              height={60}
              priority
            />
          </Link>

          <Box sx={{ display: { xs: "none", md: "flex" } }} >
            <Menu menu={menu} />
          </Box>

          <IconButton
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            sx={{ display: { md: "none" }, color: "text.primary" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={open}
        onClose={close}
      >
        <Box sx={{ p: 2 }}>
          <Menu menu={menu} direction="column" onNavigate={close} />
        </Box>
      </Drawer>

    </AppBar>
  );
}
