import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Museum Kiosk",
  description: "Prototype for a museum kiosk",
};

const caseFont = localFont({
  src: [
    {
      path: "../assets/fonts/CaseVAR.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../assets/fonts/CaseVAR-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-case",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={caseFont.variable}>
      <GoogleTagManager gtmId="GTM-TDRM6CNP" />
      <body className="overflow-hidden font-sans scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500">
        {children}
      </body>
    </html>
  );
}
