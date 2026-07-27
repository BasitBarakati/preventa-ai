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
 * Seven Fires — an abstract, non-figurative visual: seven ember-lights
 * set in a circle along a drawn path, with sparks drifting upward and a
 * slow orbiting camera. Deliberately geometric (spheres, light, a ring) —
 * no pictographic or ceremonial imagery — so the mark stays respectful
 * while still carrying the "seven fires along one path" idea.
 */
export default function SevenFiresGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    /** The actual scene build — deferred (see below) so it never competes
     *  with the initial page paint. */
    const setup = () => {
      if (cancelled) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(0, 0.6, 6.4);

      const group = new THREE.Group();
      scene.add(group);

      const embers = ["#F0973C", "#E8A87C", "#C38D6B", "#7FB069", "#1F8A8A", "#0B3D5F", "#F0973C"];

      /* — the path: a drawn ring the seven fires sit on — */
      const ringPts: THREE.Vector3[] = [];
      const RING_R = 2.05;
      for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2;
        ringPts.push(new THREE.Vector3(Math.cos(a) * RING_R, 0, Math.sin(a) * RING_R));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
      const ringMat = new THREE.LineBasicMaterial({ color: "#E8A87C", transparent: true, opacity: 0.22 });
      group.add(new THREE.Line(ringGeo, ringMat));

      /* — seven fires — */
      const fireTex = embers.map((c) => glowTexture(`${c}f2`, `${c}44`));
      const fires: THREE.Sprite[] = [];
      const coreDots: THREE.Mesh[] = [];
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(a) * RING_R;
        const z = Math.sin(a) * RING_R;

        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: fireTex[i],
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            opacity: 0.85,
          }),
        );
        sprite.position.set(x, 0, z);
        sprite.scale.set(0.85, 0.85, 1);
        group.add(sprite);
        fires.push(sprite);

        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.052, 12, 12),
          new THREE.MeshBasicMaterial({ color: embers[i] }),
        );
        dot.position.set(x, 0, z);
        group.add(dot);
        coreDots.push(dot);
      }

      /* — central hearth glow — */
      const hearthTex = glowTexture("rgba(255,214,170,0.85)", "rgba(240,151,60,0.25)");
      const hearth = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: hearthTex,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          opacity: 0.5,
        }),
      );
      hearth.scale.set(2.6, 2.6, 1);
      group.add(hearth);

      /* — drifting sparks rising off the path — */
      const SPARKS = 140;
      const sparkGeo = new THREE.BufferGeometry();
      const sparkPos = new Float32Array(SPARKS * 3);
      const sparkSpeed = new Float32Array(SPARKS);
      const sparkBase = new Float32Array(SPARKS * 2); // x,z anchor near the ring
      for (let i = 0; i < SPARKS; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = RING_R * (0.4 + Math.random() * 0.9);
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;
        sparkBase[i * 2] = x;
        sparkBase[i * 2 + 1] = z;
        sparkPos[i * 3] = x;
        sparkPos[i * 3 + 1] = Math.random() * 2.4 - 0.6;
        sparkPos[i * 3 + 2] = z;
        sparkSpeed[i] = 0.15 + Math.random() * 0.25;
      }
      sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
      const sparkTex = glowTexture("rgba(255,205,150,0.9)", "rgba(232,168,124,0.3)");
      const sparkMat = new THREE.PointsMaterial({
        size: 0.05,
        map: sparkTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.7,
        color: "#E8A87C",
      });
      const sparks = new THREE.Points(sparkGeo, sparkMat);
      group.add(sparks);

      group.rotation.x = 0.32;

      /* — pointer coupling (throttled) — */
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
      const tick = (t: number) => {
        if (!running) return;
        eased.x += (target.x - eased.x) * 0.045;
        eased.y += (target.y - eased.y) * 0.045;
        group.rotation.y += 0.0018;

        fires.forEach((s, i) => {
          const flicker = 0.85 + Math.sin(t * 0.003 + i * 1.7) * 0.14;
          s.scale.setScalar(0.85 * flicker);
          (s.material as THREE.SpriteMaterial).opacity = 0.7 + Math.sin(t * 0.0025 + i * 2.1) * 0.2;
        });
        (hearth.material as THREE.SpriteMaterial).opacity = 0.42 + Math.sin(t * 0.0011) * 0.12;

        const posAttr = sparkGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < SPARKS; i++) {
          let y = posAttr.getY(i) + sparkSpeed[i] * 0.01;
          if (y > 2.2) y = -0.6;
          posAttr.setXYZ(i, sparkBase[i * 2], y, sparkBase[i * 2 + 1]);
        }
        posAttr.needsUpdate = true;

        camera.position.x += (eased.x * 0.7 - camera.position.x) * 0.05;
        camera.position.y += (0.6 - eased.y * 0.4 - camera.position.y) * 0.05;
        camera.lookAt(0, 0.1, 0);
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };

      if (reduced) {
        renderer.render(scene, camera);
      } else {
        startLoop();
      }

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
        ringGeo.dispose();
        ringMat.dispose();
        fireTex.forEach((t) => t.dispose());
        fires.forEach((s) => (s.material as THREE.SpriteMaterial).dispose());
        coreDots.forEach((d) => {
          d.geometry.dispose();
          (d.material as THREE.Material).dispose();
        });
        hearthTex.dispose();
        (hearth.material as THREE.SpriteMaterial).dispose();
        sparkGeo.dispose();
        sparkMat.dispose();
        sparkTex.dispose();
        renderer.dispose();
      };
    };

    /* Defer the scene construction (see NeuralGlobe.tsx for the measured
       rationale — a single synchronous WebGL scene build on mount produced
       a multi-second main-thread task that tanked FCP/LCP/TBT). */
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
