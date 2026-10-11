"use client";

import { brand } from "@/theme";
import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import React from "react";

export const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: brand.field,
    borderRadius: "8px",
    "& fieldset": { borderColor: "transparent" },
    "&:hover fieldset": { borderColor: "transparent" },
    "&.Mui-focused fieldset": { borderColor: brand.red },
  },
  "& .MuiOutlinedInput-input": {
    py: 1.45,
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(16, 32, 44, 0.42)",
    opacity: 1,
  },
  "& .MuiFormHelperText-root": {
    mx: 0,
    mt: 0.75,
  },
};

const labelSx = {
  display: "block",
  mb: 0.75,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: brand.ink,
};

export function LabeledField({
  label,
  id,
  ...props
}: { label?: string } & TextFieldProps) {
  return (
    <Box>
      {label ? (
        <Typography component="label" htmlFor={id} sx={labelSx}>
          {label}
        </Typography>
      ) : null}
      <TextField id={id} fullWidth variant="outlined" sx={fieldSx} {...props} />
    </Box>
  );
}

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

export const submitButtonSx = {
  mt: 0.5,
  py: 1.35,
  borderRadius: "8px",
  fontSize: 16,
  fontWeight: 600,
};
