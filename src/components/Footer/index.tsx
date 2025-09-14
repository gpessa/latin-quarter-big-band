"use client";

import InstagramIcon from "@mui/icons-material/Instagram";
import { Icon, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

const Video: React.FC = () => (
  <Stack component="footer" gap={2} alignItems={"center"}>
    <IconButton
      href="https://www.instagram.com/latinquarterbigband/"
      target="_blank"
      rel="noopener"
      aria-label="Instagram"
      color="primary"
    >
      <Icon component={InstagramIcon} />
    </IconButton>
    <Typography variant="body2" align="center" color="text.secondary">
      &copy; {new Date().getFullYear()} Latin Quarter Big Band.
      <br />
      All rights reserved.
    </Typography>
  </Stack>
);

export default Video;
