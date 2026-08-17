"use client";

import dynamic from "next/dynamic";

// HomePage.tsx is a Server Component, which can't call next/dynamic(ssr:false)
// itself — this one-line client wrapper is what actually code-splits
// EcosystemScene into its own chunk, keeping the Three.js/R3F/drei bundle
// out of the page's initial JS entirely (it's already safe to skip SSR: the
// component never touches the DOM/WebGL until its own client-side `ready`
// state flips true). Imported from the shared Scenes3D barrel (not
// "./EcosystemScene" directly) so this chunk and the preloader's chunk
// (see Atmosphere.tsx) resolve to the same import() target and the
// bundler emits one shared three.js/r3f chunk instead of two.
const EcosystemScene = dynamic(() => import("./Scenes3D").then((m) => m.EcosystemScene), { ssr: false });

export default function EcosystemSceneLoader({ className }: { className?: string }) {
  return <EcosystemScene className={className} />;
}
