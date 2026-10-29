"use client";

import { Box } from "@mui/material";
import React from "react";

export function FormCard({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}) {
  return (
    <Box
      component="form"
      noValidate
      onSubmit={onSubmit}
      sx={{
        bgcolor: "#fff",
        borderRadius: "12px",
        p: { xs: 2.5, md: 3.5 },
        boxShadow: "0 16px 40px rgba(16, 32, 44, 0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 2.25,
      }}
    >
      {children}
    </Box>
  );
}
