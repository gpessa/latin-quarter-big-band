"use client";

import { Typography } from "@mui/material";
import Section from "../Section";

export default function Footer() {
  return (
    <Section>
      <Typography variant="body2" align="center" color="text.secondary">
        &copy; {new Date().getFullYear()} Latin Quarter Big Band. All rights
        reserved.
      </Typography>
    </Section>
  );
}
