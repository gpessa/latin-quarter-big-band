"use client";

import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 5, md: 7 },
        px: 2,
        textAlign: "center",
        bgcolor: "background.default",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} Latin Quarter Big Band. All rights
        reserved.
      </Typography>
    </Box>
  );
}
