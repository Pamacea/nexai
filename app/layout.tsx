import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { StructuredData } from "@/components/StructuredData";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexai.directory';

export const metadata: Metadata = {
  title: {
    default: "NEXAI - Collection Corrompue",
    template: "%s | NEXAI",
  },
  description: "Une zone corrompue. Un directory horizontal avec glitch. Découvrez une collection de sites web expérimentaux avec esthétique glitch et corruption numérique.",
  keywords: [
    "directory",
    "glitch",
    "design expérimental",
    "portfolio",
    "SaaS",
    "brutalisme",
    "anti-design",
    "collection corrompue",
    "horizontal scroll",
    "web design",
  ],
  authors: [{ name: "NEXAI" }],
  creator: "NEXAI",
  publisher: "NEXAI",

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    title: "NEXAI - Collection Corrompue",
    description: "Une zone corrompue. Un directory horizontal avec glitch.",
    siteName: "NEXAI",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "NEXAI - Collection Corrompue",
      },
      {
        url: `${SITE_URL}/og-image-square.png`,
        width: 1200,
        height: 1200,
        alt: "NEXAI - Collection Corrompue",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "NEXAI - Collection Corrompue",
    description: "Une zone corrompue. Un directory horizontal avec glitch.",
    images: [`${SITE_URL}/og-image.png`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="oecAf0g9bpVtJ7OwIN8h6byljGDnWqzuNUYa615Bgqo" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <StructuredData type="organization" />
        <StructuredData type="website" />
        <StructuredData type="creativeWork" />
      </head>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} font-mono`}>
        {children}
        <PerformanceMonitor />
        <Analytics />
      </body>
    </html>
  );
}
