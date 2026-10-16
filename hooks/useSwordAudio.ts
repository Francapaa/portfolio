"use client";

import { useCallback, useEffect, useRef } from "react";

const SWORD_SOUND_SRC = "/sounds/espada-desenfundar.mp3";
const SWORD_VOLUME = 0.6;

/**
 * Preloads the sword sound, warms up the media pipeline and works around
 * the browser autoplay policy (hover is not a user activation, so the
 * first hover on a fresh visit rejects with NotAllowedError — the intent
 * is queued and replayed on the first real gesture).
 */
export function useSwordAudio() {
  const swordRef = useRef<HTMLAudioElement | null>(null);
  const swordReadyRef = useRef(false);
  const pendingSwordRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(SWORD_SOUND_SRC);
    audio.preload = "auto";
    audio.volume = SWORD_VOLUME;
    swordRef.current = audio;

    const markReady = () => {
      swordReadyRef.current = true;
    };
    audio.addEventListener("canplaythrough", markReady, { once: true });
    // Start fetching/decoding immediately so the first hover doesn't
    // race with the network. Without this, a hover <1s after mount
    // hits readyState 0 and play() rejects silently.
    try {
      audio.load();
    } catch {
      // ignore — load() only kicks off the fetch
    }

    // Warm up the media pipeline. Muted play IS allowed before user
    // activation and ensures the decoder is ready, so the first
    // gesture-triggered play() starts instantly.
    audio.muted = true;
    void audio
      .play()
      .then(() => {
        audio.pause();
        try {
          audio.currentTime = 0;
        } catch {
          // metadata not ready yet, ignore
        }
        audio.muted = false;
      })
      .catch(() => {
        audio.muted = false;
      });

    return () => {
      audio.removeEventListener("canplaythrough", markReady);
      audio.pause();
      if (swordRef.current === audio) swordRef.current = null;
    };
  }, []);

  const playSword = useCallback(() => {
    const a = swordRef.current;
    if (!a) return;
    if (a.readyState < 2 || !swordReadyRef.current) {
      // Not enough data yet — keep loading and let the next hover
      // (or the pending replay on gesture) play it.
      try {
        a.load();
      } catch {
        // ignore
      }
      return;
    }
    try {
      a.currentTime = 0;
    } catch {
      // seek before metadata — play from current position
    }
    void a.play().catch((err: unknown) => {
      // Hover is NOT a user activation, so the very first hover on a
      // fresh visit rejects with NotAllowedError. Remember the intent
      // and replay it on the first real gesture (click/keydown).
      if (
        typeof err === "object" &&
        err !== null &&
        "name" in err &&
        (err as { name?: string }).name === "NotAllowedError"
      ) {
        pendingSwordRef.current = true;
      }
      if (process.env.NODE_ENV !== "production") {
        console.debug("[sword] play blocked:", err);
      }
    });
  }, []);

  const unlockSwordAudio = useCallback(() => {
    const a = swordRef.current;
    if (!a) return;
    const hadPending = pendingSwordRef.current;
    pendingSwordRef.current = false;
    if (!hadPending && !a.paused && !a.ended && a.currentTime > 0) {
      // A sword sound is currently playing — don't cut it off.
      return;
    }
    if (hadPending) {
      // Replay the hover that the autoplay policy blocked.
      try {
        a.currentTime = 0;
      } catch {
        // ignore
      }
      void a.play().catch(() => {});
      return;
    }
    // Silent unlock: a volume-0 play inside a real gesture grants
    // permission for future hovers without an audible blip.
    const volume = a.volume;
    a.volume = 0;
    void a
      .play()
      .then(() => {
        a.pause();
        try {
          a.currentTime = 0;
        } catch {
          // ignore
        }
        a.volume = volume;
      })
      .catch(() => {
        a.volume = volume;
      });
  }, []);

  useEffect(() => {
    const unlock = () => unlockSwordAudio();
    window.addEventListener("pointerdown", unlock, { capture: true });
    window.addEventListener("keydown", unlock, { capture: true });
    window.addEventListener("touchend", unlock, { capture: true });
    return () => {
      window.removeEventListener("pointerdown", unlock, { capture: true });
      window.removeEventListener("keydown", unlock, { capture: true });
      window.removeEventListener("touchend", unlock, { capture: true });
    };
  }, [unlockSwordAudio]);

  return { playSword, unlockSwordAudio };
}
