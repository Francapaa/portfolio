"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  AudioLines,
  BriefcaseBusiness,
  Code2,
  Command,
  GraduationCap,
  Mail,
  TerminalSquare,
} from "lucide-react";
import { Keyboard } from "@/components/ui/keyboard";
import Text3DFlip from "@/components/ui/text-3d-flip";
import { VoiceButton } from "@/components/terminal/VoiceButton";
import { projects, currentProjects } from "@/data/projects";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { skills } from "@/data/skills";

function normalizeCommand(input: string) {
  return input.trim().toLowerCase().replace(/\\/g, "/").replace(/\s+/g, " ");
}

function codeToInputChar(code: string): string | null {
  if (code.startsWith("Key")) return code.slice(3).toLowerCase();
  if (code.startsWith("Digit")) return code.slice(5);

  const map: Record<string, string> = {
    Backquote: "`",
    Minus: "-",
    Equal: "=",
    BracketLeft: "[",
    BracketRight: "]",
    Backslash: "\\",
    Semicolon: ";",
    Quote: "'",
    Comma: ",",
    Period: ".",
    Slash: "/",
    Space: " ",
  };

  return map[code] ?? null;
}

export default function Page() {
  const [input, setInput] = useState("");
  const [directory, setDirectory] = useState("~");
  const [history, setHistory] = useState<string[]>([
    "Available commands:",
    "cd proyectos",
    "cd experiencia",
    "cd education",
    "help",
    "clear",
  ]);
  const [sound, setSound] = useState(true);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const submit = useCallback(
    (value = input) => {
      const command = normalizeCommand(value);
      if (!command) return;

      const next = command.replace(/^cd\s+/, "");
      let nextDirectory = directory;
      let response = "Command not found. Try 'help' or cd proyectos.";

      if (command === "help") {
        response =
          "cd proyectos · cd experiencia · cd /experiencie · cd education · cd educacion · clear";
      } else if (command === "clear") {
        setHistory([]);
        setInput("");
        return;
      } else if (
        ["proyectos", "/proyectos", "projects", "/projects"].includes(next)
      ) {
        nextDirectory = "/proyectos";
        response = "Opening /proyectos …";
      } else if (
        [
          "experiencia",
          "/experiencia",
          "experiencie",
          "/experiencie",
          "experience",
          "/experience",
        ].includes(next)
      ) {
        nextDirectory = "/experiencia";
        response = "Opening /experiencia …";
      } else if (
        ["education", "/education", "educacion", "/educacion"].includes(next)
      ) {
        nextDirectory = "/education";
        response = "Opening /education …";
      } else if (command === "pwd") {
        response = directory;
      }

      setDirectory(nextDirectory);
      setHasNavigated(nextDirectory !== "~");
      setHistory((items) => [...items, `${directory} $ ${value}`, response]);
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
      } else if (
        [
          "Escape",
          "Tab",
          "CapsLock",
          "ShiftLeft",
          "ShiftRight",
          "ControlLeft",
          "ControlRight",
          "AltLeft",
          "AltRight",
          "MetaLeft",
          "MetaRight",
          "Fn",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
        ].includes(code)
      ) {
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

  useEffect(() => {
    // Fix: evitar que el navegador restaure scroll o el autoFocus arrastre abajo al recargar
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    setScrollY(0);
    // Quitar foco si el navegador enfocó el input automáticamente
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reveal = Math.min(1, scrollY / 520);

  const content = useMemo(() => {
    if (directory === "/proyectos") {
      return (
        <section className="content-grid">
          {[...projects, ...currentProjects].map((project) => (
            <article className="project-card" key={project.name}>
              <div className="card-topline">
                <span className="eyebrow">PROJECT</span>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.name}`}
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="chips">
                {project.tech.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </section>
      );
    }

    if (directory === "/experiencia") {
      return (
        <section className="detail-stack">
          {experience.map((item) => (
            <article className="experience-card" key={item.role}>
              <div className="timeline-dot" />
              <div>
                <span className="eyebrow">{item.period}</span>
                <h3>{item.role}</h3>
                <p className="company">{item.company}</p>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>
      );
    }

    if (directory === "/education") {
      return (
        <section className="detail-stack">
          <article className="education-card">
            <span className="eyebrow">{education[0].period}</span>
            <h3>{education[0].degree}</h3>
            <p className="company">{education[0].school}</p>
            <p>{education[0].detail}</p>
            <div className="chips">
              {skills.slice(0, 6).map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        </section>
      );
    }

    return (
      <section className="welcome-panel">
        <span className="eyebrow">ABOUT / FRANCISCO CAPARRUVA</span>
        <h2>Building systems that make complex things feel simple.</h2>
        <p>
          Software engineer passionate about scalable architectures, AI
          integration, and performance.
        </p>
        <div className="skill-cloud">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
        <a className="contact-link" href="mailto:francisco.caparruva@gmail.com">
          <Mail size={16} /> Let&apos;s talk
        </a>
      </section>
    );
  }, [directory]);

  return (
    <main className="portfolio-shell" onClick={() => inputRef.current?.focus()}>
      <section
        className="opening-stage"
        aria-label="Francisco Caparruva portfolio introduction"
      >
        <div className="stage-grain" />
        <div
          className="hero-3d-wrap flex flex-col items-center justify-center gap-4 px-4"
          style={{
            opacity: 1 - reveal * 1.15,
            transform: `translateY(${-reveal * 18}px) scale(${1 - reveal * 0.04})`,
            filter: `blur(${reveal * 3.5}px)`,
            transition:
              "opacity 0.12s linear, transform 0.12s linear, filter 0.12s linear",
            willChange: "opacity, transform, filter",
            pointerEvents: reveal > 0.85 ? "none" : "auto",
          }}
        >
          <Text3DFlip
            className="bg-background justify-center"
            textClassName="bg-background text-foreground font-mono font-black text-[clamp(2.6rem,9vw,8.2rem)] leading-[0.85] tracking-[-0.07em]"
            flipTextClassName="bg-background text-foreground font-mono font-black"
            rotateDirection="top"
          >
            FRANCISCO CAPARRUVA
          </Text3DFlip>

          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-2">
            <Text3DFlip
              className="bg-background"
              textClassName="bg-background text-foreground font-mono text-[11px] tracking-[0.28em] font-semibold text-muted-foreground"
              flipTextClassName="bg-background text-foreground font-mono"
              rotateDirection="top"
            >
              SOFTWARE ENGINEER
            </Text3DFlip>
            <span className="hidden md:block text-muted-foreground font-mono text-[11px]">
              /
            </span>
            <Text3DFlip
              className="bg-background"
              textClassName="bg-background text-foreground font-mono text-[11px] tracking-[0.28em] font-semibold text-muted-foreground"
              flipTextClassName="bg-background text-foreground font-mono"
              rotateDirection="top"
            >
              AI ENGINEER
            </Text3DFlip>
          </div>

          <span className="scroll-cue mt-8">
            SCROLL TO ENTER <span>↓</span>
          </span>
        </div>
      </section>

      <section
        className={`portfolio-room ${hasNavigated ? "has-navigation" : "terminal-only"}`}
        style={{ opacity: Math.max(0, reveal) }}
      >
        <header className="site-header">
          <div className="brand-mark">
            <span className="brand-dot" /> FC
            <span className="brand-slash">/</span> 2026
          </div>
          <div className="status">
            <span className="status-dot" /> available for select projects
            <a
              href="https://github.com/francapaa"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <Code2 size={16} />
            </a>
          </div>
        </header>

        <div className="workspace">
          <section className="terminal-column">
            <div className="terminal-window">
              <div className="terminal-bar">
                <div className="window-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <span>francisco@portfolio: {directory}</span>
                <VoiceButton onTranscript={handleVoiceTranscript} />
                <button
                  className={`sound-toggle ${sound ? "active" : ""}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSound(!sound);
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
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (
                        event.nativeEvent.isComposing ||
                        event.keyCode === 229
                      )
                        return;
                      if (event.key === "Enter") submit();
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
                onKeyPress={handleVirtualKeyPress}
              />
            </div>

            <p className="keyboard-hint">
              <Command size={13} /> type a command or use the keyboard below
              <span>↵ to run</span>
            </p>
          </section>

          <section className="content-column">
            <div className="content-header">
              <div>
                <span className="eyebrow">CURRENT DIRECTORY</span>
                <h2>
                  {directory === "~" ? "Welcome" : directory.replace("/", "")}
                </h2>
              </div>
              <div className="content-icon">
                {directory === "/proyectos" ? (
                  <Code2 />
                ) : directory === "/experiencia" ? (
                  <BriefcaseBusiness />
                ) : directory === "/education" ? (
                  <GraduationCap />
                ) : (
                  <TerminalSquare />
                )}
              </div>
            </div>
            {content}
          </section>
        </div>

        <footer className="site-footer">
          <span>© 2026 Francisco Caparruva</span>
          <span>
            crafted in Buenos Aires <span className="footer-line" />
          </span>
        </footer>
      </section>
    </main>
  );
}
