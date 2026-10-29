"use client";

import { useCallback, useRef } from "react";
import { STATIONS } from "@/lib/stations";
import { useSpace } from "./SpaceContext";

interface FlightHUDProps {
  setStick: (x: number, y: number) => void;
  resetStick: () => void;
}

export function FlightHUD({ setStick, resetStick }: FlightHUDProps) {
  const {
    launched,
    lang,
    setLang,
    dockedId,
    requestFlyTo,
    reducedMotion,
    flyToId,
  } = useSpace();
  const padRef = useRef<HTMLDivElement>(null);
  const activeTouch = useRef<number | null>(null);

  const updateFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      const el = padRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const x = (clientX - cx) / (rect.width / 2);
      const y = (clientY - cy) / (rect.height / 2);
      setStick(x, y);
    },
    [setStick]
  );

  if (!launched) return null;

  return (
    <div className="flight-hud" aria-live="polite">
      <div className="hud-top">
        <div className="hud-brand">
          <span className="hud-mark">FC</span>
          <span className="hud-status">
            {dockedId
              ? lang === "es"
                ? "ACOPLADO"
                : "DOCKED"
              : flyToId
                ? lang === "es"
                  ? "EN RUTA"
                  : "EN ROUTE"
                : lang === "es"
                  ? "EN VUELO"
                  : "IN FLIGHT"}
          </span>
        </div>
        <div className="hud-actions">
          <button
            type="button"
            className={`lang-toggle ${lang === "es" ? "active" : ""}`}
            onClick={() => setLang("es")}
            aria-pressed={lang === "es"}
          >
            ES
          </button>
          <button
            type="button"
            className={`lang-toggle ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
          >
            EN
          </button>
        </div>
      </div>

      <div className="hud-radar" aria-label={lang === "es" ? "Radar" : "Radar"}>
        <p className="eyebrow">
          {lang === "es" ? "CONSTELACIÓN" : "CONSTELLATION"}
        </p>
        <ul>
          {STATIONS.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                className={
                  dockedId === s.id || flyToId === s.id ? "is-active" : ""
                }
                style={{ ["--station-color" as string]: s.color }}
                onClick={() => requestFlyTo(s.id)}
              >
                <span className="radar-dot" />
                {s.label[lang]}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {!reducedMotion && !dockedId && (
        <>
          <p className="hud-hints">
            {lang === "es"
              ? "WASD / flechas · Espacio impulso · R/F pitch · Radar para saltar"
              : "WASD / arrows · Space thrust · R/F pitch · Radar to jump"}
          </p>
          <div
            ref={padRef}
            className="virtual-stick"
            aria-label={lang === "es" ? "Joystick" : "Joystick"}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              activeTouch.current = e.pointerId;
              updateFromPoint(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => {
              if (activeTouch.current !== e.pointerId) return;
              updateFromPoint(e.clientX, e.clientY);
            }}
            onPointerUp={(e) => {
              if (activeTouch.current !== e.pointerId) return;
              activeTouch.current = null;
              resetStick();
            }}
            onPointerCancel={() => {
              activeTouch.current = null;
              resetStick();
            }}
          >
            <span className="stick-knob" />
          </div>
        </>
      )}
    </div>
  );
}
