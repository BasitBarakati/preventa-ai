import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MotionSystem from "@/components/MotionSystem";
import { brand } from "@/lib/site-content";

// Authoritative editorial serif for headings sitewide
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// Swiss-grade technical UI typography for luxury readability
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

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
  description: "Preventa AI is a public-health initiative building responsible, human-overseen AI for equitable, accountable communities — five connected programs spanning situation assessment, health and wellness, Indigenous health and wellbeing, research and risk prediction, and workforce learning.",
  applicationName: brand.displayName,
  authors: [{ name: brand.sentenceName }],
  creator: brand.sentenceName,
  publisher: brand.sentenceName,
  keywords: ["responsible AI for public health", "public health transformation", "AI governance in healthcare", "Indigenous health data governance", "OCAP principles health data", "public health workforce learning", "AI risk prediction public health"],
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
  description: "A public-health initiative building responsible, human-overseen AI for equitable, accountable communities.",
  knowsAbout: ["Situation Assessment", "Health and Wellness", "Indigenous Health and Wellbeing", "Research and Risk Prediction", "Courses and Workforce Learning"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: brand.displayName,
  url: brand.url,
  inLanguage: "en-CA",
};

// Answer-engine-friendly: short, quotable Q&As that mirror the on-page
// copy verbatim (the vision line matches the homepage blockquote exactly)
// so structured data and visible content never diverge.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is Preventa AI?", acceptedAnswer: { "@type": "Answer", text: "Preventa AI is a public-health initiative building responsible, human-overseen AI for equitable, accountable communities." } },
    { "@type": "Question", name: "What is Preventa AI's vision?", acceptedAnswer: { "@type": "Answer", text: brand.tagline } },
    { "@type": "Question", name: "What programs does Preventa AI offer?", acceptedAnswer: { "@type": "Answer", text: "Five connected programs: Situation Assessment, Health and Wellness, Indigenous Health and Wellbeing, Research and Risk Prediction, and Courses and Workforce Learning." } },
    { "@type": "Question", name: "How does Preventa AI approach governance and data ethics?", acceptedAnswer: { "@type": "Answer", text: "Preventa AI is guided by OCAP® principles, Two-Eyed Seeing, and PHIPA- and PIPEDA-aligned privacy practices, with human review at every consequential step." } },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-CA" className={`${fraunces.variable} ${plusJakarta.variable}`}>
      <head>
        {[organizationSchema, websiteSchema, faqSchema].map((schema) => <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
      </head>
      <body className="antialiased selection:bg-teal-100 selection:text-teal-900 min-h-screen flex flex-col font-sans">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        
        {/* Subtle Atmospheric Light & Scroll Progress Rail */}
        <div className="cursor-spotlight" aria-hidden="true" />
        <div className="scroll-rail" aria-hidden="true"><div className="scroll-rail__fill" /></div>
        <MotionSystem />

        {/* Top Canadian Public Health Authority Utility Ribbon */}
        <aside aria-label="Jurisdiction and Compliance" className="bg-[#062235] text-white/90 text-[11px] font-medium py-1.5 px-4 border-b border-white/10 relative z-50">
          <div className="site-container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-red-500 font-bold" aria-hidden="true">🍁</span>
              <span className="font-semibold text-white">Canada&apos;s Public Health AI Platform</span>
              <span className="text-white/30 hidden sm:inline" aria-hidden="true">|</span>
              <span className="text-white/80 hidden sm:inline">First Nations OCAP® &amp; PHIPA / PIPEDA Aligned</span>
            </div>
            <div className="flex items-center gap-4 text-white/70">
              <span className="hidden md:inline hover:text-white transition-colors cursor-default text-[10.5px]">Ottawa Charter &bull; WHO Collaborating Protocols</span>
              <span className="text-white/30 hidden md:inline" aria-hidden="true">|</span>
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <span className="font-bold text-[#17B8C4]">EN</span>
                <span className="text-white/30">/</span>
                <span className="hover:text-white transition-colors cursor-pointer" title="Version française">FR</span>
              </div>
            </div>
          </div>
        </aside>

        <Nav />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
