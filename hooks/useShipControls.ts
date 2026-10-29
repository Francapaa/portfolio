"use client";

import { useEffect, useRef } from "react";

export interface ShipInput {
  forward: number;
  yaw: number;
  pitch: number;
  /** Touch / virtual stick axes in [-1, 1] */
  stickX: number;
  stickY: number;
}

const idle: ShipInput = {
  forward: 0,
  yaw: 0,
  pitch: 0,
  stickX: 0,
  stickY: 0,
};

/**
 * Keyboard + optional virtual-stick input for the space ship.
 * Returns a stable ref mutated every frame by event handlers.
 */
export function useShipControls(enabled: boolean) {
  const input = useRef<ShipInput>({ ...idle });

  useEffect(() => {
    if (!enabled) {
      input.current = { ...idle };
      return;
    }

    const keys = new Set<string>();

    const syncFromKeys = () => {
      const i = input.current;
      i.forward =
        (keys.has("KeyW") || keys.has("ArrowUp") ? 1 : 0) -
        (keys.has("KeyS") || keys.has("ArrowDown") ? 1 : 0);
      i.yaw =
        (keys.has("KeyA") || keys.has("ArrowLeft") ? 1 : 0) -
        (keys.has("KeyD") || keys.has("ArrowRight") ? 1 : 0);
      i.pitch =
        (keys.has("KeyR") || keys.has("PageUp") ? 1 : 0) -
        (keys.has("KeyF") || keys.has("PageDown") ? 1 : 0);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      keys.add(e.code);
      if (
        [
          "KeyW",
          "KeyA",
          "KeyS",
          "KeyD",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "KeyR",
          "KeyF",
          "PageUp",
          "PageDown",
          "Space",
        ].includes(e.code)
      ) {
        e.preventDefault();
      }
      if (e.code === "Space") {
        input.current.forward = Math.max(input.current.forward, 1);
      }
      syncFromKeys();
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keys.delete(e.code);
      syncFromKeys();
    };

    const onBlur = () => {
      keys.clear();
      input.current = { ...idle, stickX: input.current.stickX, stickY: input.current.stickY };
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      input.current = { ...idle };
    };
  }, [enabled]);

  const setStick = (x: number, y: number) => {
    input.current.stickX = Math.max(-1, Math.min(1, x));
    input.current.stickY = Math.max(-1, Math.min(1, y));
  };

  const resetStick = () => {
    input.current.stickX = 0;
    input.current.stickY = 0;
  };

  return { input, setStick, resetStick };
}
