import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import { LanguageProvider } from "./context/LanguageContext";

const Noto = Noto_Sans_Thai({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnandayDonation",
  description: "ลงทะเบียนบริจาควันอนันทมหิดล",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Noto.className}>
        <Providers>
          <LanguageProvider>{children}</LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
