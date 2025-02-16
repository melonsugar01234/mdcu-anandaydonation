import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";

export const metadata: Metadata = {
  title: "MDCU Ananday Donation",
  description: "MDCU Ananday Donation",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen w-full flex-col items-center overflow-clip">
        <Navbar />
        {children}
        <div className="mt-auto"></div>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
