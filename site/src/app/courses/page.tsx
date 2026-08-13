import type { Metadata } from "next";
import { BookOpenCheck } from "lucide-react";
import ProgramPage from "@/components/ProgramPage";
import { brand, courses } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Courses and Workforce Learning",
  description: courses.description,
  alternates: { canonical: "/courses" },
  keywords: ["public health workforce learning"],
  openGraph: { title: `Courses and Workforce Learning | ${brand.displayName}`, description: courses.description, url: `${brand.url}/courses`, images: [{ url: "/brand/preventa-ai-social-preview.png", width: 1200, height: 630, alt: "PREVENTA AI — Responsible AI for public health" }] },
  twitter: { card: "summary_large_image", title: `Courses and Workforce Learning | ${brand.displayName}`, description: courses.description, images: ["/brand/preventa-ai-social-preview.png"] },
};

export default function CoursesPage() {
  return (
    <ProgramPage label="Courses and Workforce Learning" eyebrow={courses.eyebrow} title={courses.title} description={courses.description}>
      <section className="lux-section learning-section" id="tracks">
        <div className="container">
          <div className="course-grid-v2" data-stagger>
            {courses.tracks.map(({ title, text }, index) => (
              <div key={title} className="course-card-v2 lit-edge" data-tilt>
                <span className="tilt-sheen" aria-hidden="true" />
                <span>TRACK 0{index + 1}</span>
                <BookOpenCheck />
                <h3>{title}</h3>
                {text && <p>{text}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </ProgramPage>
  );
}
