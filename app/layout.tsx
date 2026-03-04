import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import { SwrProvider } from "./providers";
import "./globals.css";
import { Toast } from "@heroui/react";

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
    <html lang="th">
      <body className={`${ibmSans.variable} ${ibmSans.className} antialiased`}>
        <SwrProvider>
          <Toast.Provider />
          {children}
        </SwrProvider>
      </body>
    </html>
  );
}
