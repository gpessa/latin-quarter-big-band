"use client";
import { Box, styled, TextField, TextFieldProps } from "@mui/material";

const LabelStyled = styled('label')(({ theme }) => ({
  display: "block",
  textTransform: "uppercase",
  fontWeight: theme.typography.fontWeightBold,
  fontSize: "80%",
  marginBottom: theme.spacing(0.5),
}));

export default function LabeledField({
  label,
  id,
  ...props
}: { label?: string } & TextFieldProps) {
  return (
    <Box>
      {label ? (
        <LabelStyled htmlFor={id}  >
          {label}
        </LabelStyled>
      ) : null}
      <TextField id={id} fullWidth variant="outlined"  {...props} />
    </Box>
  );
}
