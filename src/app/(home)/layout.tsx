import { Footer, Logo, Menu } from "@/components";
import { Box, Stack } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack direction="row">
      <Box>
        <Stack
          gap={2}
          sx={{ position: "sticky", top: 0, pl: 1, pr: 1 }}
          alignContent="space-around"
          textAlign="center"
        >
          <Logo />
          <Menu />
          <Footer />
        </Stack>
      </Box>
      <Box sx={{ flex: 1, flexGrow: 1 }}>{children}</Box>
    </Stack>
  );
}
