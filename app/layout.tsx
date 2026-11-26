import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nithyam by PMJ Jewels — Phase 1 Design Concepts",
  description:
    "Internal stakeholder preview of four homepage concepts for Nithyam handcrafted silver jewellery by PMJ Jewels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${cormorant.variable} ${outfit.variable} ${instrument.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
