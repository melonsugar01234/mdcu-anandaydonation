import "./globals.css";

import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";

// Font
const NotoSansThai = Noto_Sans_Thai({
  variable: "--font-sans",
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "MDCU Ananday Donation",
  description: "MDCU Ananday Donation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * NOTE: The lang attribute is hard-coded because there's no ideal solution.
   * It doesn't actually effects the content language, just the metadata.
   * See: https://github.com/vercel/next.js/discussions/49415
   */

  return (
    <html lang="th">
      <body className={`${NotoSansThai.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
