import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Sora } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MotionSystem from "@/components/MotionSystem";
import { Atmosphere, Preloader } from "@/components/Atmosphere";
import FloatingChatHUD from "@/components/ui/FloatingChatHUD";
import { brand } from "@/lib/site-content";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0f28" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f28" },
  ],
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: "Preventa AI | Responsible AI for Public Health Transformation",
    template: "%s | Preventa AI",
  },
  description: "Preventa AI combines responsible artificial intelligence, public-health assessments, evidence, dashboards, research tools, and workforce learning to help communities and organizations turn health intelligence into action.",
  applicationName: brand.displayName,
  authors: [{ name: brand.sentenceName }],
  creator: brand.sentenceName,
  publisher: brand.sentenceName,
  keywords: ["responsible AI for public health", "public health transformation", "public health assessment", "health intelligence platform", "evidence synthesis", "public health courses", "AI governance in healthcare", "community health assessment", "Indigenous health data governance"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: brand.url,
    siteName: brand.displayName,
    title: "Preventa AI | Responsible AI for Public Health Transformation",
    description: brand.tagline,
    images: [{ url: "/brand/preventa-ai-social-preview.png", width: 1200, height: 630, alt: "PREVENTA AI — Responsible AI for public health" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preventa AI | Responsible AI for Public Health Transformation",
    description: brand.tagline,
    images: ["/brand/preventa-ai-social-preview.png"],
  },
  icons: {
    icon: [{ url: "/brand/preventa-ai-icon-32.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/brand/preventa-ai-icon-192.png", type: "image/png", sizes: "192x192" }],
  },
  manifest: "/manifest.webmanifest",
  category: "health",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.displayName,
  url: brand.url,
  logo: `${brand.url}/brand/preventa-ai-logo.png`,
  slogan: brand.tagline,
  description: "An AI-enabled public health transformation platform that connects assessment, evidence, responsible implementation, research tools, and workforce learning.",
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: brand.displayName,
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Public Health Transformation",
  operatingSystem: "Web",
  url: brand.url,
  description: metadata.description,
  featureList: ["Situation assessment", "Public-health implementation tools", "Indigenous health governance pathways", "Evidence synthesis and research workspaces", "Public-health AI learning hub", "Human-reviewed AI assistance"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: brand.displayName,
  url: brand.url,
  inLanguage: "en-CA",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-CA" className={sora.variable}>
      <head>
        {[organizationSchema, softwareSchema, websiteSchema].map((schema) => <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
      </head>
      <body>
        <Preloader />
        <Atmosphere />
        <MotionSystem />
        <Nav />
        {children}
        <FloatingChatHUD />
        <Footer />
      </body>
    </html>
  );
}
