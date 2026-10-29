"use client";

import dynamic from "next/dynamic";
import type { MutableRefObject } from "react";
import type { ShipInput } from "@/hooks/useShipControls";

const SpaceScene = dynamic(
  () => import("./SpaceScene").then((m) => m.SpaceScene),
  {
    ssr: false,
    loading: () => <div className="space-canvas-fallback" aria-hidden />,
  }
);

export function SpaceCanvas({
  inputRef,
  controlsEnabled,
}: {
  inputRef: MutableRefObject<ShipInput>;
  controlsEnabled: boolean;
}) {
  return <SpaceScene inputRef={inputRef} controlsEnabled={controlsEnabled} />;
}
