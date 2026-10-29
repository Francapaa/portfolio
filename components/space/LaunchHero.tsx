"use client";

import { motion } from "motion/react";
import { useSpace } from "./SpaceContext";

export function LaunchHero() {
  const { launched, launch, lang, reducedMotion } = useSpace();

  if (launched) return null;

  return (
    <motion.section
      className="launch-hero"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-label="Francisco Caparruva portfolio introduction"
    >
      <div className="launch-atmosphere" aria-hidden />
      <div className="launch-grain" aria-hidden />
      <div className="launch-content">
        <motion.p
          className="launch-kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {lang === "es" ? "PORTFOLIO · BUENOS AIRES" : "PORTFOLIO · BUENOS AIRES"}
        </motion.p>
        <motion.h1
          className="launch-brand"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Francisco
          <br />
          Caparruva
        </motion.h1>
        <motion.p
          className="launch-tagline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.55 }}
        >
          {lang === "es"
            ? "Software & AI Engineer — navegá la constelación de mi trabajo."
            : "Software & AI Engineer — fly the constellation of my work."}
        </motion.p>
        <motion.button
          type="button"
          className="launch-cta"
          onClick={launch}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={reducedMotion ? undefined : { scale: 1.04 }}
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
        >
          {lang === "es" ? "DESPEGAR" : "LAUNCH"}
        </motion.button>
      </div>
    </motion.section>
  );
}
