import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AssessmentModal from "@/components/AssessmentModal";

/* Phronesis AI type system:
   Fraunces (warm humanist display) · DM Sans (body) · JetBrains Mono (data) */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://phronesis.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Phronesis AI — AI Health Promotion Platform for Public Health Teams",
    template: "%s · Phronesis AI",
  },
  description:
    "Phronesis AI is the AI health promotion platform and public health brain trust: population health assessment, Ottawa Charter-aligned promotion, capacity building and evidence-based health judgments — human-led, AI-assisted, OCAP® compliant.",
  keywords: [
    "AI health promotion platform",
    "public health AI",
    "evidence-based health judgments",
    "population health assessment",
    "Ottawa Charter health promotion",
    "OCAP principles compliance",
    "community wellness AI",
    "health intelligence platform",
    "public health software Canada",
    "health equity analytics",
    "AI co-pilot for public health",
    "wellness assessment platform",
    "health promotion evaluation software",
    "PHIPA compliant health platform",
    "Indigenous data sovereignty health",
    "Indigenous-led health promotion Canada",
    "Path of the Seven Fires",
    "Phronesis AI",
  ],
  authors: [{ name: "Phronesis AI" }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Phronesis AI",
    locale: "en_CA",
    url: SITE_URL,
    title: "Phronesis AI — Transforming Health and Wellness.",
    description:
      "The AI-powered brain trust bridging evidence-based judgments with public health action. Human-led, AI-assisted, equity by default.",
    // images intentionally omitted — app/opengraph-image.tsx is auto-detected
    // by Next.js's file-based metadata convention and wired in automatically.
  },
  twitter: {
    card: "summary_large_image",
    title: "Phronesis AI — AI Health Promotion Platform",
    description:
      "Population assessment, health promotion, resilience and evaluation — one evidence-based, human-led platform.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/favicon.svg" }],
  },
  other: {
    "theme-color": "#0B3D5F",
  },
};

/* AEO: SoftwareApplication + Organization + WebSite schemas so answer
   engines (Perplexity, Gemini, ChatGPT) can describe us accurately. */
const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Phronesis AI",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Public Health Intelligence",
  operatingSystem: "Web",
  description:
    "AI health promotion platform for population health assessment, health promotion and disease prevention, resilience and emergency preparedness, operations and policy review, networked collaboration, evidence and AI, systems for health protection, and intelligence and analytics.",
  url: SITE_URL,
  featureList: [
    "Population assessment and surveillance",
    "Health promotion and disease prevention planning",
    "Resilience and emergency preparedness modelling",
    "Formative, process, outcome and summative evaluation",
    "Nine community wellness modules",
    "Human-led AI co-pilot with auditable evidence retrieval",
    "OCAP, PHIPA, HIPAA and GDPR aligned data governance",
    "Path of the Seven Fires — Indigenous-led health promotion and community-controlled AI training for First Nations, Inuit and Métis communities",
  ],
  audience: {
    "@type": "Audience",
    audienceType: "Public health teams, healthcare institutions, NGOs and governments",
  },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Phronesis AI",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  slogan: "Transforming Health and Wellness.",
  description:
    "Health intelligence platform bridging evidence-based judgments with public health action, aligned with the WHO, the Ottawa Charter and OCAP principles.",
  foundingDate: "2026",
  sameAs: [
    "https://www.who.int",
    "https://ocap.ca",
  ],
};

const webLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Phronesis AI",
  url: SITE_URL,
  inLanguage: "en-CA",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webLd) }}
        />
      </head>
      <body>
        <Preloader />
        <Cursor />
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
        <AssessmentModal />
        {/* film grain — keeps the gradients honest */}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
