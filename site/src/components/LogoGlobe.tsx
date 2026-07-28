"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Soft radial sprite texture — fakes post-processing bloom cheaply. */
function glowTexture(inner: string, outer: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, inner);
  g.addColorStop(0.35, outer);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/** Sample `divisions + 1` points evenly along an SVG path's arc length, in
 *  the path's own local coordinate space. Works on a detached element —
 *  path geometry is pure math, unaffected by DOM layout. */
function samplePath(d: string, divisions: number): [number, number][] {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
  el.setAttribute("d", d);
  const len = el.getTotalLength();
  const pts: [number, number][] = [];
  for (let i = 0; i <= divisions; i++) {
    const p = el.getPointAtLength((i / divisions) * len);
    pts.push([p.x, p.y]);
  }
  return pts;
}

/** Apply an SVG-style `translate(tx ty) rotate(deg) scale(s)` to local points
 *  (matches how the leaf transforms are written in Logo.tsx). */
function applyTransform(
  pts: [number, number][],
  { tx = 0, ty = 0, rotDeg = 0, scale = 1 }: { tx?: number; ty?: number; rotDeg?: number; scale?: number },
): [number, number][] {
  const rad = (rotDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return pts.map(([x, y]) => {
    const sx = x * scale;
    const sy = y * scale;
    return [sx * cos - sy * sin + tx, sx * sin + sy * cos + ty];
  });
}

/** Maps the brandmark's 64×64 viewBox to centered Three.js world units
 *  (matches Logo.tsx's LogoIcon path data exactly). */
const MARK_SCALE = 0.052;
const toXY = ([x, y]: [number, number]): [number, number] => [(x - 32) * MARK_SCALE, (32 - y) * MARK_SCALE];

const PALETTE = {
  navy: "#0B3D5F",
  teal: "#1F8A8A",
  tealLight: "#3FA7B0",
  sage: "#7FB069",
  sageMuted: "#8FAE7A",
  amber: "#F0973C",
};

const LEAF_D = "M0 0C2.6-3.5 7.4-3.5 10 0C7.4 3.5 2.6 3.5 0 0Z";

/**
 * The Phronesis brandmark, rebuilt as a real 3D object — the brain-hemisphere
 * traced in navy tubes (recessed, evidence), the tree-hemisphere in navy
 * branches with sage/teal/amber leaf and node accents (raised, growth),
 * surrounded by a faint wireframe aura and drifting dust. Rotates slowly,
 * breathes, and leans toward the cursor with camera parallax. Single static
 * frame under prefers-reduced-motion.
 */
export default function LogoGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const setup = () => {
      if (cancelled) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0, 6.6);

      const group = new THREE.Group();
      scene.add(group);

      const disposables: { dispose(): void }[] = [];
      const track = <T extends { dispose(): void }>(x: T) => (disposables.push(x), x);

      const markGroup = new THREE.Group();
      group.add(markGroup);

      /* — lighting: key + cool rim + ambient fill, no shadows (cheap) —
         the previous version was fully unlit (points/lines/sprites); real
         geometry needs light to read as dimensional rather than flat. */
      const key = new THREE.DirectionalLight(0xfff4e6, 1.7);
      key.position.set(2.4, 3.2, 4.2);
      group.add(key);
      const rim = new THREE.PointLight(0x8fd8d8, 1.1, 14);
      rim.position.set(-2.6, -1.1, -3.2);
      group.add(rim);
      const ambient = new THREE.AmbientLight(0xffffff, 0.55);
      group.add(ambient);

      const materialCache = new Map<string, THREE.MeshStandardMaterial>();
      const stdMat = (hex: string, metalness = 0.42, roughness = 0.34, emissive?: string, emissiveIntensity = 0.5) => {
        const key = `${hex}|${metalness}|${roughness}|${emissive ?? ""}`;
        let m = materialCache.get(key);
        if (!m) {
          m = new THREE.MeshStandardMaterial({
            color: hex,
            metalness,
            roughness,
            emissive: emissive ?? "#000000",
            emissiveIntensity: emissive ? emissiveIntensity : 0,
          });
          materialCache.set(key, m);
          track(m);
        }
        return m;
      };

      /** A stroke path rebuilt as a tube of constant radius. */
      function addTube(d: string, divisions: number, radius: number, color: string, zOff: number) {
        const local = samplePath(d, divisions);
        const curve = new THREE.CatmullRomCurve3(
          local.map(([x, y]) => {
            const [wx, wy] = toXY([x, y]);
            return new THREE.Vector3(wx, wy, zOff);
          }),
        );
        const geo = track(new THREE.TubeGeometry(curve, Math.max(8, divisions), radius, 8, false));
        markGroup.add(new THREE.Mesh(geo, stdMat(color)));
      }

      /** A closed leaf/petal path, extruded into a thin faceted shape. */
      function addLeaf(transform: { tx: number; ty: number; rotDeg: number; scale: number }, color: string, zOff: number) {
        const local = applyTransform(samplePath(LEAF_D, 20).slice(0, -1), transform);
        const shape = new THREE.Shape(local.map(([x, y]) => new THREE.Vector2(...toXY([x, y]))));
        const geo = track(
          new THREE.ExtrudeGeometry(shape, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }),
        );
        geo.translate(0, 0, -0.07);
        const mesh = new THREE.Mesh(geo, stdMat(color, 0.22, 0.5));
        mesh.position.z = zOff;
        markGroup.add(mesh);
      }

      /** A small decorative node/bud/fruit — a lit sphere, optionally glowing. */
      function addNode(cx: number, cy: number, r: number, color: string, zOff: number, glow = false) {
        const [wx, wy] = toXY([cx, cy]);
        const geo = track(new THREE.SphereGeometry(r * MARK_SCALE, 16, 16));
        const mesh = new THREE.Mesh(geo, stdMat(color, glow ? 0.3 : 0.5, glow ? 0.35 : 0.3, glow ? color : undefined, 0.7));
        mesh.position.set(wx, wy, zOff);
        markGroup.add(mesh);
      }

      /* — central stem, the shared spine — */
      addTube("M32 10.2V50c0 2.7-1.7 4-4.5 5", 28, 0.058, PALETTE.navy, 0);

      /* — brain hemisphere: recedes slightly (evidence, z negative) — */
      addTube(
        "M30.6 13.9C21.8 12.1 13.5 18.7 13.3 27.9c-.1 4.8 2.2 7.8 2.6 11.4.5 5.6 5.4 9.8 11.2 9.6 1.7-.1 3-.5 3.5-.7",
        36,
        0.05,
        PALETTE.navy,
        -0.22,
      );
      addTube("M27.4 20.5c-5.8 1.4-8.6 5.8-7.4 10.4", 22, 0.042, PALETTE.navy, -0.28);
      addTube("M29.1 28.9c-4 1-5.6 4-4.4 7.4", 22, 0.042, PALETTE.navy, -0.3);
      addTube("M19.9 40.5c1.8 3.2 5 4.6 8.2 4", 22, 0.042, PALETTE.navy, -0.26);
      addTube("M27.3 24.4v3.4", 6, 0.036, PALETTE.navy, -0.3);
      addNode(27.3, 21.9, 2.4, PALETTE.navy, -0.32);
      addNode(16.7, 29.3, 3.1, PALETTE.teal, -0.34, true);

      /* — tree hemisphere: protrudes toward camera (growth, z positive) — */
      addTube("M32 24.6c5-1 8.6-3.6 10.6-8.4", 22, 0.046, PALETTE.navy, 0.18);
      addTube("M32 31.6c7.5-1.5 13.4-5 16.9-9", 26, 0.046, PALETTE.navy, 0.28);
      addTube("M32 38.6c6.5-1 11.4-2.5 14.7-5", 22, 0.046, PALETTE.navy, 0.22);
      addTube("M32 44.6c3.4.5 6.4.1 8.9-1.1", 16, 0.04, PALETTE.navy, 0.16);
      addTube("M42.9 15.6l.8-2.6", 6, 0.036, PALETTE.navy, 0.3);
      addNode(44.1, 10.8, 2.7, PALETTE.navy, 0.34);
      addTube("M40.6 43.7l.9 1.7", 6, 0.036, PALETTE.navy, 0.24);
      addNode(42.1, 47.4, 2.6, PALETTE.navy, 0.28);
      addNode(50.9, 20.6, 3, PALETTE.amber, 0.36, true);
      addNode(48.3, 32, 2.7, PALETTE.teal, 0.32, true);
      addNode(51.6, 28.9, 2.1, PALETTE.sageMuted, 0.3);
      addLeaf({ tx: 34.6, ty: 12.4, rotDeg: -28, scale: 0.92 }, PALETTE.sageMuted, 0.3);
      addLeaf({ tx: 44.8, ty: 15.6, rotDeg: 22, scale: 0.86 }, PALETTE.sage, 0.34);
      addLeaf({ tx: 41.2, ty: 25.2, rotDeg: -14, scale: 0.95 }, PALETTE.teal, 0.32);
      addLeaf({ tx: 39.2, ty: 39.4, rotDeg: -6, scale: 0.9 }, PALETTE.tealLight, 0.28);

      /* — faint wireframe aura surrounding the mark (was the abstract core) — */
      const coreGeo = track(new THREE.IcosahedronGeometry(2.15, 1));
      const coreMat = track(
        new THREE.MeshBasicMaterial({ color: new THREE.Color(PALETTE.teal), wireframe: true, transparent: true, opacity: 0.07 }),
      );
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      /* — outer dust shell — */
      const dustN = 90;
      const dustPos: number[] = [];
      for (let i = 0; i < dustN; i++) {
        const v = new THREE.Vector3().randomDirection().multiplyScalar(2.3 + Math.random() * 0.9);
        dustPos.push(v.x, v.y, v.z);
      }
      const dustGeo = track(new THREE.BufferGeometry());
      dustGeo.setAttribute("position", new THREE.Float32BufferAttribute(dustPos, 3));
      const dustMat = track(
        new THREE.PointsMaterial({ size: 0.02, color: new THREE.Color(PALETTE.navy), transparent: true, opacity: 0.35, depthWrite: false }),
      );
      const dust = new THREE.Points(dustGeo, dustMat);
      group.add(dust);

      /* — central bloom sprites behind the mark — */
      const tealTex = track(glowTexture("rgba(94,196,196,0.75)", "rgba(31,138,138,0.28)"));
      const bloom1 = new THREE.Sprite(
        track(new THREE.SpriteMaterial({ map: tealTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.5 })),
      );
      bloom1.scale.set(5.6, 5.6, 1);
      bloom1.position.z = -1.6;
      group.add(bloom1);
      const amberTex = track(glowTexture("rgba(255,205,150,0.6)", "rgba(232,168,124,0.22)"));
      const bloom2 = new THREE.Sprite(
        track(new THREE.SpriteMaterial({ map: amberTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.38 })),
      );
      bloom2.scale.set(2.8, 2.8, 1);
      bloom2.position.set(1.3, -1, -0.8);
      group.add(bloom2);

      group.rotation.y = 0.5;
      group.rotation.x = 0.1;

      /* — pointer coupling + camera parallax (throttled to ~60Hz) — */
      const target = { x: 0, y: 0 };
      const eased = { x: 0, y: 0 };
      let lastMove = 0;
      const onMove = (e: MouseEvent) => {
        const t = performance.now();
        if (t - lastMove < 16) return;
        lastMove = t;
        target.x = e.clientX / window.innerWidth - 0.5;
        target.y = e.clientY / window.innerHeight - 0.5;
      };
      if (!reduced) window.addEventListener("mousemove", onMove, { passive: true });

      /* — responsive canvas — */
      const resize = () => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      let raf = 0;
      let running = false;
      const startLoop = () => {
        if (running || reduced) return;
        running = true;
        raf = requestAnimationFrame(tick);
      };
      const stopLoop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };
      /* cinematic scroll depth — see LogoGlobe's rAF-driven, throttled
         getBoundingClientRect() read: never a scroll listener, since Lenis
         intercepts native scroll events, and reading layout every frame
         would fight GSAP's simultaneous hero entrance writes. */
      let scrollDepth = 0;
      let lastRectTop = 0;
      let rectFrame = 0;
      let lastRender = 0;
      const FRAME_INTERVAL = 1000 / 30; // cap to ~30fps — imperceptible for this ambient motion, halves per-frame cost
      const tick = (t: number) => {
        if (!running) return;
        if (t - lastRender < FRAME_INTERVAL) {
          raf = requestAnimationFrame(tick);
          return;
        }
        lastRender = t;
        if (rectFrame++ % 6 === 0) lastRectTop = host.getBoundingClientRect().top;
        const targetDepth = Math.min(1, Math.max(0, -lastRectTop / window.innerHeight));
        scrollDepth += (targetDepth - scrollDepth) * 0.08;

        eased.x += (target.x - eased.x) * 0.045;
        eased.y += (target.y - eased.y) * 0.045;
        group.rotation.y += 0.0016 + scrollDepth * 0.0032;
        group.rotation.x = 0.1 + eased.y * 0.4;
        group.position.x = eased.x * 0.5;
        group.position.y = -eased.y * 0.35 - scrollDepth * 0.55;
        /* breathing scale pulse, receding into depth on scroll */
        const breathe = 1 + Math.sin(t * 0.0007) * 0.016;
        group.scale.setScalar(breathe * (1 - scrollDepth * 0.22));
        bloom1.material.opacity = (0.44 + Math.sin(t * 0.0009) * 0.1) * (1 - scrollDepth * 0.5);
        dust.rotation.y -= 0.0007;
        core.rotation.y -= 0.0015;
        /* camera parallax for depth + slow dolly-out as the section recedes */
        camera.position.x += (eased.x * 0.55 - camera.position.x) * 0.05;
        camera.position.y += (-eased.y * 0.4 - camera.position.y) * 0.05;
        camera.position.z = 6.6 + scrollDepth * 2.2;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };

      if (reduced) {
        renderer.render(scene, camera);
      } else {
        startLoop();
      }

      /* pause rendering when the hero leaves the viewport or tab hides —
         saves GPU cycles and battery on long pages */
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !document.hidden) startLoop();
          else stopLoop();
        },
        { threshold: 0.05 },
      );
      io.observe(host);
      const onVis = () => {
        if (document.hidden) stopLoop();
        else if (io.takeRecords()[0]?.isIntersecting !== false) startLoop();
      };
      document.addEventListener("visibilitychange", onVis);

      cleanup = () => {
        stopLoop();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        ro.disconnect();
        window.removeEventListener("mousemove", onMove);
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
      };
    };

    /* Defer the actual scene construction — building ~20 tube/extrude/sphere
       meshes and compiling WebGL shaders is real work that has no business
       competing with the browser's first paint of the hero text. Measured
       with Lighthouse on the previous Fibonacci-sphere version: doing this
       synchronously on mount produced a single 5+ second main-thread task
       that tanked FCP/LCP/TBT. requestIdleCallback runs it once the browser
       is done with anything more urgent (falls back to a short timeout on
       Safari). */
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const w = window as IdleWindow;
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (w.requestIdleCallback) {
      idleId = w.requestIdleCallback(setup, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(setup, 200);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      cleanup?.();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
