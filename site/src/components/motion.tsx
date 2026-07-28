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

/** Scroll-triggered 3D flip-up — card tilts in from rotateX(90deg) rather
 *  than a plain fade. Same reduced-motion guarantee as Reveal: content is
 *  visible by default, GSAP only animates *from* the hidden state. */
export function FlipReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.style.transformOrigin = "50% 100%";
    const tween = gsap.fromTo(
      el,
      { rotateX: 82, y: 26, opacity: 0 },
      {
        rotateX: 0,
        y: 0,
        opacity: 1,
        duration: 0.85,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);
  return (
    <div className={className} style={{ perspective: 1200 }}>
      <div ref={ref} className="h-full">
        {children}
      </div>
    </div>
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
    <span ref={ref} className={`inline-flex overflow-hidden ${className ?? ""}`}>
      {prefix}
      <span key={reduced ? "final" : val} className="count-roll inline-block tabular-nums">
        {reduced ? to : val}
      </span>
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

/** 3D tilt card — cursor-coupled rotation with a travelling glare.
 *  Luxury-site signature interaction, shared across card grids. */
export function TiltCard({
  children,
  className = "",
  glow = "",
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-6px)`;
    el.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden transition-[box-shadow] duration-300 will-change-transform ${glow} ${className}`}
      style={{ transformStyle: "preserve-3d", transition: "transform .25s ease-out, box-shadow .3s ease" }}
    >
      {/* travelling glare */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(22rem 22rem at var(--gx,50%) var(--gy,50%), rgba(31,138,138,0.10), transparent 60%)",
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

/** Ambient drifting gradient blobs — a quiet, editorial-grade backdrop
 *  layer for sections that want depth without competing with content. */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <span
        className="aurora-blob absolute -left-[10%] top-[-15%] h-[55%] w-[55%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(31,138,138,0.16), transparent 70%)" }}
      />
      <span
        className="aurora-blob absolute right-[-12%] top-[18%] h-[50%] w-[45%] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(232,168,124,0.15), transparent 70%)",
          animationDelay: "-8s",
        }}
      />
      <span
        className="aurora-blob absolute bottom-[-18%] left-[22%] h-[48%] w-[48%] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(127,176,105,0.12), transparent 70%)",
          animationDelay: "-16s",
        }}
      />
    </div>
  );
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
    amber: "text-amber-ink",
    sage: "text-sage",
    terra: "text-terra-ink",
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
      <h2 className="mask-line mt-5">
        <span
          ref={titleRef}
          className="block font-display text-[clamp(2.15rem,5vw,3.9rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-ocean"
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
