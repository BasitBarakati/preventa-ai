"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
const getReducedMotionSnapshot = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getReducedMotionServerSnapshot = () => false;

/** Central reduced-motion check — subscribes to the media query via
 *  useSyncExternalStore rather than effect+setState, so there's no
 *  extra render pass and no SSR/client mismatch. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

/** Scroll-triggered rise + fade. Content is visible by default — GSAP only
 *  animates *from* a hidden state, so reduced-motion users lose nothing. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 34,
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "li" | "figure" | "span";
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      el,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);
  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}

/** Animated integer count-up when scrolled into view. */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: to,
      duration,
      ease: "power2.out",
      onUpdate: () => setVal(Math.round(obj.n)),
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, duration, reduced]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {reduced ? to : val}
      {suffix}
    </span>
  );
}

const GLYPHS = "ΦΣΩΔΞΠφrones·—+×01";

/** Scramble-decode text effect for eyebrows and data labels. */
export function Scramble({
  text,
  className,
  speed = 28,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || done.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let raf = 0;
    let last = 0;
    const step = (t: number) => {
      if (t - last >= speed) {
        last = t;
        frame += 1;
        const settled = Math.floor(frame / 2.2);
        setOut(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " ") return " ";
              if (i < settled) return ch;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join(""),
        );
        if (settled >= text.length) {
          done.current = true;
          setOut(text);
          return;
        }
      }
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          raf = requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, speed]);
  return (
    <span ref={ref} className={className} aria-label={text}>
      {out}
    </span>
  );
}

/** Word-by-word cinematic reveal — each word rises out of its own mask. */
export function SplitWords({
  text,
  className = "",
  delay = 0,
  wordClass = "",
}: {
  text: string;
  className?: string;
  delay?: number;
  wordClass?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      el.querySelectorAll("[data-w]"),
      { yPercent: 118 },
      {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.05,
        delay,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);
  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="mask-line mr-[0.28em] last:mr-0">
          <span data-w className={`inline-block will-change-transform ${wordClass}`}>
            {w}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Scroll-scrubbed parallax drift. `speed` −0.2 (slower) … 0.2 (faster). */
export function Parallax({
  children,
  speed = 0.1,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      el,
      { yPercent: -speed * 60 },
      {
        yPercent: speed * 60,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);
  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/** Magnetic pull — the element drifts toward the cursor inside a proximity
 *  field and springs back on exit. Luxury-site signature interaction. */
export function useMagnetic<T extends HTMLElement>(strength = 0.32) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const RADIUS = 110;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      cancelAnimationFrame(raf);
      if (dist < RADIUS) {
        const pull = 1 - dist / RADIUS;
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate(${dx * strength * pull}px, ${dy * strength * pull}px)`;
        });
      } else {
        raf = requestAnimationFrame(() => {
          el.style.transform = "translate(0px, 0px)";
        });
      }
    };
    const onLeave = () => {
      el.style.transition = "transform .5s cubic-bezier(.2,.8,.2,1)";
      el.style.transform = "translate(0px, 0px)";
      setTimeout(() => (el.style.transition = ""), 520);
    };
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return ref;
}

/** Section header — mono eyebrow, line-masked Fraunces title, body copy. */
export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  tone = "teal",
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  tone?: "teal" | "amber" | "sage" | "terra";
}) {
  const toneClass = {
    teal: "text-teal",
    amber: "text-amber",
    sage: "text-sage",
    terra: "text-terra",
  }[tone];
  const barClass = {
    teal: "bg-teal",
    amber: "bg-amber",
    sage: "bg-sage",
    terra: "bg-terra",
  }[tone];
  const titleRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      el,
      { yPercent: 115 },
      {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <Reveal
        className={`flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className={`h-px w-8 ${barClass}`} aria-hidden="true" />
        <span
          className={`font-mono text-[11px] font-medium uppercase tracking-[0.28em] ${toneClass}`}
        >
          <Scramble text={eyebrow} />
        </span>
      </Reveal>
      <h2 className="mask-line mt-4">
        <span
          ref={titleRef}
          className="block font-display text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.06] font-semibold tracking-tight text-ocean"
        >
          {title}
        </span>
      </h2>
      {copy ? (
        <Reveal
          delay={0.15}
          className={`mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ink/70 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {copy}
        </Reveal>
      ) : null}
    </div>
  );
}
