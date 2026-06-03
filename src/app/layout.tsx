import { GOOGLE_ANALYTICS, IS_PRODUCTION } from "@/contants";
import { SanityLive } from "@/sanity/lib/live";
import { defaultLocale, isValidLocale } from "@/sanity/localeConfig";
import theme from "@/theme";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                p: { margin: 0, padding: 0, marginBottom: "1em" },
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
