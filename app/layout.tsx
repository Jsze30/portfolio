import type { Metadata } from "next";
import { Bodoni_Moda, Montserrat } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MagneticTrail } from "@/components/MagneticTrail";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://szejason.com"),
  title: "Jason Sze",
  description: "Computer science @ UIUC. Portfolio.",
  openGraph: {
    title: "Jason Sze",
    description: "Computer science @ UIUC. Portfolio.",
    url: "https://szejason.com",
    siteName: "Jason Sze",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jason Sze",
    description: "Computer science @ UIUC. Portfolio.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${montserrat.variable}`}>
      <body>
        <MagneticTrail />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
