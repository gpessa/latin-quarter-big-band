"use client";

import { Typography } from "@mui/material";
import Section from "../Section";

export default function Footer() {
  return (
    <Section tone="cream">
      <Typography variant="body2" align="center" >
        &copy; {new Date().getFullYear()} Latin Quarter Big Band. All rights
        reserved.
      </Typography>
    </Section>
  );
}
