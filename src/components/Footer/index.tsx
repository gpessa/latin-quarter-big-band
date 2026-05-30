"use client";

import { Typography } from "@mui/material";
import Section from "../Section";

export default function Footer({ footer }: { footer: string }) {
  return (
    <Section>
      <Typography variant="body2" align="center" color="text.secondary">
        &copy; {new Date().getFullYear()} Latin Quarter Big Band. {footer}
      </Typography>
    </Section>
  );
}
