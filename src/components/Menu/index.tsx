"use client";

import { SECTIONS } from "@/contants";
import { QUERYResult } from "@/types/query";
import { Box } from "@mui/material";
import { titleFontFamily } from "@/theme";

const NAV_ITEMS: Array<{
  key: keyof QUERYResult["menu"];
  href: (typeof SECTIONS)[keyof typeof SECTIONS];
}> = [
  { key: "aboutUs", href: SECTIONS.aboutUs },
  { key: "agenda", href: SECTIONS.agenda },
  { key: "gallery", href: SECTIONS.gallery },
  { key: "joinTheBand", href: SECTIONS.joinTheBand },
];

export default function Menu({
  menu,
  direction = "row",
  onNavigate,
  label,
}: {
  menu: QUERYResult["menu"];
  direction?: "row" | "column";
  onNavigate?: () => void;
  label: string;
}) {
  const items = NAV_ITEMS.flatMap(({ key, href }) => {
    const title = menu[key];
    return title ? [{ title, href }] : [];
  });

  return (
    <Box
      component="nav"
      aria-label={label}
      sx={{
        display: "flex",
        flexDirection: direction,
        alignItems: direction === "row" ? "center" : "flex-start",
        gap: direction === "row" ? 3.5 : 2.25,
      }}
    >
      {items.map((item) => (
        <Box
          key={item.href}
          component="a"
          href={`#${item.href}`}
          onClick={onNavigate}
          sx={{
            color: "text.primary",
            textDecoration: "none",
            fontFamily: titleFontFamily,
            fontWeight: 400,
            fontSize: direction === "row" ? 18 : 22,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            "&:hover": { color: "primary.main" },
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "primary.main",
              outlineOffset: 4,
            },
          }}
        >
          {item.title}
        </Box>
      ))}
    </Box>
  );
}
