"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Faithful port of the uploaded "Preventa AI — Hero" ecosystem scene (light
 * pearl palette: leaf canopy, three glass figures, an ECG pulse, shader-based
 * flow rings, network nodes, data-pathway tubes, orbiting leaf motes, and an
 * ambient particle field) into R3F, mounted as a fixed, always-visible
 * backdrop for the whole site rather than a single hero-only canvas.
 *
 * Trimmed hard for a scene that now has to stay mounted and animating for
 * the entire scroll journey, on every device, rather than one screen once:
 * no real-time shadow maps (the soft-blob shadow sprite is a cheap texture,
 * not a shadow-map pass), `transmission` dropped from every material
 * (clearcoat + opacity + emissive gives a comparable "glass" read without
 * the extra render-to-texture pass transmission forces per object — see
 * [[ecosystem-background-and-preloader]] for the crash this caused
 * elsewhere), no per-frame raycasting (a background layer with
 * pointer-events:none doesn't need hover state), and the "network" layer
 * (nodes/links/pathways/motes — the largest chunk of draw calls) drops
 * entirely on coarse/mobile pointers, keeping only the core emblem + rings +
 * particles there. OrbitControls (built for click-drag orbiting) is dropped
 * in favour of the same pointer-parallax + scroll-driven camera dolly the
 * original already drove procedurally.
 */

const C = {
  darkGreen: 0x2e5b39,
  green: 0x3d7a4c,
  leafA: 0x3a7548,
  leafB: 0x4b8c58,
};

/** Deterministic pseudo-random in [0,1) — stays pure across re-renders
 * (same seed always yields the same value), which the project's stricter
 * component-purity lint rule requires for anything computed during render. */
function hash(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function leafShape(len: number, w: number) {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(w * 0.95, len * 0.17, w * 0.85, len * 0.72, 0, len);
  s.bezierCurveTo(-w * 0.85, len * 0.72, -w * 0.95, len * 0.17, 0, 0);
  return s;
}
function crescentShape(h: number, w: number, thick: number) {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(0.06 * w, 0.58 * h, 0.44 * w, 0.96 * h, w, h);
  s.bezierCurveTo(w * 0.6, h * 0.6, thick * 1.25, h * 0.44, thick, 0.02);
  s.lineTo(0, 0);
  return s;
}
function bodyShape() {
  const s = new THREE.Shape();
  s.moveTo(-0.66, 0.3);
  s.bezierCurveTo(-0.58, -1.05, -0.32, -2.0, 0, -2.62);
  s.bezierCurveTo(0.32, -2.0, 0.58, -1.05, 0.66, 0.3);
  s.bezierCurveTo(0.3, 0.06, -0.3, 0.06, -0.66, 0.3);
  return s;
}
function sideBodyShape() {
  const s = new THREE.Shape();
  s.moveTo(-0.62, 0.28);
  s.bezierCurveTo(-0.5, -0.85, -0.18, -1.45, 0.35, -1.85);
  s.bezierCurveTo(0.44, -1.45, 0.55, -0.75, 0.6, 0.24);
  s.bezierCurveTo(0.28, 0.02, -0.28, 0.02, -0.62, 0.28);
  return s;
}

const EX = { depth: 0.34, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.055, bevelSegments: 3, curveSegments: 22 };

function surfaceProps(color: number, o: Partial<{ roughness: number; metalness: number; clearcoat: number; ccr: number; sheen: number; env: number; transmission: number; thickness: number; emissive: number; emissiveIntensity: number }> = {}) {
  return {
    color,
    roughness: o.roughness ?? 0.32,
    metalness: o.metalness ?? 0.05,
    clearcoat: o.clearcoat ?? 0.85,
    clearcoatRoughness: o.ccr ?? 0.18,
    sheen: o.sheen ?? 0.35,
    sheenColor: new THREE.Color(0xdffaf6),
    envMapIntensity: o.env ?? 1.05,
    transmission: o.transmission ?? 0,
    thickness: o.thickness ?? 0,
    ior: 1.45,
    emissive: new THREE.Color(o.emissive ?? 0x000000),
    emissiveIntensity: o.emissiveIntensity ?? 0,
  } as const;
}

function useGlowTexture() {
  return useMemo(() => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 128;
    const ctx = cv.getContext("2d")!;
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.25, "rgba(220,250,246,0.65)");
    g.addColorStop(0.55, "rgba(150,220,214,0.2)");
    g.addColorStop(1, "rgba(150,220,214,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

function useShadowTexture() {
  return useMemo(() => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 256;
    const ctx = cv.getContext("2d")!;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(40,90,95,0.55)");
    g.addColorStop(0.45, "rgba(40,90,95,0.22)");
    g.addColorStop(1, "rgba(40,90,95,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

type LeafBase = { rz: number; ry: number };
function makeLeafGeo(len: number, w: number) {
  return new THREE.ExtrudeGeometry(leafShape(len, w), { ...EX, depth: 0.26, bevelSize: 0.05, bevelThickness: 0.05 });
}

function Leaf({ len, w, color, depth, position, base, veinLen, leafRef }: { len: number; w: number; color: number; depth: number; position: [number, number, number]; base: LeafBase; veinLen: number; leafRef: (g: THREE.Group | null) => void }) {
  const geo = useMemo(() => new THREE.ExtrudeGeometry(leafShape(len, w), { ...EX, depth, bevelSize: 0.05, bevelThickness: 0.05 }), [len, w, depth]);
  return (
    <group ref={leafRef} position={position} rotation={[0, base.ry, base.rz]} userData={{ base }}>
      <mesh geometry={geo}>
        <meshPhysicalMaterial {...surfaceProps(color, { roughness: 0.34, clearcoat: 0.7, env: 0.9 })} />
      </mesh>
      <mesh position={[0, veinLen * 0.44, depth + 0.015]}>
        <capsuleGeometry args={[0.022, veinLen * 0.72, 4, 8]} />
        <meshPhysicalMaterial {...surfaceProps(0xdff3ea, { roughness: 0.25, clearcoat: 1, emissive: 0xbfeee4, emissiveIntensity: 0.12 })} />
      </mesh>
    </group>
  );
}

const TOP_LEAF_SPEC = [
  { a: 1.3, l: 1.55, w: 0.5, c: C.leafA, x: -0.16, y: 0.22, z: -0.3, tilt: -0.35 },
  { a: 0.66, l: 1.62, w: 0.5, c: C.green, x: -0.1, y: 0.34, z: -0.1, tilt: -0.18 },
  { a: 0, l: 1.78, w: 0.52, c: C.leafB, x: 0, y: 0.46, z: 0.16, tilt: 0 },
  { a: -0.66, l: 1.62, w: 0.5, c: C.green, x: 0.1, y: 0.34, z: -0.1, tilt: 0.18 },
  { a: -1.3, l: 1.55, w: 0.5, c: C.leafA, x: 0.16, y: 0.22, z: -0.3, tilt: 0.35 },
] as const;
const LOW_LEAF_SPEC = [
  { a: 2.3, c: C.leafB, x: -0.55, ty: 0.1 },
  { a: -2.3, c: C.leafA, x: 0.55, ty: -0.1 },
] as const;

function Figure({ bodyColor, headColor, armColor, armH, armW, side, position, rotation, scale, figRef, headRef }: {
  bodyColor: number; headColor: number; armColor: number; armH: number; armW: number; side?: boolean;
  position: [number, number, number]; rotation?: [number, number, number]; scale: number | [number, number, number];
  figRef: (g: THREE.Group | null) => void; headRef: (m: THREE.Mesh | null) => void;
}) {
  const bodyGeo = useMemo(() => new THREE.ExtrudeGeometry(side ? sideBodyShape() : bodyShape(), { ...EX, depth: 0.3 }), [side]);
  const armRGeo = useMemo(() => new THREE.ExtrudeGeometry(crescentShape(armH, armW, 0.4), { ...EX, depth: 0.28 }), [armH, armW]);
  const armLGeo = useMemo(() => new THREE.ExtrudeGeometry(crescentShape(armH * (side ? 0.72 : 1), armW * (side ? 0.68 : 1), 0.36), { ...EX, depth: 0.28 }), [armH, armW, side]);

  return (
    <group ref={figRef} position={position} rotation={rotation} scale={scale}>
      <mesh geometry={bodyGeo} position={[0, 0, -0.15]}>
        <meshPhysicalMaterial {...surfaceProps(bodyColor, { roughness: 0.28, clearcoat: 0.95, env: 1.15 })} />
      </mesh>
      <mesh geometry={armRGeo} position={[0.16, 0.16, -0.02]}>
        <meshPhysicalMaterial {...surfaceProps(armColor, { roughness: 0.26, clearcoat: 0.95, env: 1.2 })} />
      </mesh>
      <mesh geometry={armLGeo} position={[-0.16, 0.16, -0.02]} scale={[-1, 1, 1]}>
        <meshPhysicalMaterial {...surfaceProps(armColor, { roughness: 0.26, clearcoat: 0.95, env: 1.2 })} />
      </mesh>
      <mesh ref={headRef} position={[0, 1.16, 0.16]}>
        <sphereGeometry args={[0.46, 36, 26]} />
        <meshPhysicalMaterial {...surfaceProps(headColor, { roughness: 0.16, clearcoat: 1, env: 1.35 })} />
      </mesh>
    </group>
  );
}

function ecgPoints() {
  const raw: [number, number][] = [
    [-1.55, 0], [-1.05, 0], [-0.86, 0.14], [-0.7, -0.14], [-0.52, 0.86], [-0.34, -0.66],
    [-0.14, 0.22], [0.02, 0], [0.36, 0], [0.54, 0.42], [0.7, -0.28], [0.9, 0.06], [1.15, 0], [1.55, 0],
  ];
  return raw.map(([x, y]) => new THREE.Vector3(x * 0.95, y * 0.92, 0));
}

const PIN_OUTLINE: [number, number][] = [
  [0, -4.05], [-1.55, -3.15], [-2.62, -1.85], [-3.16, -0.25], [-2.9, 1.32], [-2.02, 2.55],
  [-0.85, 3.2], [0, 3.34], [0.85, 3.2], [2.02, 2.55], [2.9, 1.32], [3.16, -0.25],
  [2.62, -1.85], [1.55, -3.15], [0, -4.05],
];

const RING_SPEC = [
  { r: 4.75, t: 0.026, tiltX: 1.2, tiltY: 0.35, c: 0x4fa3b2, s: 0.1, w: 0.1 },
  { r: 5.55, t: 0.022, tiltX: 1.42, tiltY: -0.45, c: 0x63c0b4, s: 0.075, w: 0.08 },
  { r: 6.35, t: 0.019, tiltX: 1.05, tiltY: 0.8, c: 0x4f9a72, s: 0.055, w: 0.07 },
  { r: 7.15, t: 0.016, tiltX: 1.55, tiltY: 0.15, c: 0x7fcdc4, s: 0.045, w: 0.06 },
] as const;

const ARC_SPEC = [
  { r: 5.0, span: 0.9, tube: 0.032, col: 0x3e8fa0, rx: 0.4, ry: -0.5 },
  { r: 6.9, span: 0.7, tube: 0.02, col: 0x4f9a72, rx: 1.1, ry: 0.2 },
] as const;

const NODE_COUNT = 10;
function nodeHomes(): THREE.Vector3[] {
  const homes: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i += 1) {
    const a = (i / NODE_COUNT) * Math.PI * 2 + 0.3;
    const rad = 4.9 + ((i * 53) % 100) / 40;
    const y = Math.sin(a * 1.7) * 2.4 + (((i * 37) % 100) / 100 - 0.5) * 1.6;
    homes.push(new THREE.Vector3(Math.cos(a) * rad, y, Math.sin(a) * rad * 0.55 - 0.5));
  }
  return homes;
}

function flowVertexShader() {
  return `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `;
}
function flowFragmentShader() {
  return `
    varying vec2 vUv; uniform float uTime,uSpeed,uW; uniform vec3 uColor;
    void main(){
      float f = fract(vUv.x - uTime*uSpeed);
      float head = smoothstep(0.0,uW,f)*smoothstep(uW*2.0,uW,f);
      float trail = smoothstep(0.0,0.55,1.0-f)*0.16;
      float a = 0.10 + head*0.95 + trail;
      gl_FragColor = vec4(uColor + head*0.35, a);
    }`;
}

function particleVertexShader() {
  return `
    attribute float aSize; varying vec3 vC; varying float vA;
    uniform float uTime, uPix;
    void main(){
      vC = color;
      vec3 p = position;
      p.y += sin(uTime*0.35 + p.x*0.35)*0.35;
      p.x += cos(uTime*0.28 + p.z*0.3)*0.30;
      vec4 mv = modelViewMatrix*vec4(p,1.0);
      vA = 0.35 + 0.55*smoothstep(-34.0,-6.0,mv.z);
      gl_PointSize = aSize*300.0*uPix/(-mv.z);
      gl_Position = projectionMatrix*mv;
    }`;
}
function particleFragmentShader() {
  return `
    varying vec3 vC; varying float vA; uniform sampler2D uMap;
    void main(){
      vec4 t = texture2D(uMap, gl_PointCoord);
      gl_FragColor = vec4(vC, t.a*vA*0.85);
    }`;
}

function reducedMotionQuery() {
  return typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
}

function EcosystemModel({ reduced, coarse }: { reduced: boolean; coarse: boolean }) {
  const { gl } = useThree();
  const SPRITE = useGlowTexture();
  const shadowTex = useShadowTexture();

  const world = useRef<THREE.Group>(null);
  const emblem = useRef<THREE.Group>(null);
  const bgMat = useRef<THREE.ShaderMaterial>(null);

  const figC = useRef<THREE.Group | null>(null);
  const figL = useRef<THREE.Group | null>(null);
  const figR = useRef<THREE.Group | null>(null);
  const headC = useRef<THREE.Mesh | null>(null);
  const headL = useRef<THREE.Mesh | null>(null);
  const headR = useRef<THREE.Mesh | null>(null);

  const leafRefs = useRef<(THREE.Group | null)[]>([]);
  const ecgMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const spark = useRef<THREE.Sprite>(null);

  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);
  const arcRefs = useRef<(THREE.Mesh | null)[]>([]);
  const ecoRef = useRef<THREE.Group>(null);

  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const haloRefs = useRef<(THREE.Sprite | null)[]>([]);
  const nodeState = useRef(nodeHomes().map((home, i) => ({ home, phase: hash(i * 4.4 + 9) * Math.PI * 2 })));
  const nodeMats = useMemo(() => nodeHomes().map(() => new THREE.MeshPhysicalMaterial({ color: 0xeafffb, roughness: 0.1, metalness: 0, transparent: true, opacity: 0.92, clearcoat: 1, envMapIntensity: 1.6, emissive: new THREE.Color(0x4fb2a8), emissiveIntensity: 0.25 })), []);

  const linkGeo = useMemo(() => {
    const homes = nodeHomes();
    const pos: number[] = [];
    for (let i = 0; i < homes.length; i += 1) {
      for (let j = i + 1; j < homes.length; j += 1) {
        const d = homes[i].distanceTo(homes[j]);
        if (d < 4.0 && ((i * 31 + j * 17) % 100) / 100 < 0.55) {
          pos.push(homes[i].x, homes[i].y, homes[i].z, homes[j].x, homes[j].y, homes[j].z);
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return g;
  }, []);

  const paths = useMemo(() => {
    const homes = nodeHomes();
    return Array.from({ length: 3 }, (_, i) => {
      const a = homes[(i * 3) % homes.length];
      const b = homes[(i * 5 + 2) % homes.length];
      const mid = a.clone().add(b).multiplyScalar(0.5).multiplyScalar(0.55);
      mid.y += (((i * 41) % 100) / 100 - 0.5) * 2.4;
      mid.z += (((i * 23) % 100) / 100 - 0.2) * 2.0;
      const curve = new THREE.CatmullRomCurve3([a.clone(), mid, b.clone()]);
      return { curve, tubeGeo: new THREE.TubeGeometry(curve, 40, 0.014, 5, false), t: ((i * 61) % 100) / 100, speed: 0.06 + (((i * 19) % 100) / 100) * 0.07 };
    });
  }, []);
  const packetRefs = useRef<(THREE.Sprite | null)[]>([]);

  const motes = useMemo(() => Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 63) % 100) / 100 * Math.PI * 2;
    const r = 5.2 + ((i * 29) % 100) / 100 * 2.6;
    const y = (((i * 47) % 100) / 100 - 0.5) * 5.0;
    return { a, r, y, sp: 0.06 + ((i * 13) % 100) / 100 * 0.07, ph: ((i * 71) % 100) / 100 * 6.28, color: i % 2 ? 0x4f9a6a : 0x67bdae };
  }), []);
  const moteRefs = useRef<(THREE.Group | null)[]>([]);

  const PN = coarse ? 130 : 300;
  const { pPos, pCol, pSize } = useMemo(() => {
    const pos = new Float32Array(PN * 3);
    const col = new Float32Array(PN * 3);
    const size = new Float32Array(PN);
    const cA = new THREE.Color(0x6fc7bd);
    const cB = new THREE.Color(0xffffff);
    const cC = new THREE.Color(0x59a37f);
    for (let i = 0; i < PN; i += 1) {
      const r = 5 + Math.pow(hash(i * 2.7 + 10), 0.6) * 13;
      const th = hash(i * 3.9 + 11) * Math.PI * 2;
      const ph = Math.acos(2 * hash(i * 5.1 + 12) - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph) * 0.75;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) * 0.7;
      const c = hash(i * 6.3 + 13) < 0.5 ? cB.clone().lerp(cA, hash(i * 7.7 + 14)) : cA.clone().lerp(cC, hash(i * 8.9 + 15) * 0.7);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      size[i] = 0.05 + hash(i * 10.1 + 16) * 0.16;
    }
    return { pPos: pos, pCol: col, pSize: size };
  }, [PN]);
  const particlesMat = useRef<THREE.ShaderMaterial>(null);
  const particlesPts = useRef<THREE.Points>(null);

  const ecgCurve = useMemo(() => new THREE.CatmullRomCurve3(ecgPoints(), false, "catmullrom", 0.35), []);
  const ecgGeo = useMemo(() => new THREE.TubeGeometry(ecgCurve, 100, 0.055, 8, false), [ecgCurve]);

  const pinCurve = useMemo(() => new THREE.CatmullRomCurve3(PIN_OUTLINE.map(([x, y]) => new THREE.Vector3(x, y, 0)), false, "catmullrom", 0.4), []);
  const arcOutlineGeo = useMemo(() => {
    const pts = PIN_OUTLINE.slice(2, 13).map(([x, y]) => new THREE.Vector3(x, y, 0));
    const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.4);
    return new THREE.TubeGeometry(curve, 120, 0.125, 10, false);
  }, []);
  const glassRingGeo = useMemo(() => new THREE.TubeGeometry(pinCurve, 140, 0.055, 8, true), [pinCurve]);

  const pointer = useRef(new THREE.Vector2(0, 0));
  const pointerTarget = useRef(new THREE.Vector2(0, 0));
  const scrollP = useRef(0);
  const scrollTarget = useRef(0);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const baseZ = useRef(17.5);

  // Which program card (0-4, or -1 for none) MotionSystem's scroll-spy says
  // is centered right now — see the CustomEvent comment there for why this
  // is a window event rather than a shared import.
  const activeProgram = useRef(-1);
  useEffect(() => {
    const onActive = (e: Event) => {
      activeProgram.current = (e as CustomEvent<{ index: number }>).detail.index;
    };
    window.addEventListener("preventa:active-program", onActive);
    return () => window.removeEventListener("preventa:active-program", onActive);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollTarget.current = Math.min(1, window.scrollY / max);
    };
    // Only the target distance is updated here — the actual camera.position
    // mutation happens inside useFrame's existing smoothing step below, so
    // this effect never reaches into a value returned by useThree().
    const setBaseZ = () => { baseZ.current = window.innerWidth / window.innerHeight < 1 ? 21 : 15.5; };
    setBaseZ();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setBaseZ);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setBaseZ);
    };
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const dt = Math.min(0.05, delta);
    if (reduced) return;

    pointer.current.lerp(pointerTarget.current, 0.05);
    scrollP.current += (scrollTarget.current - scrollP.current) * 0.06;
    const sp = scrollP.current;

    if (world.current) {
      world.current.rotation.y = pointer.current.x * 0.22 + Math.sin(t * 0.16) * 0.05;
      world.current.rotation.x = -pointer.current.y * 0.12 + Math.sin(t * 0.21) * 0.02;
    }
    if (emblem.current) {
      emblem.current.rotation.y = Math.sin(t * 0.32) * 0.14 + pointer.current.x * 0.1;
      emblem.current.rotation.x = Math.sin(t * 0.26) * 0.045 - pointer.current.y * 0.05;
      const breathe = 1 + Math.sin(t * 0.85) * 0.013;
      emblem.current.scale.setScalar(breathe);
      emblem.current.position.y = 0.25 + Math.sin(t * 0.6) * 0.09;
    }

    [headC, headL, headR].forEach((h, i) => {
      if (h.current) h.current.position.y = 1.16 + Math.sin(t * 1.1 + i * 1.4) * 0.045;
    });

    leafRefs.current.forEach((leaf, i) => {
      if (!leaf) return;
      const base = (leaf.userData as { base: LeafBase }).base;
      leaf.rotation.z = base.rz + Math.sin(t * 0.9 + i * 0.7) * 0.035;
      leaf.rotation.y = base.ry + Math.sin(t * 0.7 + i * 1.1) * 0.09;
    });

    ringRefs.current.forEach((m, i) => {
      if (!m) return;
      const mat = m.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = t;
      const spec = RING_SPEC[i];
      const spin = i % 2 === 0 ? 0.025 : -0.02;
      m.rotation.z += spin * dt * 3;
      m.rotation.x = spec.tiltX + Math.sin(t * 0.22 + i) * 0.06 + pointer.current.y * 0.06;
      m.rotation.y = spec.tiltY + Math.cos(t * 0.19 + i) * 0.06 + pointer.current.x * 0.08;
      const exp = 1 + sp * 0.28;
      m.scale.setScalar(exp);
    });
    arcRefs.current.forEach((a, i) => {
      if (!a) return;
      a.rotation.z += (i % 2 === 0 ? 0.035 : -0.03) * dt * 2.2;
      a.scale.setScalar(1 + sp * 0.3);
    });

    if (spark.current) {
      const su = (t * 0.28) % 1;
      const p = ecgCurve.getPointAt(su);
      spark.current.position.set(p.x, p.y - 1.6, 1.35);
      (spark.current.material as THREE.SpriteMaterial).opacity = 0.55 + 0.45 * Math.abs(Math.sin(t * 3));
    }
    if (ecgMat.current) ecgMat.current.emissiveIntensity = 0.65 + 0.45 * Math.abs(Math.sin(t * 2.2));

    paths.forEach((pa, i) => {
      pa.t = (pa.t + pa.speed * dt) % 1;
      const pt = pa.curve.getPointAt(pa.t);
      const sprite = packetRefs.current[i];
      if (sprite) {
        sprite.position.copy(pt);
        (sprite.material as THREE.SpriteMaterial).opacity = 0.35 + 0.6 * Math.sin(pa.t * Math.PI);
      }
    });

    motes.forEach((m, i) => {
      const grp = moteRefs.current[i];
      if (!grp) return;
      const a = m.a + t * m.sp;
      grp.position.set(Math.cos(a) * m.r * (1 + sp * 0.2), m.y + Math.sin(t * 0.5 + m.ph) * 0.5, Math.sin(a) * m.r * 0.5);
      grp.rotation.y += dt * 0.5;
      grp.rotation.z += dt * 0.25;
    });

    nodeState.current.forEach((u, i) => {
      const n = nodeRefs.current[i];
      if (!n) return;
      n.position.set(
        u.home.x + Math.sin(t * 0.5 + u.phase) * 0.16,
        u.home.y + Math.sin(t * 0.42 + u.phase * 1.7) * 0.22,
        u.home.z + Math.cos(t * 0.46 + u.phase) * 0.16,
      );
      // Gentle ambient shimmer per node rather than hover-driven — no
      // raycast means no per-frame CPU intersection tests against 10
      // objects sitewide, every frame, forever, for an interaction most
      // visitors will never notice on a fixed background layer. The one
      // exception: nodes 0-4 map 1:1 to the five program cards, and
      // whichever one MotionSystem's scroll-spy says is centered gets
      // eased toward a brighter "active" state here rather than snapped —
      // reads as the structure responding to the reader, not a stateful
      // UI toggle. The halo sprite is a child of this mesh, so its scale
      // composes with the mesh's own — only the halo grows, the sphere
      // itself stays put, or the two would compound into something
      // blown-out rather than a clean glow.
      const isActive = i === activeProgram.current;
      const targetIntensity = isActive ? 0.9 : 0.22 + Math.sin(t * 0.8 + u.phase) * 0.12;
      nodeMats[i].emissiveIntensity += (targetIntensity - nodeMats[i].emissiveIntensity) * 0.08;
      const halo = haloRefs.current[i];
      if (halo) {
        const haloMat = halo.material as THREE.SpriteMaterial;
        const targetOpacity = isActive ? 0.95 : 0.55;
        haloMat.opacity += (targetOpacity - haloMat.opacity) * 0.08;
        const targetHaloScale = isActive ? 2.4 : 0.95;
        halo.scale.setScalar(halo.scale.x + (targetHaloScale - halo.scale.x) * 0.08);
      }
    });

    if (particlesMat.current) particlesMat.current.uniforms.uTime.value = t;
    if (particlesPts.current) particlesPts.current.rotation.y = t * 0.018;
    if (ecoRef.current) {
      ecoRef.current.rotation.y = -t * 0.02 + pointer.current.x * 0.06;
      ecoRef.current.scale.setScalar(1 + sp * 0.12);
    }
    if (bgMat.current) bgMat.current.uniforms.uTime.value = t;

    const wantZ = baseZ.current + sp * 3.4;
    const dist = camera.position.length();
    if (Math.abs(dist - wantZ) > 0.01) camera.position.multiplyScalar(1 + (wantZ / dist - 1) * 0.04);
    camera.lookAt(0, -0.2 - sp * 0.6, 0);
  });

  return (
    <>
      <hemisphereLight color={0xffffff} groundColor={0xbfe4de} intensity={0.85} />
      <directionalLight color={0xffffff} intensity={2.35} position={[-7, 11, 9]} />
      <directionalLight color={0x9fe0d8} intensity={1.15} position={[8, 3, -7]} />
      <directionalLight color={0xdff3f1} intensity={0.55} position={[4, -6, 8]} />
      <pointLight color={0x67c9bf} intensity={6} distance={26} decay={2} position={[0, -3.2, 4.2]} />

      <mesh frustumCulled={false}>
        <sphereGeometry args={[70, 40, 28]} />
        <shaderMaterial
          ref={bgMat}
          side={THREE.BackSide}
          depthWrite={false}
          uniforms={{ uTime: { value: 0 } }}
          vertexShader="varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);}"
          fragmentShader={`
            varying vec3 vP; uniform float uTime;
            void main(){
              vec3 n = normalize(vP);
              float h = n.y*0.5+0.5;
              vec3 top  = vec3(0.985,0.996,0.994);
              vec3 mid  = vec3(0.925,0.972,0.968);
              vec3 low  = vec3(0.800,0.906,0.906);
              vec3 col = mix(low, mid, smoothstep(0.05,0.5,h));
              col = mix(col, top, smoothstep(0.45,0.95,h));
              float glow = smoothstep(0.55,0.0, length(n.xy - vec2(0.0,-0.10)));
              col += vec3(0.02,0.09,0.085)*glow*0.55;
              float band = 0.02*sin(h*22.0 + uTime*0.15);
              col += band*vec3(0.02,0.05,0.05);
              gl_FragColor = vec4(col,1.0);
            }`}
        />
      </mesh>

      <group ref={world}>
        <group ref={emblem} position={[0, 0.25, 0]}>
          <group position={[0, 1.72, -0.05]}>
            {TOP_LEAF_SPEC.map((s, i) => (
              <Leaf key={i} len={s.l} w={s.w} color={s.c} depth={0.26} position={[s.x, s.y, s.z]} base={{ rz: s.a, ry: s.tilt }} veinLen={s.l} leafRef={(g) => { leafRefs.current[i] = g; }} />
            ))}
          </group>
          <group position={[0, -2.55, 0.05]}>
            {LOW_LEAF_SPEC.map((s, i) => (
              <Leaf key={i} len={1.35} w={0.44} color={s.c} depth={0.22} position={[s.x, 0.18, 0.1]} base={{ rz: s.a, ry: s.ty }} veinLen={1.35} leafRef={(g) => { leafRefs.current[5 + i] = g; }} />
            ))}
          </group>

          <Figure bodyColor={0x4a97ab} armColor={0x4f9fb2} headColor={0x3f8ea6} armH={2.1} armW={1.45} position={[0, -0.35, 0.55]} scale={1.02} figRef={(g) => { figC.current = g; }} headRef={(m) => { headC.current = m; }} />
          <Figure bodyColor={0x24647c} armColor={0x2a6f88} headColor={0x1f5b72} armH={1.95} armW={1.4} side position={[-1.95, -0.95, 0.02]} rotation={[0, 0.3, 0.3]} scale={0.94} figRef={(g) => { figL.current = g; }} headRef={(m) => { headL.current = m; }} />
          <Figure bodyColor={0x5fb5ab} armColor={0x69bfb4} headColor={0x55aca3} armH={1.95} armW={1.4} side position={[1.95, -0.95, 0.02]} rotation={[0, -0.3, -0.3]} scale={[-0.94, 0.94, 0.94]} figRef={(g) => { figR.current = g; }} headRef={(m) => { headR.current = m; }} />

          <mesh geometry={ecgGeo} position={[0, -1.6, 1.05]}>
            <meshPhysicalMaterial ref={ecgMat} {...surfaceProps(0xffffff, { roughness: 0.12, clearcoat: 1, emissive: 0xeafffb, emissiveIntensity: 0.85, env: 1.3 })} />
          </mesh>
          <sprite ref={spark} scale={0.9}>
            <spriteMaterial map={SPRITE} color={0xffffff} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
          </sprite>

          <mesh geometry={arcOutlineGeo} position={[0, 0, -0.35]}>
            <meshPhysicalMaterial {...surfaceProps(C.darkGreen, { roughness: 0.28, clearcoat: 1, env: 1.1 })} />
          </mesh>
          <mesh geometry={glassRingGeo} position={[0, 0, -0.75]}>
            <meshPhysicalMaterial color={0xd8f4f0} roughness={0.06} metalness={0} clearcoat={1} envMapIntensity={1.5} transparent opacity={0.8} />
          </mesh>
          <mesh position={[0, 0.1, -1.35]}>
            <circleGeometry args={[3.9, 48]} />
            <meshBasicMaterial color={0xffffff} transparent opacity={0.28} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
        </group>

        <group ref={ecoRef}>
          {RING_SPEC.map((s, i) => (
            <mesh key={i} ref={(m) => { ringRefs.current[i] = m; }} rotation={[s.tiltX, s.tiltY, 0]}>
              <torusGeometry args={[s.r, s.t, 6, 120]} />
              <shaderMaterial
                transparent depthWrite={false} side={THREE.DoubleSide}
                uniforms={{ uTime: { value: 0 }, uColor: { value: new THREE.Color(s.c) }, uSpeed: { value: s.s }, uW: { value: s.w } }}
                vertexShader={flowVertexShader()}
                fragmentShader={flowFragmentShader()}
              />
            </mesh>
          ))}

          {/* The peripheral "network" layer — nodes, links, data pathways,
              motes — is the single biggest chunk of draw calls in this
              scene and the least essential to the emblem reading as
              premium, so it's the first thing to go on mobile/coarse
              pointers rather than uniformly degrading everything. */}
          {!coarse && (
            <>
              {ARC_SPEC.map((s, i) => (
                <mesh key={i} ref={(m) => { arcRefs.current[i] = m; }} rotation={[s.rx, s.ry, ((i * 37) % 100) / 100 * Math.PI * 2]}>
                  <torusGeometry args={[s.r, s.tube, 8, 90, s.span * Math.PI]} />
                  <meshPhysicalMaterial {...surfaceProps(s.col, { roughness: 0.22, clearcoat: 1, env: 1.2, emissive: s.col, emissiveIntensity: 0.1 })} />
                </mesh>
              ))}

              {nodeHomes().map((home, i) => (
                <mesh key={i} ref={(m) => { nodeRefs.current[i] = m; }} position={home} material={nodeMats[i]}>
                  <sphereGeometry args={[0.145, 16, 12]} />
                  <sprite ref={(s) => { haloRefs.current[i] = s; }} scale={0.95}>
                    <spriteMaterial map={SPRITE} color={0x8fded3} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
                  </sprite>
                </mesh>
              ))}
              <lineSegments geometry={linkGeo}>
                <lineBasicMaterial color={0x4fa8ad} transparent opacity={0.22} depthWrite={false} />
              </lineSegments>

              {paths.map((pa, i) => (
                <group key={i}>
                  <mesh geometry={pa.tubeGeo}>
                    <meshBasicMaterial color={0x69bdb6} transparent opacity={0.3} depthWrite={false} />
                  </mesh>
                  <sprite ref={(s) => { packetRefs.current[i] = s; }} scale={0.55}>
                    <spriteMaterial map={SPRITE} color={0xffffff} transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
                  </sprite>
                </group>
              ))}

              {motes.map((m, i) => (
                <Leaf key={i} len={0.55} w={0.19} color={m.color} depth={0.09} position={[Math.cos(m.a) * m.r, m.y, Math.sin(m.a) * m.r * 0.5]} base={{ rz: 0, ry: 0 }} veinLen={0.55} leafRef={(g) => { moteRefs.current[i] = g; }} />
              ))}
            </>
          )}

          <points ref={particlesPts}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[pPos, 3]} />
              <bufferAttribute attach="attributes-color" args={[pCol, 3]} />
              <bufferAttribute attach="attributes-aSize" args={[pSize, 1]} />
            </bufferGeometry>
            <shaderMaterial
              ref={particlesMat}
              transparent depthWrite={false} blending={THREE.AdditiveBlending} vertexColors
              uniforms={{ uTime: { value: 0 }, uMap: { value: SPRITE }, uPix: { value: gl.getPixelRatio() } }}
              vertexShader={particleVertexShader()}
              fragmentShader={particleFragmentShader()}
            />
          </points>
        </group>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.16, 0.4]}>
          <planeGeometry args={[13, 6.2]} />
          <meshBasicMaterial map={shadowTex} transparent opacity={0.55} depthWrite={false} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.24, 0]}>
          <circleGeometry args={[22, 64]} />
          <meshPhysicalMaterial color={0xf2fbfa} roughness={0.22} metalness={0.15} transparent opacity={0.5} clearcoat={1} envMapIntensity={1.4} />
        </mesh>
      </group>
    </>
  );
}

