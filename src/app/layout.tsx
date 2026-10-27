import { GOOGLE_ANALYTICS, IS_PRODUCTION, LANG } from "@/contants";
import { SanityLive } from "@/sanity/lib/live";
import theme from "@/theme";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={LANG}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                "h1, h2, h3": { margin: 0 },
                p: { margin: 0, padding: 0, marginBottom: "1em" },
                "@media (prefers-reduced-motion: no-preference)": {
                  html: { scrollBehavior: "smooth" },
                },
                html: { scrollPaddingTop: "104px" },
              }}
            />
            {children}
            <SanityLive />
            {IS_PRODUCTION && <GoogleAnalytics gaId={GOOGLE_ANALYTICS} />}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
