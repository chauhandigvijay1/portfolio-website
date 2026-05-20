import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Serif, Plus_Jakarta_Sans, Syncopate } from "next/font/google";
import "./globals.css";
import { portfolioFallback, siteUrl } from "@/lib/site-data";
import { AppProviders } from "@/components/providers/app-providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const heroEditorial = Cormorant_Garamond({
  variable: "--font-hero-editorial",
  subsets: ["latin"],
  weight: ["300"],
  style: ["italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Digvijay | Full Stack Developer",
    template: "%s | Digvijay",
  },
  description: portfolioFallback.profile.intro,
  keywords: [
    "Digvijay",
    "Full Stack Developer",
    "MERN Stack",
    "Next.js portfolio",
    "React developer",
    "Node.js developer",
    "MongoDB",
    "Product engineer portfolio",
  ],
  openGraph: {
    title: "Digvijay | Full Stack Developer",
    description: portfolioFallback.profile.intro,
    url: siteUrl,
    siteName: "Digvijay Portfolio",
    images: [
      {
        url: portfolioFallback.profile.headshot,
        width: 962,
        height: 1444,
        alt: "Digvijay portrait",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digvijay | Full Stack Developer",
    description: portfolioFallback.profile.intro,
    images: [portfolioFallback.profile.headshot],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${syncopate.variable} ${instrumentSerif.variable} ${heroEditorial.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
