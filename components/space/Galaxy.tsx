"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function NebulaCloud({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    [color]
  );

  useFrame((_, dt) => {
    if (!mesh.current) return;
    mesh.current.rotation.z += dt * 0.02;
    mesh.current.rotation.y += dt * 0.01;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale} material={mat}>
      <sphereGeometry args={[1, 24, 24]} />
    </mesh>
  );
}

export function Galaxy() {
  return (
    <>
      <color attach="background" args={["#030712"]} />
      <fog attach="fog" args={["#030712", 40, 120]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[20, 30, 10]} intensity={1.2} color="#5eead4" />
      <pointLight position={[-25, -10, -15]} intensity={0.7} color="#fbbf24" />
      <Stars
        radius={90}
        depth={50}
        count={2800}
        factor={3.2}
        saturation={0.15}
        fade
        speed={0.4}
      />
      <NebulaCloud position={[-30, 8, -40]} color="#0d9488" scale={28} />
      <NebulaCloud position={[35, -12, -25]} color="#0891b2" scale={22} />
      <NebulaCloud position={[5, 20, 30]} color="#155e75" scale={32} />
    </>
  );
}
