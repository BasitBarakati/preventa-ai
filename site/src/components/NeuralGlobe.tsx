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
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

/**
 * Neural globe — a Fibonacci-sphere of population nodes bound by teal
 * synapses, wrapped in drifting dust and additive glow (bloom feel).
 * Rotates slowly, breathes, and leans toward the cursor with camera
 * parallax. Single static frame under prefers-reduced-motion.
 */
export default function NeuralGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    /** The actual scene build — deferred (see below) so it never competes
     *  with the initial hero paint. */
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

      /* — palette — */
      const palette = {
        teal: new THREE.Color("#1F8A8A"),
        ocean: new THREE.Color("#0B3D5F"),
        sage: new THREE.Color("#7FB069"),
        amber: new THREE.Color("#E8A87C"),
        amberHot: new THREE.Color("#F0973C"),
      };

      /* — node field (fibonacci sphere) — */
      const N = 260;
      const R = 1.92;
      const golden = Math.PI * (3 - Math.sqrt(5));
      const pts: THREE.Vector3[] = [];
      const pos: number[] = [];
      const col: number[] = [];
      const hotPos: number[] = [];
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const th = golden * i;
        const v = new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r).multiplyScalar(R);
        pts.push(v);
        pos.push(v.x, v.y, v.z);
        const hot = i % 17 === 0;
        const c = hot
          ? palette.amberHot
          : i % 9 === 0
            ? palette.amber
            : i % 5 === 0
              ? palette.sage
              : i % 2 === 0
                ? palette.teal
                : palette.ocean;
        if (hot) hotPos.push(v.x, v.y, v.z);
        col.push(c.r, c.g, c.b);
      }
      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      nodeGeo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
      const nodeMat = new THREE.PointsMaterial({
        size: 0.042,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      });
      group.add(new THREE.Points(nodeGeo, nodeMat));

      /* — additive glow on hot nodes (bloom) — */
      const hotTex = glowTexture("rgba(255,214,170,0.95)", "rgba(240,151,60,0.32)");
      const hotGeo = new THREE.BufferGeometry();
      hotGeo.setAttribute("position", new THREE.Float32BufferAttribute(hotPos, 3));
      const hotMat = new THREE.PointsMaterial({
        size: 0.34,
        map: hotTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.85,
      });
      group.add(new THREE.Points(hotGeo, hotMat));

      /* — synapse links between near neighbours — */
      const linkPos: number[] = [];
      const maxDist = 0.62;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          if (pts[i].distanceTo(pts[j]) < maxDist) {
            linkPos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
          }
        }
      }
      const linkGeo = new THREE.BufferGeometry();
      linkGeo.setAttribute("position", new THREE.Float32BufferAttribute(linkPos, 3));
      const linkMat = new THREE.LineBasicMaterial({
        color: palette.teal,
        transparent: true,
        opacity: 0.16,
      });
      group.add(new THREE.LineSegments(linkGeo, linkMat));

      /* — outer dust shell — */
      const dustN = 140;
      const dustPos: number[] = [];
      for (let i = 0; i < dustN; i++) {
        const v = new THREE.Vector3().randomDirection().multiplyScalar(2.5 + Math.random() * 0.9);
        dustPos.push(v.x, v.y, v.z);
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.Float32BufferAttribute(dustPos, 3));
      const dustMat = new THREE.PointsMaterial({
        size: 0.02,
        color: palette.ocean,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      });
      const dust = new THREE.Points(dustGeo, dustMat);
      group.add(dust);

      /* — faint inner core wireframe — */
      const coreGeo = new THREE.IcosahedronGeometry(1.05, 1);
      const coreMat = new THREE.MeshBasicMaterial({
        color: palette.ocean,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      /* — central bloom sprites behind the globe — */
      const tealTex = glowTexture("rgba(94,196,196,0.75)", "rgba(31,138,138,0.28)");
      const bloom1 = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: tealTex,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          opacity: 0.55,
        }),
      );
      bloom1.scale.set(6.4, 6.4, 1);
      bloom1.position.z = -1.4;
      group.add(bloom1);
      const amberTex = glowTexture("rgba(255,205,150,0.6)", "rgba(232,168,124,0.22)");
      const bloom2 = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: amberTex,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          opacity: 0.4,
        }),
      );
      bloom2.scale.set(3.2, 3.2, 1);
      bloom2.position.set(1.5, -1.1, -0.8);
      group.add(bloom2);

      group.rotation.y = 0.7;
      group.rotation.x = 0.12;

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
      /* cinematic scroll depth — pulls the globe away and lets it drift as
         the hero scrolls past. rAF-driven (never a scroll listener, since
         Lenis intercepts native scroll events) but the layout read itself
         is throttled to ~10Hz — calling getBoundingClientRect() every frame
         forces a synchronous layout flush, which is disastrous while GSAP is
         simultaneously writing the hero's entrance-animation styles. The
         scroll-depth value is already exponentially smoothed below, so a
         throttled read is visually identical to a per-frame one. */
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
        group.rotation.x = 0.12 + eased.y * 0.4;
        group.position.x = eased.x * 0.5;
        group.position.y = -eased.y * 0.35 - scrollDepth * 0.55;
        /* breathing scale + bloom pulse, receding into depth on scroll */
        const breathe = 1 + Math.sin(t * 0.0007) * 0.016;
        group.scale.setScalar(breathe * (1 - scrollDepth * 0.22));
        hotMat.opacity = (0.7 + Math.sin(t * 0.0013) * 0.25) * (1 - scrollDepth * 0.6);
        bloom1.material.opacity = (0.48 + Math.sin(t * 0.0009) * 0.12) * (1 - scrollDepth * 0.5);
        dust.rotation.y -= 0.0007;
        core.rotation.y -= 0.002;
        nodeMat.opacity = (0.8 + Math.sin(t * 0.0011) * 0.15) * (1 - scrollDepth * 0.65);
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
        nodeGeo.dispose();
        nodeMat.dispose();
        hotGeo.dispose();
        hotMat.dispose();
        hotTex.dispose();
        linkGeo.dispose();
        linkMat.dispose();
        dustGeo.dispose();
        dustMat.dispose();
        coreGeo.dispose();
        coreMat.dispose();
        tealTex.dispose();
        amberTex.dispose();
        bloom1.material.dispose();
        bloom2.material.dispose();
        renderer.dispose();
      };
    };

    /* Defer the actual scene construction — building the ~430-node buffer
       geometry, running the ~92k pairwise distance checks for synapse
       links, and compiling WebGL shaders/textures is real work that has
       no business competing with the browser's first paint of the hero
       text. Measured with Lighthouse: doing this synchronously on mount
       produced a single 5+ second main-thread task that tanked FCP/LCP/TBT.
       requestIdleCallback runs it once the browser is done with anything
       more urgent (falls back to a short timeout on Safari). */
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
