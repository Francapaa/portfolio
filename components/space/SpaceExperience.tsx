"use client";

import { useEffect, useMemo, useState } from "react";
import { useShipControls } from "@/hooks/useShipControls";
import { SpaceProvider, useSpace } from "./SpaceContext";
import { SpaceCanvas } from "./SpaceCanvas";
import { LaunchHero } from "./LaunchHero";
import { FlightHUD } from "./FlightHUD";
import { DockPanel } from "./DockPanel";
import { FallbackNav } from "./FallbackNav";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function SpaceShell() {
  const { launched, dockedId, reducedMotion, webglFailed } = useSpace();
  const controlsOn = launched && !dockedId && !reducedMotion && !webglFailed;
  const { input, setStick, resetStick } = useShipControls(controlsOn);

  return (
    <div className="space-shell">
      {!webglFailed && (
        <div className="space-stage" aria-hidden={reducedMotion}>
          <SpaceCanvas inputRef={input} controlsEnabled={controlsOn} />
        </div>
      )}

      <LaunchHero />
      {!webglFailed && !reducedMotion && (
        <FlightHUD setStick={setStick} resetStick={resetStick} />
      )}
      {!webglFailed && !reducedMotion && <DockPanel />}
      <FallbackNav />
    </div>
  );
}

export function SpaceExperience() {
  const reducedMotion = usePrefersReducedMotion();
  const providerKey = useMemo(
    () => (reducedMotion ? "rm" : "full"),
    [reducedMotion]
  );

  return (
    <SpaceProvider key={providerKey} reducedMotion={reducedMotion}>
      <SpaceShell />
    </SpaceProvider>
  );
}
