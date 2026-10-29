"use client";

import { brand } from "@/theme";
import { Box, TextField, TextFieldProps, Typography } from "@mui/material";

const fieldSx = {
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

export default function LabeledField({
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
