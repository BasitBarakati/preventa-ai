"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The site's motion layer.
 *
 * Everything here is progressive enhancement: the page is fully readable and
 * usable with JavaScript disabled, with `prefers-reduced-motion` set, or if
 * the dynamic GSAP/Lenis import never resolves. Nothing below gates content
 * visibility on an animation completing — a lesson this project already
 * learned the hard way when a route transition was tied to a GSAP onComplete
 * that never fired in a throttled tab.
 *
 * Split-text, magnetic buttons, tilt cards, counters, parallax, and the
 * scroll rail are all driven from one rAF/ScrollTrigger context so they tear
 * down cleanly on route change.
 */
export default function MotionSystem() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    // One cleanup registry for everything. Using a single mutable `destroy`
    // slot here would silently drop the cursor listeners the moment the async
    // GSAP block resolved and reassigned it.
    const cleanups: Array<() => void> = [];
    let pointerFrame = 0;
    let motionTimer = 0;
    let cancelled = false;

    // ── Pointer-follow light (drives the radial spotlight + custom cursor) ──
    const cursor = document.querySelector<HTMLElement>(".lux-cursor");
    const cursorDot = document.querySelector<HTMLElement>(".lux-cursor__dot");
    const cursorTrail1 = document.querySelector<HTMLElement>(".lux-cursor__trail--1");
    const cursorTrail2 = document.querySelector<HTMLElement>(".lux-cursor__trail--2");
    const cursorLabel = document.querySelector<HTMLElement>(".lux-cursor__label");
    let cx = -100, cy = -100, tx = -100, ty = -100;
    let t1x = -100, t1y = -100, t2x = -100, t2y = -100;

    const onPointerMove = (event: PointerEvent) => {
      if (coarse) return;
      tx = event.clientX;
      ty = event.clientY;
      if (reduce) return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--pointer-x", `${tx}px`);
        document.documentElement.style.setProperty("--pointer-y", `${ty}px`);
      });
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Cursor easing loop — separate from ScrollTrigger so it survives even if
    // the dynamic import below fails entirely.
    let cursorLoop = 0;
    if (!reduce && !coarse && cursor && cursorDot) {
      const easeCursor = () => {
        cx += (tx - cx) * 0.16;
        cy += (ty - cy) * 0.16;
        cursor.style.transform = `translate3d(${cx - 13}px, ${cy - 13}px, 0)`;
        cursorDot.style.transform = `translate3d(${tx - 2}px, ${ty - 2}px, 0)`;
        // Trail dots ease slower than the ring/dot above, so they lag
        // behind and read as a comet — two more lerps and two more
        // transform writes in the loop already running, no new rAF.
        t1x += (tx - t1x) * 0.1;
        t1y += (ty - t1y) * 0.1;
        t2x += (tx - t2x) * 0.065;
        t2y += (ty - t2y) * 0.065;
        if (cursorTrail1) cursorTrail1.style.transform = `translate3d(${t1x - 2.5}px, ${t1y - 2.5}px, 0)`;
        if (cursorTrail2) cursorTrail2.style.transform = `translate3d(${t2x - 1.75}px, ${t2y - 1.75}px, 0)`;
        if (cursorLabel) cursorLabel.style.transform = `translate3d(${tx + 20}px, ${ty - 8}px, 0)`;
        cursorLoop = requestAnimationFrame(easeCursor);
      };
      cursorLoop = requestAnimationFrame(easeCursor);

      const over = (event: Event) => {
        const el = event.target as HTMLElement | null;
        if (el?.closest?.("a, button, [role='button'], input, textarea, select, [data-tilt]")) {
          cursor.setAttribute("data-active", "true");
        }
        const labelSource = el?.closest?.("[data-cursor-label]") as HTMLElement | null;
        if (labelSource && cursorLabel) {
          cursorLabel.textContent = labelSource.dataset.cursorLabel ?? "";
          cursorLabel.setAttribute("data-visible", "true");
        }
      };
      const out = (event: Event) => {
        cursor.removeAttribute("data-active");
        const el = event.target as HTMLElement | null;
        if (el?.closest?.("[data-cursor-label]")) cursorLabel?.removeAttribute("data-visible");
      };
      document.addEventListener("pointerover", over, { passive: true });
      document.addEventListener("pointerout", out, { passive: true });
      cleanups.push(() => {
        document.removeEventListener("pointerover", over);
        document.removeEventListener("pointerout", out);
      });
    }

    // ── Program scroll-spy for the 3D backdrop ──
    // Watches whichever .lux-pillar-card (there are 5, homepage-only —
    // this simply finds none and does nothing on other routes) sits in a
    // thin band around the vertical center of the viewport, and dispatches
    // its index so EcosystemScene can light up the matching node. A
    // CustomEvent rather than a shared module import: EcosystemScene.tsx
    // pulls in the entire @react-three/fiber/three dependency graph, and a
    // static import of anything from that file — even a plain object —
    // would drag that whole bundle into this one, the exact duplicate-JS
    // problem EcosystemSceneLoader.tsx was built to avoid. Same
    // decoupling pattern the preloader already uses to signal
    // EcosystemScene (see "preventa:preloader-done").
    const pillarCards = Array.from(document.querySelectorAll<HTMLElement>(".lux-pillar-card"));
    let programObserver: IntersectionObserver | null = null;
    if (pillarCards.length) {
      programObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .map((entry) => pillarCards.indexOf(entry.target as HTMLElement));
          const active = visible.length ? Math.min(...visible) : -1;
          window.dispatchEvent(new CustomEvent("preventa:active-program", { detail: { index: active } }));
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      );
      pillarCards.forEach((card) => programObserver?.observe(card));
      cleanups.push(() => programObserver?.disconnect());
    }

    // ── Scroll progress rail — cheap, no library needed ──
    let railFrame = 0;
    const rail = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      doc.style.setProperty("--scroll-progress", String(progress));
      railFrame = requestAnimationFrame(rail);
    };
    railFrame = requestAnimationFrame(rail);

    if (!reduce) {
      const startMotion = () => {
        motionTimer = window.setTimeout(() => {
          void Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")])
            .then(([lenisModule, gsapModule, triggerModule]) => {
              if (cancelled) return;

              const Lenis = lenisModule.default;
              const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 0.85 });
              let frame = 0;
              const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
              frame = requestAnimationFrame(raf);

              const gsap = gsapModule.default;
              const { ScrollTrigger } = triggerModule;
              gsap.registerPlugin(ScrollTrigger);
              // Lenis drives scrolling, so ScrollTrigger must read position from
              // it rather than from native scroll events (which Lenis suppresses).
              lenis.on("scroll", ScrollTrigger.update);

              const teardown = cleanups;
              teardown.push(() => { cancelAnimationFrame(frame); lenis.destroy(); });

              /**
               * Only animate what is genuinely below the fold.
               *
               * Animating everything unconditionally caused a real failure:
               * open any deep link (/#frameworks), and GSAP would set that
               * section to opacity 0 while ScrollTrigger — reading scroll
               * position through Lenis, which reports 0 after a hash jump —
               * decided the trigger had not been reached. Result: a section
               * sitting in the viewport, permanently invisible.
               *
               * Content already on screen when motion boots is simply shown.
               */
              const belowFold = (element: HTMLElement) =>
                element.getBoundingClientRect().top > window.innerHeight * 0.92;

              const context = gsap.context(() => {
                // ── Split-text heading reveal ──
                gsap.utils.toArray<HTMLElement>("[data-split]").forEach((heading) => {
                  if (heading.dataset.splitDone === "1") return;
                  const source = heading.textContent ?? "";
                  if (!source.trim()) return;
                  heading.dataset.splitDone = "1";
                  // Rebuild as word spans. Keeps the accessible text intact for
                  // screen readers because the words are still real text nodes
                  // in document order — no aria-label duplication needed.
                  heading.replaceChildren(
                    ...source.split(/(\s+)/).map((chunk) => {
                      if (!chunk.trim()) return document.createTextNode(chunk);
                      const span = document.createElement("span");
                      span.className = "split-word";
                      span.textContent = chunk;
                      return span;
                    }),
                  );
                  if (!belowFold(heading)) return;
                  gsap.from(heading.querySelectorAll(".split-word"), {
                    yPercent: 116, opacity: 0, duration: 0.9, ease: "power4.out", stagger: 0.035,
                    scrollTrigger: { trigger: heading, start: "top 87%", once: true },
                  });
                });

                // ── Standard reveal ──
                gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
                  if (!belowFold(element)) return;
                  gsap.fromTo(element, { y: 38, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
                    scrollTrigger: { trigger: element, start: "top 88%", once: true },
                  });
                });

                // ── Diagonal wipe reveal ──
                // A one-shot ("once": true) reveal, deliberately not scrub-
                // linked. ScrollStack's own scale/y/opacity tween on
                // .lux-section is scrub-driven and reversible by design —
                // layering a second, independent scrubbed transform onto
                // that same delicate system is exactly how the rotate()
                // experiment there went wrong (see ScrollStack.tsx). This
                // targets separate elements (section intros) and only ever
                // plays forward once, so there's no scroll-direction or
                // mid-scrub state to get caught looking broken in.
                gsap.utils.toArray<HTMLElement>("[data-wipe]").forEach((element) => {
                  if (!belowFold(element)) return;
                  gsap.fromTo(element,
                    { clipPath: "polygon(0% 100%, 100% 88%, 100% 100%, 0% 100%)", opacity: 0 },
                    {
                      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1,
                      duration: 1.1, ease: "power3.out",
                      scrollTrigger: { trigger: element, start: "top 88%", once: true },
                    });
                });

                // ── Staggered children ──
                gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
                  if (!belowFold(group)) return;
                  gsap.fromTo(Array.from(group.children), { y: 44, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.85, ease: "power3.out", stagger: 0.08,
                    scrollTrigger: { trigger: group, start: "top 86%", once: true },
                  });
                });

                // ── Parallax layers ──
                gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((layer) => {
                  const depth = Number(layer.dataset.parallax) || 0.15;
                  gsap.to(layer, {
                    yPercent: depth * -100, ease: "none",
                    scrollTrigger: { trigger: layer, start: "top bottom", end: "bottom top", scrub: 0.6 },
                  });
                });

                // ── Ink reveal: vision-statement quote fills in as read ──
                // Guarded by belowFold for the same reason as the reveals
                // above: a deep link that lands past this quote must never
                // leave it stuck faint. If it's already in view, the CSS
                // default (100%, fully solid) simply stands.
                const inkQuote = document.querySelector<HTMLElement>(".vision-statement p");
                if (inkQuote && belowFold(inkQuote)) {
                  gsap.fromTo(inkQuote, { "--ink-fill": "0%" }, {
                    "--ink-fill": "100%", ease: "none",
                    scrollTrigger: { trigger: inkQuote, start: "top 82%", end: "bottom 48%", scrub: 0.6 },
                  });
                }

                // ── Animated counters ──
                gsap.utils.toArray<HTMLElement>("[data-count]").forEach((node) => {
                  const target = Number(node.dataset.count) || 0;
                  const suffix = node.dataset.countSuffix ?? "";
                  const box = { value: 0 };
                  gsap.to(box, {
                    value: target, duration: 1.9, ease: "power2.out",
                    scrollTrigger: { trigger: node, start: "top 90%", once: true },
                    onUpdate: () => {
                      node.textContent = `${Math.round(box.value).toLocaleString()}${suffix}`;
                    },
                  });
                });
              });
              teardown.push(() => context.revert());

              // ── Magnetic buttons (outside gsap.context: manual listeners) ──
              document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
                const enter = () => gsap.to(el, { scale: 1.04, duration: 0.3, ease: "power3.out" });
                const move = (event: PointerEvent) => {
                  const rect = el.getBoundingClientRect();
                  const mx = event.clientX - rect.left - rect.width / 2;
                  const my = event.clientY - rect.top - rect.height / 2;
                  gsap.to(el, { x: mx * 0.28, y: my * 0.4, duration: 0.4, ease: "power3.out" });
                };
                const leave = () => gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.45)" });
                el.addEventListener("pointerenter", enter);
                el.addEventListener("pointermove", move);
                el.addEventListener("pointerleave", leave);
                teardown.push(() => {
                  el.removeEventListener("pointerenter", enter);
                  el.removeEventListener("pointermove", move);
                  el.removeEventListener("pointerleave", leave);
                  gsap.set(el, { clearProps: "all" });
                });
              });

              // ── 3D tilt cards ──
              if (!coarse) {
                document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
                  const move = (event: PointerEvent) => {
                    const rect = card.getBoundingClientRect();
                    const px = (event.clientX - rect.left) / rect.width;
                    const py = (event.clientY - rect.top) / rect.height;
                    card.style.setProperty("--tilt-x", `${px * 100}%`);
                    card.style.setProperty("--tilt-y", `${py * 100}%`);
                    gsap.to(card, {
                      rotateY: (px - 0.5) * 11, rotateX: (0.5 - py) * 11,
                      duration: 0.5, ease: "power3.out", transformPerspective: 900,
                    });
                  };
                  const leave = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });
                  card.addEventListener("pointermove", move);
                  card.addEventListener("pointerleave", leave);
                  teardown.push(() => {
                    card.removeEventListener("pointermove", move);
                    card.removeEventListener("pointerleave", leave);
                    gsap.set(card, { clearProps: "all" });
                  });
                });
              }

              // A hash in the URL means the browser already jumped before
              // Lenis existed. Re-issue the jump through Lenis so both agree
              // on position, then recompute every trigger against it.
              if (window.location.hash) {
                const target = document.querySelector(window.location.hash);
                if (target) lenis.scrollTo(target as HTMLElement, { immediate: true });
              }
              ScrollTrigger.refresh();

              // Last-resort safety net. Motion is decoration; content is not.
              // If any tween never ran — a missed trigger, a refresh race, a
              // background tab that suspended rAF — force everything visible
              // rather than leave a reader staring at an empty section.
              const safety = window.setTimeout(() => {
                document.querySelectorAll<HTMLElement>("[data-reveal], [data-wipe], [data-stagger] > *, .split-word")
                  .forEach((element) => {
                    if (Number(getComputedStyle(element).opacity) < 0.99) {
                      gsap.set(element, { opacity: 1, y: 0, yPercent: 0, clipPath: "none" });
                    }
                  });
              }, 4000);
              teardown.push(() => window.clearTimeout(safety));
            })
            .catch(() => { /* motion is enhancement — never break the page */ });
        }, 620);
      };
      if (document.readyState === "complete") startMotion();
      else window.addEventListener("load", startMotion, { once: true });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(motionTimer);
      cleanups.forEach((fn) => { try { fn(); } catch { /* teardown is best-effort */ } });
      cleanups.length = 0;
      cancelAnimationFrame(pointerFrame);
      cancelAnimationFrame(railFrame);
      cancelAnimationFrame(cursorLoop);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [pathname]);

  return null;
}
