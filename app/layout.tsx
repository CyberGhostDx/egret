import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { SwrProvider } from "./providers";

const ibmSans = IBM_Plex_Sans_Thai({
  variable: "--font-ibm",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "EGRET",
  description: "Engineering  Generated Rapid Exam Table",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmSans.variable} ${ibmSans.className}  antialiased`}>
        <NextIntlClientProvider>
          <SwrProvider>{children}</SwrProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
