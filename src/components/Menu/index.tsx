"use client";

import { SECTIONS } from "@/contants";
import { Box, Button, styled } from "@mui/material";
import { QUERYResult } from "../../../sanity.types";

const NAV_ITEMS: Array<{
  key: keyof QUERYResult["menu"];
  href: (typeof SECTIONS)[keyof typeof SECTIONS];
}> = [
  { key: "aboutUs", href: SECTIONS.aboutUs },
  { key: "agenda", href: SECTIONS.agenda },
  { key: "gallery", href: SECTIONS.gallery },
  { key: "joinTheBand", href: SECTIONS.joinTheBand },
];


const MenuButton = styled(Button)(({ theme }) => ({
  textTransform: "uppercase",
  fontWeight: theme.typography.fontWeightBold,
}));


export default function Menu({
  menu,
  direction = "row",
  onNavigate,
}: {
  menu: QUERYResult["menu"];
  direction?: "row" | "column";
  onNavigate?: () => void;
}) {
  const items = NAV_ITEMS.flatMap(({ key, href }) => {
    const title = menu[key];
    return title ? [{ title, href }] : [];
  });

  return (
    <Box
      component="nav"
      aria-label="Primary"
      sx={{
        display: "flex",
        flexDirection: direction,
        alignItems: direction === "row" ? "center" : "flex-start",
        gap: direction === "row" ? 3.5 : 2.25,
      }}
    >
      {items.map((item) => (
        <MenuButton 
          href={`#${item.href}`}
          onClick={onNavigate}
          variant="text"
          color="inherit"
        >
          {item.title}
        </MenuButton>
      ))}
    </Box>
  );
}
