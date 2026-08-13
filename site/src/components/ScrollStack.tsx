"use client";

import { useEffect } from "react";

// Unlike PipelineJourney's pinned WebGL flight, this effect is cheap enough
// (transform/opacity only, no blur, no canvas) to run on touch and small
// viewports too — the user explicitly wants the page-stacking read on
// mobile. The only thing that still opts a visitor out is an actual
// accessibility preference.
function motionIsAllowed() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Drives the "book" scroll effect: each .stack-frame > .lux-section is a
 * page. Two scrubbed tweens run on every section, both fully reversible
 * (GSAP scrub ties directly to scroll position, so scrolling up plays them
 * backward exactly as scrolling down plays them forward — nothing here is
 * a one-shot "on enter" animation):
 *
 *  1. Entrance — as the section's frame reaches the pinned position, it
 *     settles in: slides up slightly, scales up to full size, fades in.
 *  2. Recede — once the *next* section starts arriving, this one eases to
 *     a very slightly smaller scale and a light dim (opacity never drops
 *     below .92) so it visibly cedes the foreground instead of just being
 *     instantly replaced. The floor is deliberately high — enough to read
 *     as "this page is now underneath," never so low it reads as hidden or
 *     illegible.
 *
 * Both tweens are scale/y/opacity only — no filter: blur(), which forces an
 * expensive repaint on every scrubbed frame and is the single biggest thing
 * that can make a scroll-linked effect feel laggy rather than smooth. A
 * small rotate() was tried here once to sell "sliding underneath" harder —
 * reverted after a screenshot mid-scrub showed it read as a broken,
 * off-center, crooked card rather than an elegant page-turn. A scale/opacity
 * dip captured mid-transition still reads as "settling into place"; a
 * rotated one reads as "wrong," so don't reintroduce rotate here.
 *
 * GSAP ScrollTrigger drives this directly rather than CSS
 * animation-timeline: view(), which isn't supported in every browser this
 * site needs to work in.
 *
 * Setup is deferred briefly past mount via setTimeout rather than
 * requestAnimationFrame: right at hydration the DOM can be in a transient
 * state (server-rendered nodes briefly coexisting with client ones) where a
 * naive querySelectorAll can find stale duplicates that get removed a moment
 * later, silently detaching the ScrollTriggers built against them — waiting
 * for the DOM to settle first avoids that race. setTimeout (not rAF) is used
 * for the wait because rAF is throttled or fully paused on a backgrounded
 * tab, and there's no reason this setup should depend on the page currently
 * being the foreground tab.
 *
 * Renders nothing — it only wires up ScrollTriggers against DOM nodes that
 * HomePage already rendered (.stack-frame / .lux-section), then tears them
 * down on unmount.
 */
export default function ScrollStack() {
  useEffect(() => {
    if (!motionIsAllowed()) return;

    let cancelled = false;
    let scrollTriggers: Array<{ kill: () => void }> = [];

    const timer = window.setTimeout(() => {
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
        if (cancelled) return;
        const gsap = gsapModule.default;
        const { ScrollTrigger } = triggerModule;
        gsap.registerPlugin(ScrollTrigger);

        const frames = Array.from(document.querySelectorAll<HTMLElement>(".stack-frame")).filter(
          (frame) => frame.isConnected
        );
        const entranceSpan = Math.max(340, Math.round(window.innerHeight * 0.62));
        const recedeSpan = Math.max(280, Math.round(window.innerHeight * 0.5));

        frames.forEach((frame, index) => {
          const section = frame.querySelector<HTMLElement>(".lux-section");
          if (!section) return;
          gsap.set(section, { transformOrigin: "50% 0%", willChange: "transform, opacity" });

          const entrance = gsap.fromTo(
            section,
            { scale: 0.93, y: 34, opacity: 0.82 },
            { scale: 1, y: 0, opacity: 1, ease: "none" }
          );
          const entranceTrigger = ScrollTrigger.create({
            trigger: frame,
            start: "top top",
            end: `+=${entranceSpan}`,
            scrub: 0.55,
            animation: entrance,
          });
          scrollTriggers.push(entranceTrigger);

          const next = frames[index + 1];
          if (next) {
            const recede = gsap.to(section, { scale: 0.97, opacity: 0.92, ease: "none" });
            const recedeTrigger = ScrollTrigger.create({
              trigger: next,
              start: "top bottom",
              end: `+=${recedeSpan}`,
              scrub: 0.55,
              animation: recede,
            });
            scrollTriggers.push(recedeTrigger);
          }
        });

        ScrollTrigger.refresh();
      });
    }, 60);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      scrollTriggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
