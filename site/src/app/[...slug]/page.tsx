import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GenericPage from "@/components/GenericPage";
import { brand, pageDefinitions } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string[] }> };

function pathFromSlug(slug: string[]) {
  return `/${slug.join("/")}`;
}

export function generateStaticParams() {
  return Object.keys(pageDefinitions).map((path) => ({ slug: path.slice(1).split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pageDefinitions[pathFromSlug(slug)];
  if (!page) return {};
  const title = page.title.endsWith(".") ? page.title.slice(0, -1) : page.title;
  return {
    title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: page.path },
    openGraph: { title: `${title} | Preventa AI`, description: page.description, url: `${brand.url}${page.path}`, images: [{ url: "/brand/preventa-ai-social-preview.png", width: 1200, height: 630, alt: "PREVENTA AI — Responsible AI for public health" }] },
    twitter: { card: "summary_large_image", title: `${title} | Preventa AI`, description: page.description, images: ["/brand/preventa-ai-social-preview.png"] },
  };
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const page = pageDefinitions[pathFromSlug(slug)];
  if (!page) notFound();

  const faqSchema = page.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;

  return (
    <>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />}
      <GenericPage page={page} />
    </>
  );
}
