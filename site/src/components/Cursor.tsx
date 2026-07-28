"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label[for], canvas, [data-cursor='expand']";

/**
 * Luxury cursor — an ocean dot with a teal trailing ring. The ring lerps
 * behind the pointer, swells over interactive targets, and contracts on
 * press. Over elements tagged `data-cursor-text="…"` (the hero orbit stage,
 * the Acronym rail) it morphs into a filled label blob instead, naming the
 * gesture ("Explore", "Scroll"). Enabled only for fine pointers with motion
 * allowed; the native cursor is hidden via `html[data-cursor]`.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    if (!dot || !ring || !text) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.setAttribute("data-cursor", "");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let scale = 1;
    let targetScale = 1;
    let pressed = false;
    let visible = false;
    let raf = 0;
    let label = "";

    const show = () => {
      if (visible) return;
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      show();
      const el = e.target as HTMLElement;
      const labelHost = el.closest<HTMLElement>("[data-cursor-text]");
      const nextLabel = labelHost?.dataset.cursorText ?? "";
      if (nextLabel !== label) {
        label = nextLabel;
        text.textContent = label;
        text.style.opacity = label ? "1" : "0";
        ring.style.backgroundColor = label ? "color-mix(in srgb, var(--color-teal) 16%, transparent)" : "transparent";
        dot.style.opacity = label ? "0" : visible ? "1" : "0";
      }
      targetScale = label ? 2.7 : el.closest(INTERACTIVE) ? 1.9 : 1;
    };
    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };
    const onLeaveDoc = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      text.style.opacity = "0";
    };

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      scale += ((pressed ? 0.8 : targetScale) - scale) * 0.2;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      text.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
      document.documentElement.removeAttribute("data-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[110] h-1.5 w-1.5 rounded-full bg-ocean opacity-0 mix-blend-multiply transition-opacity duration-300"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[110] h-9 w-9 rounded-full border border-teal/70 opacity-0 transition-[opacity,background-color] duration-300 will-change-transform"
        aria-hidden="true"
      />
      <span
        ref={textRef}
        className="pointer-events-none fixed left-0 top-0 z-[111] font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ocean opacity-0 transition-opacity duration-300 will-change-transform"
        aria-hidden="true"
      />
    </>
  );
}
