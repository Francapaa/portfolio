"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { STATIONS } from "@/lib/stations";
import { useSpace } from "./SpaceContext";
import { StationContent } from "./StationContent";

export function DockPanel() {
  const { dockedId, undock, lang } = useSpace();
  const station = STATIONS.find((s) => s.id === dockedId);

  return (
    <AnimatePresence>
      {dockedId && station && (
        <motion.aside
          className="dock-panel"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          role="dialog"
          aria-label={station.label[lang]}
        >
          <header className="dock-panel-header">
            <div>
              <p className="eyebrow">{lang === "es" ? "ESTACIÓN" : "STATION"}</p>
              <h2>{station.label[lang]}</h2>
            </div>
            <button
              type="button"
              className="dock-close"
              onClick={undock}
              aria-label={lang === "es" ? "Desacoplar" : "Undock"}
            >
              <X size={18} />
              <span>{lang === "es" ? "Despegar" : "Undock"}</span>
            </button>
          </header>
          <div className="dock-panel-body">
            <StationContent stationId={dockedId} lang={lang} />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
