"use client";

import { Box, Container, ContainerProps } from "@mui/material";
import React from "react";
import { brand, GRID_SPACING, SCROLL_PADDING_TOP } from "@/theme";

const tones = {
  cream: { bgcolor: brand.cream, color: brand.ink },
  teal: { bgcolor: brand.teal, color: "#ffffff" },
  red: { bgcolor: brand.red, color: "#ffffff" },
} as const;

type Props = {
  id?: string;
  tone?: keyof typeof tones;
  maxWidth?: ContainerProps["maxWidth"];
  children: React.ReactNode;
  className?: string;
};

const Section: React.FC<Props> = ({
  id,
  tone = "cream",
  maxWidth = "lg",
  children,
  className,
}) => {
  const colors = tones[tone];

  return (
    <Box
      id={id}
      component="section"
      className={className}
      sx={{
        bgcolor: colors.bgcolor,
        color: colors.color,
        py: GRID_SPACING,
        scrollMarginTop: SCROLL_PADDING_TOP,
      }}
    >
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
};

export default Section;
