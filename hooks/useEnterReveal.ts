"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Hero enter flow: scroll restoration on mount, `entered` flag with smooth
 * scroll into the portfolio room, and body scroll-lock while the intro
 * is on screen.
 */
export function useEnterReveal(onEnter?: () => void) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);

  const handleEnter = useCallback(() => {
    onEnter?.();
    setEntered(true);
    requestAnimationFrame(() => {
      document
        .querySelector(".portfolio-room")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [onEnter]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (!entered) {
      root.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      root.style.overflow = "";
      body.style.overflow = "";
    }
    return () => {
      root.style.overflow = "";
      body.style.overflow = "";
    };
  }, [entered]);

  return { entered, reveal: entered ? 1 : 0, handleEnter };
}
