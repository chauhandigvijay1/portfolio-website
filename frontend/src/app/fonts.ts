import { Cutive_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";

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

export const display = localFont({
  src: "../assets/fonts/nasalization.otf",
  variable: "--font-display",
  display: "swap",
});

export const nameFont = localFont({
  src: "../assets/fonts/quentin.otf",
  variable: "--font-name",
  display: "swap",
});
