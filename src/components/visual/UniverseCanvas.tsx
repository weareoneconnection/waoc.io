"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 760;
const CONNECTION_COUNT = 120;

type SceneProps = {
  progress: number;
  act: number;
  reducedMotion: boolean;
};

function seededRandom(seed: number) {
  const value = Math.sin(seed * 999.91) * 43758.5453;
  return value - Math.floor(value);
}

function ConnectionWorld({ progress, act, reducedMotion }: SceneProps) {
  const points = useRef<THREE.Points>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const core = useRef<THREE.Mesh>(null);
  const pointerTarget = useRef(new THREE.Vector2());
  const { pointer, viewport } = useThree();

  const { basePositions, linePositions, colors } = useMemo(() => {
    const base = new Float32Array(PARTICLE_COUNT * 3);
    const particleColors = new Float32Array(PARTICLE_COUNT * 3);
    const warm = new THREE.Color("#ff6a00");
    const white = new THREE.Color("#efe9df");

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const radius = 2.2 + seededRandom(i + 1) * 8.8;
      const theta = seededRandom(i + 11) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i + 29) - 1);
      const flatten = 0.46 + seededRandom(i + 71) * 0.54;
      base[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      base[i * 3 + 1] = Math.cos(phi) * radius * flatten;
      base[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
      const color = seededRandom(i + 91) > 0.82 ? warm : white;
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    const connections = new Float32Array(CONNECTION_COUNT * 2 * 3);
    for (let i = 0; i < CONNECTION_COUNT; i += 1) {
      const a = Math.floor(seededRandom(i + 331) * PARTICLE_COUNT);
      const b = Math.floor(seededRandom(i + 661) * PARTICLE_COUNT);
      connections.set(base.subarray(a * 3, a * 3 + 3), i * 6);
      connections.set(base.subarray(b * 3, b * 3 + 3), i * 6 + 3);
    }

    return { basePositions: base, linePositions: connections, colors: particleColors };
  }, []);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(basePositions.slice(), 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [basePositions, colors]);

  const lineGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return g;
  }, [linePositions]);

  useFrame((state, delta) => {
    pointerTarget.current.lerp(pointer, 0.035);
    const time = state.clock.elapsedTime;
    const phase = progress * Math.PI * 2;
    const groupRotation = reducedMotion ? 0 : time * 0.018 + progress * 0.55;

    if (points.current) {
      points.current.rotation.y = groupRotation + pointerTarget.current.x * 0.08;
      points.current.rotation.x = -0.14 + pointerTarget.current.y * 0.05 + Math.sin(phase) * 0.03;
      const targetScale = 0.9 + act * 0.055;
      points.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), Math.min(1, delta * 1.8));
      const attribute = points.current.geometry.attributes.position as THREE.BufferAttribute;
      if (!reducedMotion) {
        for (let i = 0; i < PARTICLE_COUNT; i += 1) {
          const index = i * 3;
          const pulse = Math.sin(time * 0.38 + i * 0.17 + phase) * 0.035;
          attribute.array[index + 1] = basePositions[index + 1] + pulse;
        }
        attribute.needsUpdate = true;
      }
    }

    if (lines.current) {
      lines.current.rotation.y = groupRotation * 0.94 + pointerTarget.current.x * 0.06;
      lines.current.rotation.x = -0.14 + pointerTarget.current.y * 0.04;
      const material = lines.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.05 + Math.min(0.22, act * 0.032 + progress * 0.08);
    }

    if (core.current) {
      core.current.rotation.x += reducedMotion ? 0 : delta * 0.06;
      core.current.rotation.y += reducedMotion ? 0 : delta * 0.08;
      const scale = 0.58 + Math.sin(time * 0.65) * 0.025 + act * 0.018;
      core.current.scale.setScalar(scale);
    }

    state.camera.position.x += ((pointerTarget.current.x * viewport.width * 0.028) - state.camera.position.x) * 0.018;
    state.camera.position.y += ((pointerTarget.current.y * viewport.height * 0.018) - state.camera.position.y) * 0.018;
  });

  return (
    <group position={[0, 0, 0]}>
      <points ref={points} geometry={geometry}>
        <pointsMaterial
          vertexColors
          size={0.035}
          transparent
          opacity={0.82}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={lines} geometry={lineGeometry}>
        <lineBasicMaterial color="#ff7a1a" transparent opacity={0.09} depthWrite={false} />
      </lineSegments>
      <mesh ref={core}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial color="#ff6a00" transparent opacity={0.08} wireframe />
      </mesh>
      <mesh scale={1.15}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ff6a00" transparent opacity={0.015} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export default function UniverseCanvas(props: SceneProps) {
  return (
    <div className="universeCanvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 12.5], fov: 52, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#050403", 10, 25]} />
        <ConnectionWorld {...props} />
      </Canvas>
    </div>
  );
}
