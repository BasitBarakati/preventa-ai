import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import GlowingButton from "./ui/GlowingButton";

export default function AuthPanel({ create }: { create: boolean }) {
  return (
    <section className="glass-card auth-page">
      <div className="auth-page__trust"><ShieldCheck size={28} /><h2>Secure access is invitation-based.</h2><p>Organization, role, consent, privacy, and data-region settings are configured before accounts are activated.</p><ul><li>Role-based permissions</li><li>Secure session management</li><li>Audit logging</li><li>Accessible onboarding support</li></ul></div>
      <div className="auth-page__form"><LockKeyhole size={24} /><h2>{create ? "Request an account" : "Sign in"}</h2><p>{create ? "Tell us about your intended use through the early-access form." : "Public sign-in is not active in this preview."}</p><div className="lux-field"><label htmlFor="auth-email">Work email</label><input id="auth-email" type="email" autoComplete="email" disabled placeholder="name@organization.ca" /><small>Authentication controls will be enabled in the secure workspace.</small></div><GlowingButton disabled>{create ? "Create account" : "Continue securely"}</GlowingButton><Link href="/contact">{create ? "Request early access instead" : "Need access? Contact the team"}</Link></div>
    </section>
  );
}
