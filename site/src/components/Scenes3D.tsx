/* Both 3D scenes pull in the same heavy dependency graph
   (@react-three/fiber, @react-three/drei, three). Re-exporting them from
   one module gives their two dynamic() call sites the same import()
   target, so the bundler emits one shared chunk instead of two
   near-duplicate ~950KB copies — the preloader's chunk and the
   ecosystem backdrop's chunk used to ship the whole three.js graph
   twice. */
export { default as EcosystemScene } from "./EcosystemScene";
export { default as LuxuryEmblemScene } from "./LuxuryEmblemScene";
