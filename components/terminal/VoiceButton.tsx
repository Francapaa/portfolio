"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

type Lang = "es-AR" | "en-US";

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
}

declare global {
  interface Window {
    SpeechRecognition: unknown;
    webkitSpeechRecognition: unknown;
  }
}

type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: { results: SpeechRecognitionResultList }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  onspeechend: (() => void) | null;
};

export function VoiceButton({ onTranscript, className }: VoiceButtonProps) {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [lang, setLang] = useState<Lang>("es-AR");
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const isListeningRef = useRef(false);

  useEffect(() => {
    const hasSupport =
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
    setIsSupported(hasSupport);

    // Auto-detect browser language
    if (typeof navigator !== "undefined") {
      const navLang = navigator.language?.toLowerCase() ?? "";
      if (navLang.startsWith("en")) setLang("en-US");
      else setLang("es-AR");
    }
  }, []);

  const createRecognition = useCallback((): SpeechRecognitionInstance | null => {
    if (typeof window === "undefined") return null;
    const Ctor =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition;
    if (!Ctor) return null;
    const rec = new Ctor();
    rec.lang = lang;
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    return rec;
  }, [lang]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
    isListeningRef.current = false;
  }, []);

  const start = useCallback(() => {
    if (!isSupported) return;
    if (isListeningRef.current) {
      stop();
      return;
    }

    const rec = createRecognition();
    if (!rec) return;
    recognitionRef.current = rec;
    isListeningRef.current = true;
    setIsListening(true);

    let finalTranscript = "";

    rec.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = event.results.length - 1; i >= 0; i--) {
        const result = event.results[i];
        const transcript = result[0]?.transcript ?? "";
        if (result.isFinal) {
          final = transcript;
          break;
        } else {
          interim = transcript;
        }
      }
      // Show interim as preview but not commit until final
      if (final) {
        finalTranscript = final;
      } else if (interim) {
        // optional: could show interim via onTranscript interim, but we wait for final
      }
    };

    rec.onerror = (e) => {
      // eslint-disable-next-line no-console
      console.warn("SpeechRecognition error", e.error);
      setIsListening(false);
      isListeningRef.current = false;
    };

    rec.onend = () => {
      setIsListening(false);
      isListeningRef.current = false;
      if (finalTranscript.trim()) {
        onTranscript(finalTranscript.trim());
      }
      recognitionRef.current = null;
    };

    rec.onstart = () => {
      setIsListening(true);
      isListeningRef.current = true;
    };

    try {
      rec.start();
    } catch {
      setIsListening(false);
      isListeningRef.current = false;
    }
  }, [createRecognition, isSupported, onTranscript, stop]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  if (isSupported === null) return null;

  if (!isSupported) {
    return (
      <button
        type="button"
        disabled
        title="Dictado no soportado en este navegador (use Chrome/Edge)"
        className={cn(
          "grid place-items-center rounded-md p-1.5 opacity-40",
          "text-muted-foreground",
          className
        )}
      >
        <MicOff size={14} />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          start();
        }}
        aria-label={isListening ? "Detener dictado" : "Dictar con voz (es/en)"}
        title={isListening ? "Escuchando... click para detener" : `Dictar (${lang})`}
        className={cn(
          "relative grid place-items-center rounded-md p-1.5 transition-colors",
          isListening
            ? "text-red-500 bg-red-500/10 ring-1 ring-red-500/20"
            : "text-muted-foreground hover:text-foreground hover:bg-muted",
          className
        )}
      >
        <Mic size={14} className={isListening ? "animate-pulse" : ""} />
        {isListening && (
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500 animate-ping" />
        )}
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setLang((v) => (v === "es-AR" ? "en-US" : "es-AR"));
        }}
        title={`Idioma: ${lang} — click para cambiar`}
        className="hidden sm:inline-flex text-[9px] font-mono font-semibold tracking-widest text-muted-foreground hover:text-foreground px-1 py-0.5 rounded border border-transparent hover:border-border transition-colors"
      >
        {lang === "es-AR" ? "ES" : "EN"}
      </button>
    </div>
  );
}
