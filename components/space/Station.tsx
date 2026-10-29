"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";
import type { StationDef } from "@/lib/stations";
import { useSpace } from "./SpaceContext";

interface StationProps {
  station: StationDef;
}

export function Station({ station }: StationProps) {
  const { lang, dockedId, requestFlyTo, launched } = useSpace();
  const ring = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const isDocked = dockedId === station.id;
  const isHome = station.id === "home";

  const coreMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: station.color,
        emissive: station.color,
        emissiveIntensity: isDocked ? 1.4 : 0.55,
        metalness: 0.35,
        roughness: 0.25,
      }),
    [station.color, isDocked]
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: station.color,
        transparent: true,
        opacity: isDocked ? 0.85 : 0.45,
        side: THREE.DoubleSide,
      }),
    [station.color, isDocked]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring.current) {
      ring.current.rotation.z = t * 0.35;
      ring.current.rotation.x = Math.sin(t * 0.2) * 0.25;
    }
    if (core.current) {
      const pulse = 1 + Math.sin(t * 2 + station.position[0]) * 0.04;
      core.current.scale.setScalar(pulse * (isHome ? 1.35 : 1));
    }
  });

  return (
    <group position={station.position}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh
          ref={core}
          material={coreMat}
          onClick={(e) => {
            e.stopPropagation();
            if (launched) requestFlyTo(station.id);
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
        >
          {isHome ? (
            <icosahedronGeometry args={[1.4, 1]} />
          ) : (
            <octahedronGeometry args={[1.1, 0]} />
          )}
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]} material={ringMat}>
          <torusGeometry args={[isHome ? 2.4 : 2, 0.04, 8, 64]} />
        </mesh>
        {!isHome && (
          <mesh rotation={[0, 0, Math.PI / 3]} material={ringMat}>
            <torusGeometry args={[2.4, 0.025, 8, 48]} />
          </mesh>
        )}
      </Float>

      <Html
        center
        distanceFactor={18}
        style={{ pointerEvents: "none", userSelect: "none" }}
        zIndexRange={[10, 0]}
      >
        <div className={`station-label ${isDocked ? "is-docked" : ""}`}>
          {station.label[lang]}
        </div>
      </Html>
    </group>
  );
}
