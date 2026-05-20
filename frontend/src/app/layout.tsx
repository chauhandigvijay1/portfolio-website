import type { Metadata } from "next";
import "./globals.css";
import { display, inter, mono, nameFont } from "@/app/fonts";
import { portfolioFallback, siteUrl } from "@/lib/site-data";
import { AppProviders } from "@/components/providers/app-providers";

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
      className={`dark ${inter.variable} ${mono.variable} ${display.variable} ${nameFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
