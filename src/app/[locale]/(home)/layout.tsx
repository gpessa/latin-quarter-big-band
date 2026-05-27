import { Layout } from "@/components";
import { defaultLocale } from "@/sanity/localeConfig";
import { sanityFetch } from "@/sanity/lib/live";
import { QUERY as query } from "@/sanity/lib/queries";

export default async function HomeLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const {
    data: { menu, whatsApp },
  } = await sanityFetch({
    query,
    params: { locale, defaultLocale },
  });

  return (
    <Layout menu={menu} whatsApp={whatsApp} locale={locale}>
      {children}
    </Layout>
  );
}
