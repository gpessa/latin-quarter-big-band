import { GOOGLE_ANALYTICS, IS_PRODUCTION } from "@/contants";
import { SanityLive } from "@/sanity/lib/live";
import { defaultLocale, isValidLocale } from "@/sanity/localeConfig";
import theme from "@/theme";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { GoogleAnalytics } from "@next/third-parties/google";
import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localeHeader = (await headers()).get("x-locale");
  const lang =
    localeHeader && isValidLocale(localeHeader) ? localeHeader : defaultLocale;

  return (
    <html lang={lang}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                "h1, h2, h3": { margin: 0 },
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
