"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";

/**
 * The hero's intelligence ecosystem.
 *
 * Hand-rolled geometry rather than a loaded model: it keeps the bundle small,
 * lets every colour come from the same aurora ribbon the CSS uses, and means
 * the scene degrades to a CSS fallback with no missing-asset risk. Glow is
 * faked with additive sprite shells rather than a real post-processing bloom
 * pass — EffectComposer roughly doubles the frame cost of what is already the
 * heaviest element on the page, for a difference few visitors would name.
 */

/** Five platform pillars, arranged as an orbital shell around the brandmark. */
const nodes: { position: [number, number, number]; color: string; scale: number }[] = [
  { position: [-3.4, 1.95, -0.35], color: "#5eead4", scale: 1 },
  { position: [3.3, 1.7, 0.2], color: "#22d3ee", scale: 0.94 },
  { position: [3.7, -1.7, -0.2], color: "#60a5fa", scale: 1.06 },
  { position: [-3.2, -2.1, 0.15], color: "#a78bfa", scale: 0.97 },
  { position: [0.1, -3.3, -0.45], color: "#f0abfc", scale: 0.9 },
];

/** Orbital shells. Varying radius, tilt and speed is what sells depth — a
 *  single ring reads as a flat decal no matter how bright it is. */
const rings: { radius: number; tube: number; tilt: [number, number, number]; color: string; opacity: number; speed: number }[] = [
  { radius: 2.95, tube: 0.014, tilt: [1.34, 0.38, 0.85], color: "#5eead4", opacity: 0.5, speed: -0.05 },
  { radius: 3.62, tube: 0.016, tilt: [1.18, 0.12, 0], color: "#60a5fa", opacity: 0.42, speed: 0.07 },
  { radius: 4.3, tube: 0.011, tilt: [1.2, -0.3, 0.4], color: "#a78bfa", opacity: 0.32, speed: 0.033 },
  { radius: 5.05, tube: 0.008, tilt: [1.46, 0.22, -0.5], color: "#f0abfc", opacity: 0.22, speed: -0.024 },
];

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function IntelligenceNetwork() {
  const group = useRef<THREE.Group>(null);
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);
  const dust = useRef<THREE.Points>(null);
  const pulses = useRef<THREE.Group>(null);
  const satellites = useRef<THREE.Group>(null);
  const logoTexture = useLoader(THREE.TextureLoader, "/brand/preventa-ai-symbol.png");
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => true);

  const lines = useMemo(() => {
    const points: number[] = [];
    for (const node of nodes) points.push(0, 0, 0, ...node.position);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, []);

  // Ambient dust. Golden-angle distribution avoids the visible spiral banding
  // a naive linear step produces.
  const { dustPositions, dustColors } = useMemo(() => {
    const count = 460;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color("#5eead4"), new THREE.Color("#22d3ee"), new THREE.Color("#60a5fa"), new THREE.Color("#a78bfa"), new THREE.Color("#f0abfc")];
    for (let i = 0; i < count; i += 1) {
      const angle = i * 2.399963;
      const radius = 2.0 + ((i * 47) % 100) / 19;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.68;
      positions[i * 3 + 2] = -3.2 + ((i * 31) % 100) / 17;
      const tint = palette[i % palette.length];
      colors[i * 3] = tint.r; colors[i * 3 + 1] = tint.g; colors[i * 3 + 2] = tint.b;
    }
    return { dustPositions: positions, dustColors: colors };
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!group.current || reducedMotion) return;
    const t = clock.getElapsedTime();

    group.current.rotation.y = Math.sin(t * 0.2) * 0.1 + pointer.x * 0.16;
    group.current.rotation.x = Math.cos(t * 0.16) * 0.03 - pointer.y * 0.09;
    group.current.position.y = Math.sin(t * 0.5) * 0.08;

    rings.forEach((ring, index) => {
      const mesh = ringRefs.current[index];
      if (mesh) mesh.rotation.z = t * ring.speed;
    });
    if (dust.current) dust.current.rotation.y = t * 0.022;

    // Signal pulses travelling core → node, staggered per node.
    if (pulses.current) {
      pulses.current.children.forEach((child, index) => {
        const phase = (t * 0.42 + index * 0.2) % 1;
        const target = nodes[index].position;
        child.position.set(target[0] * phase, target[1] * phase, target[2] * phase);
        const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        material.opacity = Math.sin(phase * Math.PI) * 0.9;
      });
    }

    // Small satellites tracing the inner shell.
    if (satellites.current) {
      satellites.current.children.forEach((child, index) => {
        const a = t * (0.24 + index * 0.05) + index * 2.1;
        const r = 2.35 + index * 0.42;
        child.position.set(Math.cos(a) * r, Math.sin(a) * r * 0.55, Math.sin(a * 0.7) * 0.7);
      });
    }
  });

  return (
    <group ref={group}>
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[dustColors, 3]} />
        </bufferGeometry>
        <pointsMaterial vertexColors size={0.038} transparent opacity={0.8} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#7dd3fc" transparent opacity={0.32} />
      </lineSegments>

      <group ref={pulses}>
        {nodes.map((node, index) => (
          <mesh key={index}>
            <sphereGeometry args={[0.062, 12, 12]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.85} depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        ))}
      </group>

      <group ref={satellites}>
        {[0, 1, 2].map((index) => (
          <mesh key={index}>
            <sphereGeometry args={[0.045, 10, 10]} />
            <meshBasicMaterial color="#a5f6e6" transparent opacity={0.75} depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        ))}
      </group>

      {rings.map((ring, index) => (
        <mesh key={index} ref={(mesh) => { ringRefs.current[index] = mesh; }} rotation={ring.tilt}>
          <torusGeometry args={[ring.radius, ring.tube, 8, 200]} />
          <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} />
        </mesh>
      ))}

      {/* Brandmark core, floating on a lit pedestal rather than a flat white card */}
      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[2.42, 2.62, 0.16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.16} metalness={0.22} envMapIntensity={1.2} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[2.3, 2.5]} />
        <meshBasicMaterial map={logoTexture} toneMapped={false} />
      </mesh>
      {/* Layered additive haloes — the "bloom" without a composer pass */}
      <mesh position={[0, 0, -0.45]}>
        <planeGeometry args={[5.4, 5.4]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.12} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[0, 0, -0.6]}>
        <planeGeometry args={[8.6, 8.6]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.075} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {nodes.map((node, index) => (
        <group position={node.position} key={index} scale={node.scale}>
          <mesh>
            <sphereGeometry args={[0.19, 26, 26]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.95} roughness={0.18} />
          </mesh>
          <mesh scale={2}>
            <sphereGeometry args={[0.19, 18, 18]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.16} depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh scale={3.6}>
            <sphereGeometry args={[0.19, 14, 14]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.06} depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function IntelligenceScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 9.4], fov: 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="always"
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 6]} intensity={2.3} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={18} distance={11} color="#5eead4" />
      <pointLight position={[4, 3, -2]} intensity={15} distance={12} color="#a78bfa" />
      <pointLight position={[0, -4, 4]} intensity={10} distance={10} color="#60a5fa" />
      <IntelligenceNetwork />
    </Canvas>
  );
}
