import { Cutive_Mono, Cormorant_Garamond, Inter, Orbitron } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const mono = Cutive_Mono({
  weight: "400",
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const display = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const nameFont = Cormorant_Garamond({
  variable: "--font-name",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
