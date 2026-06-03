import { Layout } from "@/components";
import { fetchSiteData } from "@/sanity/lib/fetchGeneral";

export default async function HomeLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  const { general, menu } = await fetchSiteData(locale);

  return (
    <Layout
      menu={menu}
      whatsApp={general?.whatsApp}
      footer={{ footer: general?.footer || "" }}
    >
      {children}
    </Layout>
  );
}
