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
import { WavyBackground } from "@/components/ui/wavy-background";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { projects, currentProjects, projectsEs, currentProjectsEs } from "@/data/projects";
import { experience, experienceEs } from "@/data/experience";
import { education, educationEs } from "@/data/education";
import { skills } from "@/data/skills";
import { about } from "@/data/about";
import { services } from "@/data/services";

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
    "sobre mi / about me",
    "cd servicios / cd services",
    "cd proyectos / cd projects",
    "cd experiencia / cd experience",
    "cd educacion / cd education",
    "help",
    "clear",
  ]);
  const [sound, setSound] = useState(true);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [entered, setEntered] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const swordRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/espada-desenfundar.mp3");
    audio.preload = "auto";
    audio.volume = 0.6;
    swordRef.current = audio;
  }, []);

  const playSword = useCallback(() => {
    const a = swordRef.current;
    if (!a) return;
    a.currentTime = 0;
    void a.play().catch(() => {});
  }, []);

  const shouldReduceMotion = useReducedMotion();

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 14,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(3px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 24,
        mass: 0.6,
      },
    },
  };

  const stackVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const submit = useCallback(
    (value = input) => {
      const command = normalizeCommand(value);
      if (!command) return;

      const next = command.replace(/^cd\s+/, "");
      let nextDirectory = directory;
      let response = "Command not found. Try 'help' or cd proyectos.";

      if (command === "help") {
        response =
          "sobre mi · about me · cd servicios/services · cd proyectos/projects · cd experiencia/experience · cd educacion/education · clear";
      } else if (command === "clear") {
        setHistory([]);
        setInput("");
        return;
      } else if (
        ["sobre mi", "/sobre mi", "sobre-mi", "/sobre-mi"].includes(next)
      ) {
        nextDirectory = "/sobre-mi";
        response = "Opening /sobre-mi …";
      } else if (
        [
          "about",
          "/about",
          "about me",
          "/about me",
          "about-me",
          "/about-me",
        ].includes(next)
      ) {
        nextDirectory = "/about";
        response = "Opening /about …";
      } else if (
        ["servicios", "/servicios", "servicio", "/servicio"].includes(next)
      ) {
        nextDirectory = "/servicios";
        response = "Opening /servicios …";
      } else if (
        ["services", "/services", "service", "/service"].includes(next)
      ) {
        nextDirectory = "/services";
        response = "Opening /services …";
      } else if (["proyectos", "/proyectos"].includes(next)) {
        nextDirectory = "/proyectos";
        response = "Opening /proyectos …";
      } else if (["projects", "/projects"].includes(next)) {
        nextDirectory = "/projects";
        response = "Opening /projects …";
      } else if (
        ["experiencia", "/experiencia", "experiencie", "/experiencie"].includes(
          next
        )
      ) {
        nextDirectory = "/experiencia";
        response = "Opening /experiencia …";
      } else if (["experience", "/experience"].includes(next)) {
        nextDirectory = "/experience";
        response = "Opening /experience …";
      } else if (["educacion", "/educacion"].includes(next)) {
        nextDirectory = "/educacion";
        response = "Opening /educacion …";
      } else if (["education", "/education"].includes(next)) {
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
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);

  const handleEnter = useCallback(() => {
    setEntered(true);
    requestAnimationFrame(() => {
      document
        .querySelector(".portfolio-room")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (!entered) {
      root.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      root.style.overflow = "";
      body.style.overflow = "";
    }
    return () => {
      root.style.overflow = "";
      body.style.overflow = "";
    };
  }, [entered]);

  const reveal = entered ? 1 : 0;

  const content = useMemo(() => {
    if (directory === "/proyectos") {
      return (
        <motion.section
          className="content-grid"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {[...projectsEs, ...currentProjectsEs].map((project) => (
            <motion.article
              variants={cardVariants}
              className="project-card"
              key={project.name}
            >
              <div className="card-topline">
                <span className="eyebrow">PROYECTO</span>
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
              </motion.article>
          ))}
        </motion.section>
      );
    }

    if (directory === "/projects") {
      return (
        <motion.section
          className="content-grid"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {[...projects, ...currentProjects].map((project) => (
            <motion.article
              variants={cardVariants}
              className="project-card"
              key={project.name}
            >
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
              </motion.article>
          ))}
        </motion.section>
      );
    }

    if (directory === "/experiencia") {
      return (
        <motion.section
          className="detail-stack"
          variants={stackVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {experienceEs.map((item) => (
            <motion.article
              variants={cardVariants}
              className="experience-card"
              key={item.role}
            >
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
              </motion.article>
          ))}
        </motion.section>
      );
    }

    if (directory === "/experience") {
      return (
        <motion.section
          className="detail-stack"
          variants={stackVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {experience.map((item) => (
            <motion.article
              variants={cardVariants}
              className="experience-card"
              key={item.role}
            >
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
              </motion.article>
          ))}
        </motion.section>
      );
    }

    if (directory === "/educacion") {
      return (
        <motion.section
          className="detail-stack"
          variants={stackVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.article
            variants={cardVariants}
            className="education-card"
          >
            <span className="eyebrow">{educationEs[0].period}</span>
            <h3>{educationEs[0].degree}</h3>
            <p className="company">{educationEs[0].school}</p>
            <p>{educationEs[0].detail}</p>
            <div className="chips">
              {skills.slice(0, 6).map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </motion.article>
        </motion.section>
      );
    }

    if (directory === "/education") {
      return (
        <motion.section
          className="detail-stack"
          variants={stackVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.article
            variants={cardVariants}
            className="education-card"
          >
            <span className="eyebrow">{education[0].period}</span>
            <h3>{education[0].degree}</h3>
            <p className="company">{education[0].school}</p>
            <p>{education[0].detail}</p>
            <div className="chips">
              {skills.slice(0, 6).map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </motion.article>
        </motion.section>
      );
    }

    if (directory === "/sobre-mi") {
      return (
        <motion.section
          className="detail-stack"
          variants={stackVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.article
            variants={cardVariants}
            className="welcome-panel"
          >
            <span className="eyebrow">SOBRE MÍ</span>
            {about.es.split("\n\n").map((paragraph, idx) => (
              <p key={idx} style={{ marginTop: idx === 0 ? "16px" : "12px" }}>
                {paragraph}
              </p>
            ))}
          </motion.article>
        </motion.section>
      );
    }

    if (directory === "/about") {
      return (
        <motion.section
          className="detail-stack"
          variants={stackVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.article
            variants={cardVariants}
            className="welcome-panel"
          >
            <span className="eyebrow">ABOUT ME</span>
            {about.en.split("\n\n").map((paragraph, idx) => (
              <p key={idx} style={{ marginTop: idx === 0 ? "16px" : "12px" }}>
                {paragraph}
              </p>
            ))}
          </motion.article>
        </motion.section>
      );
    }

    if (directory === "/servicios") {
      return (
        <motion.section
          className="detail-stack"
          variants={stackVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.article
            variants={cardVariants}
            className="welcome-panel"
          >
            <span className="eyebrow">{services.es.title.toUpperCase()}</span>
            <p style={{ marginTop: "16px" }}>{services.es.intro}</p>
          </motion.article>
          <motion.section
            className="content-grid"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {services.es.items.map((item) => (
              <motion.article
                variants={cardVariants}
                className="project-card"
                key={item.title}
              >
                <div className="card-topline">
                  <span className="eyebrow">SERVICIO</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.article>
            ))}
          </motion.section>
        </motion.section>
      );
    }

    if (directory === "/services") {
      return (
        <motion.section
          className="detail-stack"
          variants={stackVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.article
            variants={cardVariants}
            className="welcome-panel"
          >
            <span className="eyebrow">{services.en.title.toUpperCase()}</span>
            <p style={{ marginTop: "16px" }}>{services.en.intro}</p>
          </motion.article>
          <motion.section
            className="content-grid"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {services.en.items.map((item) => (
              <motion.article
                variants={cardVariants}
                className="project-card"
                key={item.title}
              >
                <div className="card-topline">
                  <span className="eyebrow">SERVICE</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.article>
            ))}
          </motion.section>
        </motion.section>
      );
    }

    return (
      <motion.section
        className="welcome-panel"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
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
      </motion.section>
    );
  }, [directory]);

  return (
    <main className="portfolio-shell" onClick={() => inputRef.current?.focus()}>
      <section
        className="opening-stage cursor-pointer"
        aria-label="Francisco Caparruva portfolio introduction"
        onClick={handleEnter}
      >
        <div className="stage-grain" />
        <div className="hero-3d-wrap flex flex-col items-center justify-center gap-4 px-4">

          <div onMouseEnter={playSword}>
            <Text3DFlip
              className="justify-center bg-transparent"
              textClassName="bg-transparent text-foreground font-mono font-black text-[clamp(2.6rem,9vw,8.2rem)] leading-[0.85] tracking-[-0.07em]"
              flipTextClassName="bg-transparent text-foreground font-mono font-black"
              rotateDirection="top"
            >
              FRANCISCO CAPARRUVA
            </Text3DFlip>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-2">
            <Text3DFlip
              className="bg-transparent"
              textClassName="bg-transparent text-foreground font-mono text-[15px] tracking-[0.20em] font-bold text-muted-foreground"
              flipTextClassName="bg-transparent text-foreground font-mono"
              rotateDirection="top"
            >
              SOFTWARE ENGINEER
            </Text3DFlip>
            <span className="hidden md:block text-muted-foreground font-mono text-[15px]">
              /
            </span>
            <Text3DFlip
              className="bg-transparent"
              textClassName="bg-transparent text-foreground font-mono text-[15px] tracking-[0.20em] font-bold text-muted-foreground"
              flipTextClassName="bg-transparent text-foreground font-mono"
              rotateDirection="top"
            >
              AI ENGINEER
            </Text3DFlip>
          </div>

          <button
            className="scroll-cue mt-8 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleEnter();
            }}
            aria-label="Enter portfolio"
          >
            CLICK TO ENTER <span>↓</span>
          </button>
        </div>
      </section>

      <section
        className={`portfolio-room ${hasNavigated ? "has-navigation" : "terminal-only"}`}
        style={{
          opacity: Math.max(0, reveal),
          position: "relative",
          overflow: "hidden",
        }}
      >
        <WavyBackground
          colors={["#0071e3", "#1e90ff", "#60a5fa", "#93c5fd", "#dbeafe"]}
          backgroundFill="white"
          blur={0}
          speed="slow"
          waveWidth={56}
          waveOpacity={0.34}
          containerClassName="absolute inset-0 z-0 pointer-events-none"
          className="relative z-0"
        />
        <header className="site-header" style={{ position: "relative", zIndex: 1 }}>
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
                {directory === "/proyectos" || directory === "/projects" ? (
                  <Code2 />
                ) : directory === "/experiencia" ||
                  directory === "/experience" ? (
                  <BriefcaseBusiness />
                ) : directory === "/education" ||
                  directory === "/educacion" ? (
                  <GraduationCap />
                ) : directory === "/servicios" || directory === "/services" ? (
                  <Command />
                ) : directory === "/sobre-mi" || directory === "/about" ? (
                  <Mail />
                ) : (
                  <TerminalSquare />
                )}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={directory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {content}
              </motion.div>
            </AnimatePresence>
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
