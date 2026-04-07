import type { Metadata } from "next";
import { Castoro, Open_Sans } from "next/font/google";
import "./globals.css";

const castoro = Castoro({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-castoro",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MEDfacials | NeoGen Skin Suitability Analysis",
  description:
    "AI-powered skin analysis to discover if NeoGen Plasma Skin Regeneration is right for you. Free assessment by MEDfacials, Truro.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${castoro.variable} ${openSans.variable}`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#FAF7F4" />
      </head>
      <body>{children}</body>
    </html>
  );
}
