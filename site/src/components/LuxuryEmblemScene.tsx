"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Faithful port of the uploaded "Luxury 3D Emblem" preloader design: three
 * frosted-glass figures in a heart arrangement, an animated ECG heartbeat
 * tube with a travelling pulse, seven crystalline leaves with glowing veins,
 * and an additive particle field — adapted from raw Three.js (OrbitControls
 * + manual PMREMGenerator + EffectComposer/UnrealBloomPass) into R3F.
 *
 * Glow is faked with additive sprite halos rather than a real
 * EffectComposer/Bloom pass — this mirrors a deliberate choice already made
 * elsewhere in this codebase (see the retired IntelligenceScene): a real
 * bloom pass roughly doubles frame cost for a difference few visitors would
 * name, and for a component that mounts fresh on every single page load
 * (unlike a scene the visitor scrolls to), that extra setup cost is exactly
 * the wrong place to spend it. No drag controls either — a preloader is on
 * screen for ~2s, so the emblem just auto-rotates instead of waiting for a
 * visitor to grab it.
 */

function figureShape() {
  const s = new THREE.Shape();
  s.moveTo(0, -1.6);
  s.quadraticCurveTo(0.55, -1.1, 0.62, -0.35);
  s.quadraticCurveTo(0.66, -0.05, 0.9, 0.45);
  s.quadraticCurveTo(1.15, 0.95, 1.05, 1.25);
  s.quadraticCurveTo(0.82, 1.15, 0.62, 0.8);
  s.quadraticCurveTo(0.42, 0.45, 0.3, 0.35);
  s.quadraticCurveTo(0.12, 0.28, 0, 0.3);
  s.quadraticCurveTo(-0.12, 0.28, -0.3, 0.35);
  s.quadraticCurveTo(-0.42, 0.45, -0.62, 0.8);
  s.quadraticCurveTo(-0.82, 1.15, -1.05, 1.25);
  s.quadraticCurveTo(-1.15, 0.95, -0.9, 0.45);
  s.quadraticCurveTo(-0.66, -0.05, -0.62, -0.35);
  s.quadraticCurveTo(-0.55, -1.1, 0, -1.6);
  return s;
}

function leafShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.quadraticCurveTo(0.55, 0.35, 0.62, 0.95);
  s.quadraticCurveTo(0.5, 1.55, 0, 1.9);
  s.quadraticCurveTo(-0.5, 1.55, -0.62, 0.95);
  s.quadraticCurveTo(-0.55, 0.35, 0, 0);
  return s;
}

const FIGURE_EXTRUDE = { depth: 0.34, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 3, curveSegments: 14 };
const LEAF_EXTRUDE = { depth: 0.12, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 3, curveSegments: 12 };

/** Deterministic pseudo-random in [0,1) — a stand-in for Math.random() that
 * stays pure across re-renders (same seed always yields the same value),
 * which the project's stricter component-purity lint rule requires inside
 * useMemo. */
function hash(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function heartbeatPoints() {
  const raw: [number, number][] = [
    [-2.0, 0], [-1.35, 0], [-1.15, 0.18], [-0.95, -0.14], [-0.75, 0],
    [-0.45, 0], [-0.28, 0.85], [-0.05, -0.65], [0.14, 0.35], [0.3, 0],
    [0.65, 0], [0.85, 0.16], [1.05, -0.12], [1.3, 0], [2.0, 0],
  ];
  return raw.map(([x, y]) => new THREE.Vector3(x, y * 0.9 + 0.05, 0.62));
}

/**
 * A "frosted glass" look without `transmission` — real transmission forces
 * an extra offscreen render-to-texture pass per object, and this component
 * mounts fresh (and has to look good instantly) on every single page load.
 * With 13 of these meshes on screen at once, that's an expensive place to
 * spend the preloader's short life. Clearcoat + partial opacity + a tinted
 * emissive reads as glassy without the transmission cost.
 */
function frostedProps(color: number, opts: Partial<{ roughness: number }> = {}) {
  return {
    color,
    metalness: 0.05,
    roughness: opts.roughness ?? 0.22,
    transparent: true,
    opacity: 0.88,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    envMapIntensity: 1.6,
    side: THREE.DoubleSide,
    emissive: new THREE.Color(color).multiplyScalar(0.16),
  } as const;
}

function Figure({ color, position, rotation, scale, groupRef }: { color: number; position: [number, number, number]; rotation?: [number, number, number]; scale: number; groupRef: (g: THREE.Group | null) => void }) {
  const bodyGeo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(figureShape(), FIGURE_EXTRUDE);
    g.center();
    return g;
  }, []);
  const props = useMemo(() => frostedProps(color), [color]);
  const headProps = useMemo(() => frostedProps(color, { roughness: 0.2 }), [color]);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh geometry={bodyGeo}>
        <meshPhysicalMaterial {...props} />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshPhysicalMaterial {...headProps} />
      </mesh>
    </group>
  );
}

