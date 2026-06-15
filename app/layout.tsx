import type { Metadata } from "next";
import {
  Geist,
  JetBrains_Mono,
  Playfair_Display,
  Bodoni_Moda,
  Libre_Caslon_Text,
  DM_Serif_Display,
  Marcellus,
  Cinzel,
  Jost,
  Outfit,
  Mulish,
  Tinos,
  Manrope,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MagneticTrail } from "@/components/MagneticTrail";

// TODO: Swap to Mriya Grotesk once licensed.
// import localFont from "next/font/local";
// const display = localFont({
//   src: [
//     { path: "./fonts/MriyaGrotesk-Regular.woff2", weight: "400", style: "normal" },
//     { path: "./fonts/MriyaGrotesk-Medium.woff2",  weight: "500", style: "normal" },
//     { path: "./fonts/MriyaGrotesk-Bold.woff2",    weight: "700", style: "normal" },
//   ],
//   variable: "--font-display",
//   display: "swap",
// });

const display = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});
const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-caslon",
  display: "swap",
});
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
  display: "swap",
});
const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
  display: "swap",
});
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});
const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});
const tinos = Tinos({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tinos",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const previewFontVars = [
  playfair.variable,
  bodoni.variable,
  libreCaslon.variable,
  dmSerif.variable,
  marcellus.variable,
  cinzel.variable,
  jost.variable,
  outfit.variable,
  mulish.variable,
  tinos.variable,
  manrope.variable,
  montserrat.variable,
].join(" ");

export const metadata: Metadata = {
  title: "Jason Sze",
  description: "Computer science @ UIUC. Portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${previewFontVars}`}>
      <body>
        <MagneticTrail />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