export default function EcosystemScene({ className }: { className?: string }) {
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(true);
  const [coarse, setCoarse] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // These read the browser's real capabilities (unknowable at SSR time),
    // run once per mount, and have no simpler derivation available.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(reducedMotionQuery());
    setCoarse(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 780);
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    const onVisibility = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      query.removeEventListener("change", onChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    // Deliberately doesn't mount this canvas until the preloader (its own,
    // separate WebGL scene) has finished — two heavy WebGL contexts fighting
    // for the GPU during the same first couple of seconds is exactly the
    // kind of initial-load jank this project has repeatedly had to chase
    // down. A fallback timer means this never blocks the backdrop forever
    // if the preloader is skipped or its event is missed for any reason.
    const preloader = document.querySelector(".preloader");
    if (!preloader || preloader.getAttribute("data-done") === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(true);
      return;
    }
    const onDone = () => setReady(true);
    window.addEventListener("preventa:preloader-done", onDone);
    const fallback = window.setTimeout(() => setReady(true), 2600);
    return () => {
      window.removeEventListener("preventa:preloader-done", onDone);
      window.clearTimeout(fallback);
    };
  }, []);

  if (!ready) return <div className={className} aria-hidden="true" />;

  return (
    <div className={className}>
      <Canvas
        dpr={coarse ? [1, 2] : [1, 1.5]}
        camera={{ position: [0, 0.6, 17.5], fov: 45 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        frameloop={active ? "always" : "never"}
        // R3F's <Canvas> sets `pointer-events: auto` inline on its own
        // wrapper div by default (for its internal event system) — that
        // inline style beats the `.ecosystem-backdrop{pointer-events:none}`
        // CSS rule regardless of specificity, since this canvas sits behind
        // every clickable thing on the page. Confirmed via
        // `elementFromPoint` returning this canvas instead of the header's
        // contact link before this fix — a real bug, not a test artifact.
        style={{ pointerEvents: "none" }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.12;
          scene.fog = new THREE.Fog(0xe7f4f3, 26, 62);
        }}
      >
        <Environment resolution={24}>
          <mesh position={[0, 6, -6]}><sphereGeometry args={[4, 12, 12]} /><meshBasicMaterial color={0xffffff} /></mesh>
          <mesh position={[8, 2, 4]}><sphereGeometry args={[3, 12, 12]} /><meshBasicMaterial color={0x9fe0d8} /></mesh>
          <mesh position={[-8, -2, 4]}><sphereGeometry args={[3, 12, 12]} /><meshBasicMaterial color={0xdff3f1} /></mesh>
        </Environment>
        <EcosystemModel reduced={reduced} coarse={coarse} />
      </Canvas>
    </div>
  );
}
