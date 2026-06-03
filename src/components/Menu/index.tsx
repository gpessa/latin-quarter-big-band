 
"use client";

import { SECTIONS } from "@/contants";
import { QUERYResult } from "@/types/query";
import { List, ListItemButton, ListItemText } from "@mui/material";

const MENU_SECTIONS: Array<{
  key: keyof QUERYResult["menu"];
  href: (typeof SECTIONS)[keyof typeof SECTIONS];
}> = [
  { key: "aboutUs", href: SECTIONS.aboutUs },
  { key: "agenda", href: SECTIONS.agenda },
  { key: "bookUs", href: SECTIONS.bookUs },
  { key: "gallery", href: SECTIONS.gallery },
  { key: "joinTheBand", href: SECTIONS.joinTheBand },
];

export default function Menu({ menu }: { menu: QUERYResult["menu"] }) {
  const items = MENU_SECTIONS.flatMap(({ key, href }) => {
    const title = menu[key];
    return title ? [{ title, href }] : [];
  });

  return (
    <List>
      {items.map((item) => (
        <ListItemButton key={item.href} href={`#${item.href}`}>
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
