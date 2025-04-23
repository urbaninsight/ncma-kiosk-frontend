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
      <body className="overflow-hidden font-sans">{children}</body>
    </html>
  );
}
