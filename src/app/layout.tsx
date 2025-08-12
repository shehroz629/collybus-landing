import "./globals.css";
import { Metadata, type Viewport } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import React from "react";
import { Kumbh_Sans, Montserrat } from "next/font/google";
import MixpanelInitializer from "@/components/mixpanel-initializer";

// Initialize Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

// Initialize Kumbh Sans
const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["200"],
  variable: "--font-kumbh-sans",
  display: "swap",
});

export const metadata: Metadata = {
  icons: [{ rel: "icon", url: "/favicon.png", type: "image/png" }],
  title: "COLLYBUS - Institutional Crypto Trading",
  description:
    "COLLYBUS brings an institutional FX-grade trading platform to the world of cryptocurrencies.",
};

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${kumbhSans.variable} font-main scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        <MixpanelInitializer />
        <div className="bg-gray-900 text-gray-100 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
