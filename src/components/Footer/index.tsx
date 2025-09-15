"use client";

import { Typography } from "@mui/material";
import React from "react";
import Section from "../Section";

const Video: React.FC = () => (
  <Section>
    <Typography variant="body2" align="center" color="text.secondary">
      &copy; {new Date().getFullYear()} Latin Quarter Big Band. All rights
      reserved.
    </Typography>
  </Section>
);

export default Video;
