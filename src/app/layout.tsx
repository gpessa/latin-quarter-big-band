import { Logo, Menu } from "@/components";
import { GOOGLE_ANALYTICS, IS_PRODUCTION } from "@/contants";
import { SanityLive } from "@/sanity/lib/live";
import theme from "@/theme";
import { Box, CssBaseline, GlobalStyles, Stack } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                p: { margin: 0, padding: 0 },
              }}
            />

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
                  {/* <Footer /> */}
                </Stack>
              </Box>
              <Box sx={{ flex: 1, flexGrow: 1 }}>{children}</Box>
            </Stack>

            <SanityLive />
            {IS_PRODUCTION && <GoogleAnalytics gaId={GOOGLE_ANALYTICS} />}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
