import Logo from "@/components/Logo";

export default function Loading() {
  return <main className="status-page status-page--loading" aria-live="polite" aria-busy="true"><Logo variant="symbol" /><p>PREVENTA AI</p><span>Loading the requested workspace…</span></main>;
}
