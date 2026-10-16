"use client";

import type { RefObject } from "react";
import { AudioLines, Command } from "lucide-react";
import { Keyboard } from "@/components/ui/keyboard";
import { VoiceButton } from "@/components/terminal/VoiceButton";

interface TerminalPanelProps {
  directory: string;
  history: string[];
  input: string;
  onInputChange: (value: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  sound: boolean;
  onToggleSound: () => void;
  onSubmit: () => void;
  onVirtualKeyPress: (code: string) => void;
  onVoiceTranscript: (text: string) => void;
}

export function TerminalPanel({
  directory,
  history,
  input,
  onInputChange,
  inputRef,
  sound,
  onToggleSound,
  onSubmit,
  onVirtualKeyPress,
  onVoiceTranscript,
}: TerminalPanelProps) {
  return (
    <section className="terminal-column">
      <div className="terminal-window">
        <div className="terminal-bar">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>
          <span>francisco@portfolio: {directory}</span>
          <VoiceButton onTranscript={onVoiceTranscript} />
          <button
            className={`sound-toggle ${sound ? "active" : ""}`}
            onClick={(event) => {
              event.stopPropagation();
              onToggleSound();
            }}
            aria-label={
              sound ? "Mute keyboard sounds" : "Enable keyboard sounds"
            }
          >
            <AudioLines size={14} />
          </button>
        </div>

        <div className="terminal-body">
          <div className="terminal-history">
            {history.map((line, index) => (
              <div
                className={
                  index % 2 === 0 && line.includes("$")
                    ? "command-line"
                    : "output-line"
                }
                key={`${line}-${index}`}
              >
                {line}
              </div>
            ))}
          </div>

          <div className="prompt-row">
            <span className="prompt">{directory} $</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => onInputChange(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.nativeEvent.isComposing ||
                  event.keyCode === 229
                )
                  return;
                if (event.key === "Enter") onSubmit();
              }}
              aria-label="Terminal command input"
              spellCheck={false}
            />
            <span className="cursor" />
          </div>
        </div>
      </div>

      <div
        className="mt-4 flex justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Keyboard
          enableSound={sound}
          onKeyPress={onVirtualKeyPress}
        />
      </div>

      <p className="keyboard-hint">
        <Command size={13} /> type a command or use the keyboard below
        <span>↵ to run</span>
      </p>
    </section>
  );
}
