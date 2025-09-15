import { Layout } from "@/components";
import { sanityFetch } from "@/sanity/lib/live";
import { QUERY as query } from "@/sanity/lib/queries";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    data: { menu },
  } = await sanityFetch({
    query,
  });

  return <Layout menu={menu}>{children}</Layout>;
}
