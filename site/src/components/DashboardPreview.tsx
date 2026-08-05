import { BarChart3, CheckCircle2, ShieldCheck } from "lucide-react";

const rows = [
  ["Wellbeing domains reviewed", "4 of 6", "In progress"],
  ["Evidence sources attached", "12", "Review required"],
  ["Action items assigned", "3", "Draft"],
] as const;

export default function DashboardPreview() {
  return (
    <section className="glass-card dashboard-page" aria-label="Accessible dashboard interface preview">
      <div className="dashboard-page__rail" aria-hidden="true"><ShieldCheck size={22} color="#4de2cf" /><i /><i /><i /><i /><i /></div>
      <div className="dashboard-page__main">
        <div className="dashboard-page__heading"><div><small>INTERFACE PREVIEW</small><h2>Public health action dashboard</h2></div><span><CheckCircle2 size={16} /> Review status visible</span></div>
        <div className="dashboard-page__cards"><div><span>Assessment stage</span><strong>Understand</strong><small>4 domains reviewed</small></div><div><span>Evidence status</span><strong>12 sources</strong><small>3 need verification</small></div><div><span>Action planning</span><strong>Draft</strong><small>Owner review pending</small></div></div>
        <div className="dashboard-page__visuals">
          <div className="dashboard-page__bars" role="img" aria-label="Sample domain readiness values: movement 78, sleep 62, nutrition 71, coping 54.">
            <h3><BarChart3 size={18} /> Domain readiness <span>Sample data</span></h3>
            {[78, 62, 71, 54].map((value, index) => <div key={value}><span>{["Movement", "Sleep", "Nutrition", "Coping"][index]}</span><i><b style={{ width: `${value}%` }} /></i><strong>{value}</strong></div>)}
          </div>
          <div className="dashboard-page__actions"><h3>Human review queue</h3>{["Confirm local context", "Verify three evidence sources", "Approve next-step language"].map((item, index) => <div key={item}><span>{index + 1}</span><p>{item}<small>{index === 0 ? "Community lead" : index === 1 ? "Evidence reviewer" : "Program owner"}</small></p></div>)}</div>
        </div>
        <table className="dashboard-page__table"><caption>Sample dashboard data table</caption><thead><tr><th>Measure</th><th>Value</th><th>Status</th></tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table>
        <p className="research-page__note">Development-only sample data. This preview does not contain personal health information or measured platform outcomes.</p>
      </div>
    </section>
  );
}