type LeafSpec = { position: [number, number, number]; rotationZ: number; scale: number; phase: number };

function Leaf({ spec, groupsRef, index }: { spec: LeafSpec; groupsRef: React.MutableRefObject<(THREE.Group | null)[]>; index: number }) {
  const geo = useMemo(() => new THREE.ExtrudeGeometry(leafShape(), LEAF_EXTRUDE), []);
  const veinRef = useRef<THREE.MeshStandardMaterial>(null);

  const mainVeinGeo = useMemo(
    () => new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.05, 0.16), new THREE.Vector3(0, 0.9, 0.16), new THREE.Vector3(0, 1.78, 0.16)]), 20, 0.022, 8, false),
    [],
  );
  const sideVeins = useMemo(() => {
    const veins: THREE.TubeGeometry[] = [];
    for (let i = 0; i < 3; i += 1) {
      const y = 0.35 + i * 0.45;
      const spread = 0.42 - i * 0.1;
      [-1, 1].forEach((dir) => {
        veins.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0, y, 0.16), new THREE.Vector3(dir * spread * 0.6, y + 0.22, 0.16), new THREE.Vector3(dir * spread, y + 0.42, 0.16)]), 12, 0.013, 6, false));
      });
    }
    return veins;
  }, []);

  return (
    <group ref={(g) => { groupsRef.current[index] = g; }} position={spec.position} rotation={[0, 0, spec.rotationZ]} scale={spec.scale} userData={{ baseY: spec.position[1], phase: spec.phase }}>
      <mesh geometry={geo}>
        <meshPhysicalMaterial {...frostedProps(0x1f7a3d, { roughness: 0.18 })} />
      </mesh>
      <mesh geometry={mainVeinGeo}>
        <meshStandardMaterial ref={veinRef} color={0x30f2ff} emissive={0x30f2ff} emissiveIntensity={1.8} roughness={0.3} />
      </mesh>
      {sideVeins.map((g, i) => (
        <mesh key={i} geometry={g}>
          <meshStandardMaterial color={0x30f2ff} emissive={0x30f2ff} emissiveIntensity={1.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

const CANOPY_SPEC: LeafSpec[] = (() => {
  const specs: LeafSpec[] = [];
  const arcR = 3.4;
  for (let i = 0; i < 5; i += 1) {
    const t = i / 4;
    const ang = THREE.MathUtils.lerp(Math.PI * 0.82, Math.PI * 0.18, t);
    specs.push({
      position: [Math.cos(ang) * arcR, Math.sin(ang) * arcR + 0.4, -0.2],
      rotationZ: ang - Math.PI / 2,
      scale: 0.9 - Math.abs(t - 0.5) * 0.35,
      phase: i * 1.1,
    });
  }
  specs.push({ position: [-1.15, -2.5, 0.1], rotationZ: 2.4, scale: 0.7, phase: 2.1 });
  specs.push({ position: [1.15, -2.5, 0.1], rotationZ: -2.4, scale: 0.7, phase: 4.7 });
  return specs;
})();

function EmblemModel() {
  const emblem = useRef<THREE.Group>(null);
  const centerFig = useRef<THREE.Group | null>(null);
  const leftFig = useRef<THREE.Group | null>(null);
  const rightFig = useRef<THREE.Group | null>(null);
  const leafGroups = useRef<(THREE.Group | null)[]>([]);
  const heartLight = useRef<THREE.PointLight>(null);
  const orbitingLight = useRef<THREE.PointLight>(null);
  const hbMat = useRef<THREE.MeshStandardMaterial>(null);
  const pulseOrb = useRef<THREE.Mesh>(null);
  const pulseHalo = useRef<THREE.Sprite>(null);
  const particles = useRef<THREE.Points>(null);

  const hbCurve = useMemo(() => new THREE.CatmullRomCurve3(heartbeatPoints(), false, "catmullrom", 0.05), []);
  const hbGeo = useMemo(() => new THREE.TubeGeometry(hbCurve, 120, 0.045, 8, false), [hbCurve]);

  const arcGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i += 1) {
      const a = THREE.MathUtils.lerp(Math.PI * 0.95, Math.PI * 0.05, i / 40);
      pts.push(new THREE.Vector3(Math.cos(a) * 4.5, Math.sin(a) * 4.5 + 0.2, -0.4));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 50, 0.05, 6, false);
  }, []);

  const particleCount = 260;
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i += 1) {
      const r = 4 + hash(i * 3.1 + 1) * 14;
      const th = hash(i * 5.7 + 2) * Math.PI * 2;
      const ph = Math.acos(2 * hash(i * 7.3 + 3) - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = (hash(i * 9.1 + 4) - 0.5) * 16;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
      spd[i] = 0.2 + hash(i * 11.3 + 5) * 0.8;
    }
    return { positions: pos, speeds: spd };
  }, []);

  const particleTexture = useMemo(() => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 64;
    const ctx = cv.getContext("2d")!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(180,255,240,1)");
    grad.addColorStop(0.3, "rgba(90,230,200,0.6)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(cv);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const beat = Math.pow(Math.max(0, Math.sin(t * 3.2)), 12) + 0.6 * Math.pow(Math.max(0, Math.sin(t * 3.2 - 0.55)), 12);
    if (hbMat.current) hbMat.current.emissiveIntensity = 1.6 + beat * 3.5;
    if (heartLight.current) heartLight.current.intensity = 0.6 + beat * 4;

    if (pulseOrb.current) {
      const u = (t * 0.35) % 1;
      const p = hbCurve.getPointAt(u);
      pulseOrb.current.position.copy(p);
      pulseOrb.current.scale.setScalar(0.7 + beat * 1.1);
    }
    if (pulseHalo.current) {
      const mat = pulseHalo.current.material as THREE.SpriteMaterial;
      mat.opacity = 0.5 + beat * 0.5;
    }

    leafGroups.current.forEach((leaf) => {
      if (!leaf) return;
      const { baseY, phase } = leaf.userData as { baseY: number; phase: number };
      leaf.position.y = baseY + Math.sin(t * 0.9 + phase) * 0.07;
    });

    if (emblem.current) {
      emblem.current.rotation.y = t * 0.12 + Math.sin(t * 0.15) * 0.12;
      emblem.current.position.y = Math.sin(t * 0.6) * 0.15 + 0.4;
      emblem.current.rotation.z = Math.sin(t * 0.22) * 0.02;
    }

    const br = 1 + Math.sin(t * 1.4) * 0.012;
    if (centerFig.current) centerFig.current.scale.setScalar(1.25 * br);
    if (leftFig.current) leftFig.current.scale.setScalar(0.85 * (1 + Math.sin(t * 1.4 + 1) * 0.012));
    if (rightFig.current) rightFig.current.scale.setScalar(0.85 * (1 + Math.sin(t * 1.4 + 2) * 0.012));

    if (orbitingLight.current) orbitingLight.current.position.set(Math.cos(t * 0.4) * 9, 4 + Math.sin(t * 0.7) * 2, Math.sin(t * 0.4) * 9);

    if (particles.current) {
      const arr = (particles.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < particleCount; i += 1) {
        arr[i * 3 + 1] += Math.sin(t * 0.5 + i) * 0.0012 * speeds[i];
      }
      (particles.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      particles.current.rotation.y = t * 0.02;
    }
  });

  return (
    <>
      <ambientLight color={0x0a2622} intensity={0.6} />
      <pointLight color={0x2effd0} intensity={2.2} distance={60} position={[6, 8, 8]} />
      <pointLight color={0x2e8b57} intensity={1.6} distance={50} position={[-8, 3, -6]} />
      <pointLight color={0x3ac8ff} intensity={1.4} distance={40} position={[0, -6, -8]} />
      <pointLight ref={heartLight} color={0x18f0ff} intensity={0} distance={14} position={[0, 0.1, 1.2]} />
      <pointLight ref={orbitingLight} color={0x66ffd9} intensity={1.2} distance={30} />

      <group ref={emblem}>
        <Figure color={0x2f8fa8} position={[0, 0.15, 0]} scale={1.25} groupRef={(g) => { centerFig.current = g; }} />
        <Figure color={0x1f6f66} position={[-1.9, -0.1, -0.45]} rotation={[0, 0.35, 0.28]} scale={0.85} groupRef={(g) => { leftFig.current = g; }} />
        <Figure color={0x3fae94} position={[1.9, -0.1, -0.45]} rotation={[0, -0.35, -0.28]} scale={0.85} groupRef={(g) => { rightFig.current = g; }} />

        <mesh geometry={hbGeo}>
          <meshStandardMaterial ref={hbMat} color={0x0affe0} emissive={0x0affe0} emissiveIntensity={2.2} metalness={0.1} roughness={0.25} />
        </mesh>
        <mesh ref={pulseOrb}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color={0xbdfffa} />
          <sprite ref={pulseHalo} scale={0.9}>
            <spriteMaterial map={particleTexture} color={0x7dfce8} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.8} />
          </sprite>
        </mesh>

        {/* Ambient halo behind the whole emblem — the "bloom" without a composer pass */}
        <sprite position={[0, 0.2, -1.6]} scale={9}>
          <spriteMaterial map={particleTexture} color={0x2effd0} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.22} />
        </sprite>
        <sprite position={[0, 0.6, 1.4]} scale={4.2}>
          <spriteMaterial map={particleTexture} color={0x66ffd9} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.3} />
        </sprite>

        {CANOPY_SPEC.map((spec, i) => (
          <Leaf key={i} spec={spec} groupsRef={leafGroups} index={i} />
        ))}

        <mesh geometry={arcGeo}>
          <meshStandardMaterial color={0x1c6b3a} emissive={0x2a9a55} emissiveIntensity={0.7} metalness={0.4} roughness={0.3} transparent opacity={0.85} />
        </mesh>
      </group>

      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.14} map={particleTexture} transparent depthWrite={false} blending={THREE.AdditiveBlending} color={0x7dfce8} opacity={0.85} />
      </points>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color={0x02050a} metalness={0.9} roughness={0.35} envMapIntensity={0.6} />
      </mesh>
    </>
  );
}

export default function LuxuryEmblemScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.2, 15], fov: 45 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.15;
        scene.background = new THREE.Color(0x010204);
        scene.fog = new THREE.FogExp2(0x010204, 0.035);
      }}
    >
      <Environment resolution={32}>
        <mesh position={[8, 6, -4]}><sphereGeometry args={[2, 16, 16]} /><meshBasicMaterial color={0x1de9c8} /></mesh>
        <mesh position={[-9, 4, 6]}><sphereGeometry args={[3, 16, 16]} /><meshBasicMaterial color={0x2e8b57} /></mesh>
        <mesh position={[0, -8, 5]}><sphereGeometry args={[1.5, 16, 16]} /><meshBasicMaterial color={0x3aa8ff} /></mesh>
      </Environment>
      <EmblemModel />
    </Canvas>
  );
}
