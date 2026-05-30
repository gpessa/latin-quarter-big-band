import { Layout } from "@/components";
import { defaultLocale } from "@/sanity/localeConfig";
import { fetchGeneral } from "@/sanity/lib/fetchGeneral";
import { sanityFetch } from "@/sanity/lib/live";
import { QUERY as query } from "@/sanity/lib/queries";

export default async function HomeLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  const [{ data: { menu, whatsApp } }, general] = await Promise.all([
    sanityFetch({
      query,
      params: { locale, defaultLocale },
    }),
    fetchGeneral(locale),
  ]);

  return (
    <Layout menu={menu} whatsApp={whatsApp} footer={{ footer: general?.footer || "" }}>
      {children}
    </Layout>
  );
}
