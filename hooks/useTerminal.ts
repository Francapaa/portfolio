"use client";

import { useCallback, useRef, useState } from "react";
import {
  INITIAL_TERMINAL_HISTORY,
  parseTerminalCommand,
} from "@/lib/terminal-commands";
import {
  IGNORED_VIRTUAL_CODES,
  codeToInputChar,
} from "@/lib/keyboard";

/**
 * Terminal state: prompt input, current directory, history and the
 * keyboard-sound flag, plus command submission and virtual-keyboard input.
 */
export function useTerminal() {
  const [input, setInput] = useState("");
  const [directory, setDirectory] = useState("~");
  const [history, setHistory] = useState<string[]>(INITIAL_TERMINAL_HISTORY);
  const [sound, setSound] = useState(true);
  const [hasNavigated, setHasNavigated] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const submit = useCallback(
    (value = input) => {
      const parsed = parseTerminalCommand(value, directory);
      if (!parsed) return;

      if (parsed.clear) {
        setHistory([]);
        setInput("");
        return;
      }

      setDirectory(parsed.nextDirectory);
      setHasNavigated(parsed.nextDirectory !== "~");
      setHistory((items) => [
        ...items,
        `${directory} $ ${value}`,
        parsed.response,
      ]);
      setInput("");
    },
    [directory, input]
  );

  const handleVirtualKeyPress = useCallback(
    (code: string) => {
      if (code === "Backspace") {
        setInput((v) => v.slice(0, -1));
      } else if (code === "Enter") {
        submit();
      } else if (code === "Space") {
        setInput((v) => `${v} `);
      } else if (IGNORED_VIRTUAL_CODES.includes(code)) {
        return;
      } else {
        const ch = codeToInputChar(code);
        if (ch !== null) setInput((v) => v + ch);
      }

      inputRef.current?.focus();
    },
    [submit]
  );

  const handleVoiceTranscript = useCallback((text: string) => {
    setInput((v) => (v ? `${v} ${text}` : text));
    inputRef.current?.focus();
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const toggleSound = useCallback(() => {
    setSound((v) => !v);
  }, []);

  return {
    input,
    setInput,
    directory,
    history,
    sound,
    hasNavigated,
    inputRef,
    submit,
    handleVirtualKeyPress,
    handleVoiceTranscript,
    focusInput,
    toggleSound,
  };
}
