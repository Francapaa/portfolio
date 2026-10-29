"use client";

import { STATIONS } from "@/lib/stations";
import { useSpace } from "./SpaceContext";
import { StationContent } from "./StationContent";

/** 2D fallback when WebGL fails or reduced-motion prefers list nav. */
export function FallbackNav({ force = false }: { force?: boolean }) {
  const {
    webglFailed,
    reducedMotion,
    launched,
    lang,
    dockedId,
    requestFlyTo,
    setLang,
  } = useSpace();

  const show = force || (launched && (webglFailed || reducedMotion));
  if (!show) return null;

  const active = dockedId ?? "home";

  return (
    <div className={`fallback-nav ${webglFailed ? "is-overlay" : ""}`}>
      <div className="fallback-toolbar">
        <p className="eyebrow">
          {webglFailed
            ? lang === "es"
              ? "Modo lista (WebGL no disponible)"
              : "List mode (WebGL unavailable)"
            : lang === "es"
              ? "Navegación accesible"
              : "Accessible navigation"}
        </p>
        <div className="hud-actions">
          <button
            type="button"
            className={`lang-toggle ${lang === "es" ? "active" : ""}`}
            onClick={() => setLang("es")}
          >
            ES
          </button>
          <button
            type="button"
            className={`lang-toggle ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
        </div>
      </div>
      <nav className="fallback-tabs" aria-label="Stations">
        {STATIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={active === s.id ? "is-active" : ""}
            onClick={() => requestFlyTo(s.id)}
          >
            {s.label[lang]}
          </button>
        ))}
      </nav>
      <div className="fallback-body">
        <StationContent stationId={active} lang={lang} />
      </div>
    </div>
  );
}
