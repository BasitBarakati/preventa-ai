import { BookOpen, CheckCircle2 } from "lucide-react";

export default function CoursePreview() {
  return (
    <section className="glass-card course-page" aria-label="Learning hub interface preview">
      <div className="course-page__intro"><BookOpen size={28} /><span>LEARNING PATH PREVIEW</span><h2>Responsible AI foundations</h2><p>A practical sequence for understanding intended use, evidence, privacy, human oversight, validation, and monitoring.</p><div className="course-page__meta"><strong>4</strong><span>modules</span><strong>1</strong><span>applied scenario</span><strong>1</strong><span>verification checklist</span></div></div>
      <div className="course-page__modules">{[
        ["01", "Define the public-health purpose", "Separate the real need from assumptions about the technology."],
        ["02", "Evaluate evidence and data authority", "Confirm sources, quality, consent, access, and community governance."],
        ["03", "Design human oversight", "Assign review, escalation, stopping conditions, and final accountability."],
        ["04", "Validate and monitor", "Test performance, fairness, accessibility, drift, and unintended impacts."],
      ].map(([number, title, body], index) => <article key={title}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div>{index === 0 ? <CheckCircle2 size={20} color="#7fd4a8" /> : <i />}</article>)}</div>
    </section>
  );
}
