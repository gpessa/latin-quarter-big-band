import {
  GOOGLE_ANALYTICS,
  IS_PRODUCTION,
  LANG,
  NAME,
  SEO_DESCRIPTION,
  SEO_TITLE,
  SITE_URL,
} from "@/contants";
import { SanityLive } from "@/sanity/lib/live";
import theme, { SCROLL_PADDING_TOP } from "@/theme";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_TITLE,
    template: `%s | ${NAME}`,
  },
  description: SEO_DESCRIPTION,
  applicationName: NAME,
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: NAME,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
};

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
                p: { margin: 0, padding: 0, marginBottom: "1em" },
                "@media (prefers-reduced-motion: no-preference)": {
                  html: { scrollBehavior: "smooth" },
                },
                html: { scrollPaddingTop: SCROLL_PADDING_TOP },
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
