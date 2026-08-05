import Link from "next/link";
import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import Logo from "./Logo";

const groups = [
  { title: "Platform", links: [["Situation assessment", "/platform/situation-assessment"], ["Health & AI implementation", "/platform/health-and-ai-implementation"], ["Indigenous health", "/indigenous-health"], ["Research", "/research"], ["Courses", "/courses"]] },
  { title: "Governance", links: [["Governance & ethics", "/governance-and-ethics"], ["AI transparency", "/ai-transparency"], ["Privacy", "/privacy"], ["Accessibility", "/accessibility"], ["Terms", "/terms"]] },
  { title: "Organization", links: [["About Preventa AI", "/about"], ["Partnerships", "/partnerships"], ["Resources & toolkits", "/resources"], ["Contact", "/contact"], ["Sign in", "/sign-in"]] },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-newsletter">
        <div><p className="lux-eyebrow">FIELD NOTES</p><h2>Responsible public-health AI, in your inbox.</h2><p>Occasional implementation notes, research methods, learning resources, and governance updates. Newsletter infrastructure is not yet connected.</p></div>
        <form><label htmlFor="newsletter-email">Work email</label><div><Mail size={18} /><input id="newsletter-email" type="email" placeholder="name@organization.ca" disabled /><button type="button" disabled>Coming soon</button></div><small>No subscription data is collected in this public preview.</small></form>
      </div>
      <div className="container site-footer__top">
        <div className="site-footer__brand"><Link href="/" prefetch={false} aria-label="PREVENTA AI home" className="footer-logo"><Logo variant="symbol" /></Link><strong>PREVENTA AI</strong><p>From Public Health Intelligence to Practical Action.</p><span><ShieldCheck size={15} /> Responsible AI · Human oversight · Privacy by design</span></div>
        <div className="site-footer__links">{groups.map((group) => <div key={group.title}><h2>{group.title}</h2>{group.links.map(([label, href]) => <Link key={href} href={href} prefetch={false}>{label}<ArrowUpRight size={12} /></Link>)}</div>)}</div>
      </div>
      <div className="container site-footer__bottom"><p>© {new Date().getFullYear()} PREVENTA AI. All rights reserved.</p><p>AI-enabled public health transformation platform · Canada</p></div>
    </footer>
  );
}
