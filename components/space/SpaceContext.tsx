"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang, StationId } from "@/lib/stations";
import { getStation } from "@/lib/stations";

interface SpaceContextValue {
  launched: boolean;
  launch: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  dockedId: StationId | null;
  dock: (id: StationId) => void;
  undock: () => void;
  /** Request teleport / fly-to from radar (sets pending target). */
  flyToId: StationId | null;
  requestFlyTo: (id: StationId) => void;
  clearFlyTo: () => void;
  reducedMotion: boolean;
  webglFailed: boolean;
  setWebglFailed: (v: boolean) => void;
}

const SpaceContext = createContext<SpaceContextValue | null>(null);

export function SpaceProvider({
  children,
  reducedMotion,
}: {
  children: ReactNode;
  reducedMotion: boolean;
}) {
  const [launched, setLaunched] = useState(false);
  const [lang, setLang] = useState<Lang>("es");
  const [dockedId, setDockedId] = useState<StationId | null>(null);
  const [flyToId, setFlyToId] = useState<StationId | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  const launch = useCallback(() => setLaunched(true), []);
  const dock = useCallback((id: StationId) => {
    setDockedId(id);
    setFlyToId(null);
  }, []);
  const undock = useCallback(() => setDockedId(null), []);
  const requestFlyTo = useCallback(
    (id: StationId) => {
      if (reducedMotion) {
        setDockedId(id);
        setFlyToId(null);
        return;
      }
      setDockedId(null);
      setFlyToId(id);
      // Ensure station exists
      void getStation(id);
    },
    [reducedMotion]
  );
  const clearFlyTo = useCallback(() => setFlyToId(null), []);

  const value = useMemo(
    () => ({
      launched,
      launch,
      lang,
      setLang,
      dockedId,
      dock,
      undock,
      flyToId,
      requestFlyTo,
      clearFlyTo,
      reducedMotion,
      webglFailed,
      setWebglFailed,
    }),
    [
      launched,
      launch,
      lang,
      dockedId,
      dock,
      undock,
      flyToId,
      requestFlyTo,
      clearFlyTo,
      reducedMotion,
      webglFailed,
    ]
  );

  return (
    <SpaceContext.Provider value={value}>{children}</SpaceContext.Provider>
  );
}

export function useSpace() {
  const ctx = useContext(SpaceContext);
  if (!ctx) throw new Error("useSpace must be used within SpaceProvider");
  return ctx;
}
