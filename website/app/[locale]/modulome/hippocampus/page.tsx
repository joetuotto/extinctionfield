import { redirect } from "next/navigation";

export default async function HippocampusRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/modulome/brain`);
}
