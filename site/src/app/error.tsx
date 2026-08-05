"use client";

import Link from "next/link";
import Logo from "@/components/Logo";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main id="main-content" className="status-page"><Logo variant="symbol" /><p>PREVENTA AI · RECOVERY</p><h1>We could not load this page.</h1><span>No information has been submitted. Try again or return to the platform.</span><div><button type="button" className="button" onClick={reset}>Try again</button><Link href="/" className="button button--secondary">Return home</Link></div></main>;
}
