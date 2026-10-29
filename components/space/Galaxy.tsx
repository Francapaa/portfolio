"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function NebulaCloud({
  position,
  color,
  scale,
  opacity = 0.1,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  opacity?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    [color, opacity]
  );

  useFrame((_, dt) => {
    if (!mesh.current) return;
    mesh.current.rotation.z += dt * 0.015;
    mesh.current.rotation.y += dt * 0.008;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale} material={mat}>
      <sphereGeometry args={[1, 32, 32]} />
    </mesh>
  );
}

export function Galaxy() {
  return (
    <>
      <color attach="background" args={["#0a0604"]} />
      <fog attach="fog" args={["#0a0604", 48, 130]} />
      <ambientLight intensity={0.28} />
      <hemisphereLight args={["#ffedd5", "#1c0a05", 0.55]} />
      <pointLight position={[22, 28, 12]} intensity={1.35} color="#fb923c" />
      <pointLight position={[-28, -8, -18]} intensity={0.55} color="#fbbf24" />
      <directionalLight
        position={[10, 20, 8]}
        intensity={0.65}
        color="#fff7ed"
      />
      <Stars
        radius={100}
        depth={55}
        count={3200}
        factor={3.4}
        saturation={0.35}
        fade
        speed={0.35}
      />
      <NebulaCloud position={[-32, 10, -38]} color="#ea580c" scale={30} opacity={0.09} />
      <NebulaCloud position={[38, -14, -22]} color="#c2410c" scale={24} opacity={0.08} />
      <NebulaCloud position={[6, 18, 32]} color="#9a3412" scale={34} opacity={0.07} />
      <NebulaCloud position={[-10, -20, 10]} color="#fbbf24" scale={18} opacity={0.05} />
    </>
  );
}
