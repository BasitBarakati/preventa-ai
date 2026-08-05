"use client";

import { type ComponentType, useEffect, useRef, useState } from "react";

export default function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [Scene, setScene] = useState<ComponentType | null>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanupMotion: (() => void) | undefined;

    const activate = async () => {
      if (disposed || scene.dataset.activated === "true") return;
      scene.dataset.activated = "true";

      const [sceneModule, gsapModule, scrollTriggerModule] = await Promise.all([
        import("./IntelligenceScene"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      setScene(() => sceneModule.default);
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const tween = gsap.to(scene, {
        yPercent: 7,
        scale: 0.965,
        opacity: 0.78,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.45,
        },
      });
      cleanupMotion = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    };

    const activationEvents: (keyof WindowEventMap)[] = ["pointermove", "touchstart", "keydown", "scroll"];
    activationEvents.forEach((event) => window.addEventListener(event, activate, { once: true, passive: true }));

    return () => {
      disposed = true;
      activationEvents.forEach((event) => window.removeEventListener(event, activate));
      cleanupMotion?.();
    };
  }, []);

  return (
    <div ref={sceneRef} className="hero-scene-canvas">
      {Scene ? <Scene /> : <div className="scene-fallback" aria-hidden="true"><span /><span /><span /><span /><span /></div>}
    </div>
  );
}
