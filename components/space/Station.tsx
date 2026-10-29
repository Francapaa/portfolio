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
  const group = useRef<THREE.Group>(null);
  const planet = useRef<THREE.Mesh>(null);
  const atmosphere = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const isDocked = dockedId === station.id;
  const r = 1.35 * station.scale;

  const surfaceMat = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createLinearGradient(0, 0, 256, 128);
    grad.addColorStop(0, station.color);
    grad.addColorStop(0.45, station.atmosphere);
    grad.addColorStop(1, "#1c0a05");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 128);
    // procedural bands / craters
    for (let i = 0; i < 18; i++) {
      ctx.fillStyle = `rgba(0,0,0,${0.08 + Math.random() * 0.12})`;
      ctx.beginPath();
      ctx.ellipse(
        Math.random() * 256,
        Math.random() * 128,
        8 + Math.random() * 28,
        3 + Math.random() * 10,
        Math.random() * Math.PI,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    for (let i = 0; i < 12; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.04 + Math.random() * 0.08})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * 256,
        Math.random() * 128,
        2 + Math.random() * 6,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.needsUpdate = true;
    return new THREE.MeshStandardMaterial({
      map,
      color: "#ffffff",
      emissive: station.color,
      emissiveIntensity: isDocked ? 0.45 : 0.18,
      metalness: 0.15,
      roughness: 0.72,
    });
  }, [station.color, station.atmosphere, isDocked]);

  const atmosphereMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: station.atmosphere,
        transparent: true,
        opacity: isDocked ? 0.28 : 0.16,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [station.atmosphere, isDocked]
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: station.atmosphere,
        emissive: station.atmosphere,
        emissiveIntensity: isDocked ? 0.8 : 0.35,
        metalness: 0.4,
        roughness: 0.35,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      }),
    [station.atmosphere, isDocked]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (planet.current) {
      planet.current.rotation.y = t * 0.12 + station.position[0] * 0.01;
    }
    if (atmosphere.current) {
      atmosphere.current.rotation.y = -t * 0.05;
      const pulse = 1 + Math.sin(t * 1.6 + station.position[2]) * 0.015;
      atmosphere.current.scale.setScalar(pulse);
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.25;
    }
  });

  return (
    <group ref={group} position={station.position}>
      <Float speed={0.9} rotationIntensity={0.08} floatIntensity={0.35}>
        {/* Planet body */}
        <mesh
          ref={planet}
          material={surfaceMat}
          castShadow
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
          <sphereGeometry args={[r, 64, 64]} />
        </mesh>

        {/* Atmosphere halo */}
        <mesh ref={atmosphere} material={atmosphereMat} scale={1.12}>
          <sphereGeometry args={[r, 48, 48]} />
        </mesh>

        {/* Orbital ring */}
        <mesh
          ref={ring}
          rotation={[Math.PI / 2.6, 0.15, 0]}
          material={ringMat}
        >
          <torusGeometry args={[r * 1.85, r * 0.045, 12, 96]} />
        </mesh>

        {/* Inner thin ring */}
        <mesh rotation={[Math.PI / 2.4, -0.1, 0.4]}>
          <torusGeometry args={[r * 1.55, r * 0.018, 8, 80]} />
          <meshBasicMaterial
            color={station.atmosphere}
            transparent
            opacity={0.45}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Beacon light */}
        <pointLight
          position={[0, r * 1.4, 0]}
          intensity={isDocked ? 1.6 : 0.7}
          color={station.atmosphere}
          distance={14}
        />
      </Float>

      <Html
        center
        distanceFactor={20}
        position={[0, r * 1.9, 0]}
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
