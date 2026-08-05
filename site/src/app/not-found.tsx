import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return <main id="main-content" className="status-page"><Logo variant="symbol" /><p>404 · PAGE NOT FOUND</p><h1>This path does not exist.</h1><span>Return to the platform or use the main navigation to continue.</span><Link href="/" className="button">Return home</Link></main>;
}
