"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import type { ShipInput } from "@/hooks/useShipControls";
import { STATIONS } from "@/lib/stations";
import { Galaxy } from "./Galaxy";
import { Station } from "./Station";
import { Ship } from "./Ship";
import { useSpace } from "./SpaceContext";

interface SpaceSceneProps {
  inputRef: MutableRefObject<ShipInput>;
  controlsEnabled: boolean;
}

function SceneInner({
  inputRef,
  controlsEnabled,
}: SpaceSceneProps) {
  return (
    <>
      <Galaxy />
      {STATIONS.map((station) => (
        <Station key={station.id} station={station} />
      ))}
      <Ship inputRef={inputRef} controlsEnabled={controlsEnabled} />
    </>
  );
}

export function SpaceScene({ inputRef, controlsEnabled }: SpaceSceneProps) {
  const { setWebglFailed } = useSpace();

  return (
    <Canvas
      className="space-canvas"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 4, 20], fov: 55, near: 0.1, far: 200 }}
      onCreated={({ gl }) => {
        gl.setClearColor("#030712");
        const canvas = gl.domElement;
        const onContextLost = (e: Event) => {
          e.preventDefault();
          setWebglFailed(true);
        };
        canvas.addEventListener("webglcontextlost", onContextLost, false);
      }}
    >
      <Suspense fallback={null}>
        <SceneInner inputRef={inputRef} controlsEnabled={controlsEnabled} />
      </Suspense>
    </Canvas>
  );
}
