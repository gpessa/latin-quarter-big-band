/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import { SECTIONS } from "@/contants";
import { List, ListItemButton, ListItemText } from "@mui/material";

export default function Menu() {
  const MENU = [
    {
      title: "About Us",
      href: SECTIONS.aboutUs,
    },
    {
      title: "Agenda",
      href: SECTIONS.agenda,
    },
    {
      title: "Book Us",
      href: SECTIONS.bookUs,
    },
    {
      title: "Gallery",
      href: SECTIONS.gallery,
    },
    {
      title: "Join The Band",
      href: SECTIONS.joinTheBand,
    },
  ];

  return (
    <List>
      {MENU.map((item) => (
        <ListItemButton key={item.title} href={`#${item.href}`}>
          <ListItemText
            slotProps={{ primary: { variant: "h6", textAlign: "center" } }}
          >
            {item.title}
          </ListItemText>
        </ListItemButton>
      ))}
    </List>
  );
}
