"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/site-content";
import { ArrowRight, BarChart3, CheckCircle2, ShieldCheck } from "lucide-react";

const previewRows = [
  ["Evidence quality", "Reviewed", 86],
  ["Community context", "Needs review", 64],
  ["Implementation readiness", "In progress", 72],
] as const;

export default function ProductPreview() {
  const [active, setActive] = useState(0);
  const [title, href, description] = products[active];

  return (
    <div className="product-page">
      <div className="product-page__tabs" role="tablist" aria-label="Product previews">
        {products.map(([label], index) => (
          <button
            key={label}
            id={`product-tab-${index}`}
            role="tab"
            aria-selected={active === index}
            aria-controls="product-panel"
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>{label}
          </button>
        ))}
      </div>

      <div id="product-panel" role="tabpanel" aria-labelledby={`product-tab-${active}`} className="product-page__panel">
        <div className="product-page__window">
          <div className="product-page__window-bar"><span /><span /><span /><strong>PREVENTA AI · INTERFACE PREVIEW</strong></div>
          <div className="product-page__window-content">
            <aside aria-hidden="true">
              <div className="product-page__mark"><ShieldCheck size={20} /></div>
              <i /><i /><i /><i />
            </aside>
            <div className="product-page__main">
              <div className="product-page__heading">
                <div><small>WORKSPACE</small><h3>{title}</h3></div>
                <span><CheckCircle2 size={16} /> Human review on</span>
              </div>
              <div className="product-page__metrics">
                <div><small>Current stage</small><strong>Understand</strong><span>Evidence organized</span></div>
                <div><small>Sources</small><strong>Visible</strong><span>Citations attached</span></div>
                <div><small>Next review</small><strong>Required</strong><span>Before export</span></div>
              </div>
              <div className="product-page__chart" aria-label="Sample readiness overview. Evidence quality 86 percent, community context 64 percent, implementation readiness 72 percent.">
                <div className="product-page__chart-title"><BarChart3 size={18} /> Explainable readiness overview <span>Sample data</span></div>
                {previewRows.map(([label, state, value]) => (
                  <div className="product-page__chart-row" key={label}>
                    <span>{label}</span><div><i style={{ width: `${value}%` }} /></div><b>{state}</b>
                  </div>
                ))}
              </div>
              <details className="product-page__sr-table">
                <summary>View sample data as a table</summary>
                <table><thead><tr><th>Measure</th><th>Status</th><th>Sample value</th></tr></thead><tbody>{previewRows.map(([label, state, value]) => <tr key={label}><td>{label}</td><td>{state}</td><td>{value}%</td></tr>)}</tbody></table>
              </details>
            </div>
          </div>
        </div>
        <div className="product-page__copy">
          <p>{description}</p>
          <Link href={href} prefetch={false}>Explore this experience <ArrowRight size={18} /></Link>
          <small>Illustrative interface using development-only sample data. No personal health information.</small>
        </div>
      </div>
    </div>
  );
}
