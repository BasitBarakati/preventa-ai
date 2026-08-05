import { BookOpen, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ResearchPreview() {
  return (
    <section className="glass-card" aria-label="Research workspace interface preview">
      <div className="research-page-header">
        <div><BookOpen size={20} /> Evidence synthesis workspace</div>
        <span>Preview · synthetic project</span>
      </div>
      <div className="research-page">
        <aside className="research-page__nav"><p>WORKFLOW</p>{["Protocol", "Search", "Screen", "Extract", "Synthesize", "Verify"].map((item, index) => <span className={index < 3 ? "is-active" : ""} key={item}><i>{index < 2 ? <CheckCircle2 size={13} /> : index + 1}</i>{item}</span>)}</aside>
        <div className="research-page__main">
          <div className="research-page__project"><div><small>DEVELOPMENT PROJECT</small><h3>Community-centred AI implementation</h3></div><span><ShieldCheck size={16} /> Human verification required</span></div>
          <div className="research-page__stats"><div><strong>Protocol</strong><span>Eligibility criteria documented</span></div><div><strong>Sources</strong><span>Primary databases identified</span></div><div><strong>Audit trail</strong><span>Decision log enabled</span></div></div>
          <div className="research-page__table"><div className="research-page__table-head"><span>Candidate record</span><span>Decision</span><span>Reason</span></div>{[
            ["Implementation framework for public health AI", "Include", "Matches population and intervention"],
            ["Clinical diagnostic model performance", "Exclude", "Outside intended public-health scope"],
            ["Community governance for health data", "Review", "Requires second reviewer"],
          ].map((row) => <div key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div>
          <p className="research-page__note">Illustrative records only. No literature database, model, or automated screening service is connected.</p>
        </div>
      </div>
    </section>
  );
}
