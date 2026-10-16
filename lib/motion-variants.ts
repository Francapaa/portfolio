import type { Variants } from "motion/react";

export function getGridVariants(reduceMotion: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.07,
        delayChildren: reduceMotion ? 0 : 0.04,
      },
    },
  };
}

export function getCardVariants(reduceMotion: boolean): Variants {
  return {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 14,
      filter: reduceMotion ? "blur(0px)" : "blur(3px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 24,
        mass: 0.6,
      },
    },
  };
}

export function getStackVariants(reduceMotion: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };
}
