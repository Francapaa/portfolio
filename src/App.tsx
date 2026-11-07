import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Box,
  Check,
  Code2,
  Github,
  Linkedin,
  Menu,
  MoveUpRight,
  Pause,
  Play,
  Plus,
  ShieldCheck,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  copy,
  experience,
  experienceEs,
  projectMeta,
  type Language,
} from "./data";
import { defaultProfile, type Profile } from "./profile";
import ProfileDialog from "./components/ProfileDialog";

const Scene = lazy(() => import("./components/Scene"));
gsap.registerPlugin(ScrollTrigger);
const sections = ["experience", "approach", "contact"];
const sculptureFallback =
  "/manus-storage/async-images/ZeBbH80sMMDQdmQUf9FF47/image-1.webp";

class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function readStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function getProfile(): Profile {
  const stored = readStored<Partial<Profile>>("orbfolio-profile", {});
  const safe = { ...defaultProfile };
  for (const key of ["name", "email", "github", "linkedin"] as const) {
    if (typeof stored?.[key] === "string") safe[key] = stored[key]!;
  }
  for (const key of ["github", "linkedin"] as const) {
    try {
      if (safe[key] && new URL(safe[key]).protocol !== "https:") safe[key] = "";
    } catch {
      safe[key] = "";
    }
  }
  return safe;
}

export default function App() {
  const [lang, setLang] = useState<Language>(() =>
    readStored<Language>("orbfolio-language", "es") === "en" ? "en" : "es",
  );
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [expanded, setExpanded] = useState<number | null>(0);
  const [sceneVisible, setSceneVisible] = useState(true);
  const [profile, setProfile] = useState<Profile>(getProfile);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const paused = userPaused || reduced;
  const t = copy[lang];
  const entries = lang === "es" ? experienceEs : experience;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.motion = paused ? "reduced" : "full";
    document.title = `${profile.name || "Software Developer"} — Portfolio`;
    try {
      localStorage.setItem("orbfolio-language", JSON.stringify(lang));
    } catch {
      /* Storage is optional. */
    }
    const context = gsap.context(() => {
      if (paused) return;
      gsap.fromTo(
        ".hero-line > span",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.1,
          ease: "power4.out",
        },
      );
      gsap.fromTo(
        ".hero-enter",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          delay: 0.4,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 94%", once: true },
          },
        );
      });
    }, root);
    return () => context.revert();
  }, [lang, paused, profile.name]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const visual = root.current?.querySelector(".hero-visual");
    if (!visual) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSceneVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(visual);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 4500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function saveProfile(next: Profile) {
    setProfile(next);
    try {
      localStorage.setItem("orbfolio-profile", JSON.stringify(next));
      setNotice(t.saved);
    } catch {
      setNotice(
        lang === "es"
          ? "Datos aplicados temporalmente. El navegador no permite guardarlos."
          : "Details applied temporarily. Browser storage is unavailable.",
      );
    }
  }

  const fallback = (
    <img className="sculpture-fallback" src={sculptureFallback} alt="" />
  );

  return (
    <div ref={root} className={`portfolio ${paused ? "motion-paused" : ""}`}>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label={t.home}>
          <span className="brand-symbol">
            <Code2 size={27} strokeWidth={2.1} />
          </span>
          <span>
            {profile.name || t.brand}
            <span className="brand-dot">.</span>
          </span>
        </a>
        <nav
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          aria-label={
            lang === "es" ? "Navegación principal" : "Main navigation"
          }
        >
          {t.nav.map((label, index) => (
            <a
              key={sections[index]}
              href={`#${sections[index]}`}
              className={active === sections[index] ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
              {index === 2 && <ArrowUpRight size={14} />}
            </a>
          ))}
        </nav>
        <div className="header-controls">
          <div
            className="language-switch"
            aria-label={lang === "es" ? "Idioma" : "Language"}
          >
            <button
              aria-pressed={lang === "es"}
              className={lang === "es" ? "selected" : ""}
              onClick={() => setLang("es")}
            >
              ES
            </button>
            <span>/</span>
            <button
              aria-pressed={lang === "en"}
              className={lang === "en" ? "selected" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
          <button
            className="icon-button motion-control"
            disabled={reduced}
            title={
              reduced
                ? lang === "es"
                  ? "Movimiento reducido según las preferencias del sistema"
                  : "Reduced motion follows your system preferences"
                : paused
                  ? t.play
                  : t.pause
            }
            aria-label={paused ? t.play : t.pause}
            aria-pressed={paused}
            onClick={() => setUserPaused(!userPaused)}
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <button
            className="icon-button mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.close : t.menu}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero">
          <div className="hero-content">
            <div className="eyebrow hero-enter">
              <span className="tiny-dot" />
              {t.eyebrow}
            </div>
            <h1 aria-label={t.headline.join(" ")}>
              {t.headline.map((line, index) => (
                <span
                  className={`hero-line ${index > 0 ? "orange-text" : ""}`}
                  key={line}
                >
                  <span aria-hidden="true">
                    {line}
                    {index === 2 && (
                      <Asterisk
                        className="headline-asterisk"
                        strokeWidth={1.5}
                      />
                    )}
                  </span>
                </span>
              ))}
            </h1>
            <p className="hero-description hero-enter">{t.intro}</p>
            <div className="hero-actions hero-enter">
              <a className="button button-primary" href="#experience">
                {t.cta}
                <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#approach">
                {t.secondary}
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div
            className="hero-visual"
            role="group"
            aria-label={t.sculptureTitle}
          >
            <div className="scene-wrap">
              <SceneBoundary fallback={fallback}>
                <Suspense
                  fallback={
                    <div className="scene-placeholder">
                      <Box size={34} strokeWidth={1} />
                      <span>{t.loading}</span>
                    </div>
                  }
                >
                  <Scene
                    paused={paused || !sceneVisible}
                    label={t.sculptureTitle}
                    helpId="scene-help"
                  />
                </Suspense>
              </SceneBoundary>
            </div>
            <span id="scene-help" className="sr-only">
              {t.sculptureHelp}
            </span>
            <span className="visual-coordinate coordinate-left">
              X. 035
              <br />
              Y. 072
            </span>
            <span className="visual-coordinate coordinate-right">
              <Plus size={12} /> Z. 001
            </span>
            <div className="visual-caption">
              <span className="tiny-dot" />
              <span>{t.sculpture}</span>
            </div>
            <div className="drag-hint">
              <span className="drag-orbit">
                <MoveUpRight size={12} />
              </span>
              {t.drag}
            </div>
          </div>
          <div className="hero-bottom hero-enter">
            <a href="#experience" className="scroll-link">
              <span className="circle-arrow">
                <ArrowDown size={15} />
              </span>
              {t.scroll}
            </a>
            <span className="hero-bottom-note">
              {t.craft}
              <span className="mini-cross">+</span>
            </span>
          </div>
        </section>

        <div className="specialty-strip" aria-label={t.craft}>
          {t.specialties.map((item, index) => (
            <div key={item}>
              <span className="specialty-number">0{index + 1}</span>
              <span>{item}</span>
              <Asterisk size={25} strokeWidth={1.2} />
            </div>
          ))}
        </div>

        <section id="experience" className="section experience-section">
          <div className="section-kicker reveal">
            <span>01 / {t.expLabel}</span>
            <span className="kicker-end">2025 — 2026</span>
          </div>
          <div className="section-heading reveal">
            <h2>
              {t.experience}
              <br />
              <span className="muted-heading">{t.experienceAccent}</span>
            </h2>
            <p>{t.experienceIntro}</p>
          </div>
          <div className="experience-list">
            {entries.map((entry, index) => {
              const isOpen = expanded === index;
              return (
                <article
                  className={`experience-item reveal ${isOpen ? "is-open" : ""}`}
                  key={projectMeta[index].name}
                >
                  <button
                    className="experience-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`experience-detail-${index}`}
                    onClick={() => setExpanded(isOpen ? null : index)}
                  >
                    <span className="experience-index">0{index + 1}</span>
                    <span className="experience-identity">
                      <span className="experience-company">
                        {projectMeta[index].name}
                        <ArrowUpRight size={22} />
                      </span>
                      <span className="experience-role">
                        {entry.role}
                        <span className="role-divider">/</span>Freelance ·
                        Argentina
                      </span>
                    </span>
                    <span className="experience-period">{entry.period}</span>
                    <span
                      className="expand-icon"
                      aria-label={isOpen ? t.hide : t.details}
                    >
                      <Plus size={22} />
                    </span>
                  </button>
                  <div
                    id={`experience-detail-${index}`}
                    className="experience-expand"
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                  >
                    <div className="experience-detail-inner">
                      <div className="detail-side">
                        <span className="eyebrow">{t.responsibilities}</span>
                        <span className="detail-company">{entry.company}</span>
                      </div>
                      <div className="experience-bullets">
                        {entry.bullets.map((bullet) => (
                          <p key={bullet}>
                            <span className="bullet-line" />
                            {bullet}
                          </p>
                        ))}
                        <div className="tool-tags">
                          {projectMeta[index].tools.map((tool) => (
                            <span key={tool}>{tool}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="metrics reveal">
            {t.metricValues.map((metric, index) => (
              <div className="metric" key={index}>
                <span className="metric-value">
                  {metric}
                  <span className="metric-marker">↗</span>
                </span>
                <span className="metric-label">{t.metricLabels[index]}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="approach" className="section approach-section">
          <div className="section-kicker reveal">
            <span>02 / {t.focusLabel}</span>
            <Asterisk size={21} />
          </div>
          <div className="approach-layout">
            <div className="approach-intro reveal">
              <h2>{t.focusTitle}</h2>
              <p>{t.focusIntro}</p>
              <div className="approach-mark" aria-hidden="true">
                <Code2 size={85} strokeWidth={0.8} />
                <span>
                  {t.workflow[0]}
                  <br />
                  {t.workflow[1]}
                  <br />
                  {t.workflow[2]}
                </span>
              </div>
            </div>
            <div className="approach-items">
              {t.focusItems.map((item, index) => (
                <article className="approach-item reveal" key={index}>
                  <span className="approach-icon">
                    {index === 0 ? (
                      <Box size={22} />
                    ) : index === 1 ? (
                      <ShieldCheck size={22} />
                    ) : (
                      <Check size={22} />
                    )}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <span className="approach-tools">{item.tags}</span>
                  </div>
                  <span className="approach-index">/ 0{index + 1}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-kicker reveal">
            <span>03 / {t.contactLabel}</span>
            <span className="tiny-dot" />
          </div>
          <div className="contact-layout reveal">
            <div>
              <h2>
                {t.contactTitle[0]}
                <br />
                <span className="orange-text">{t.contactTitle[1]}</span>
              </h2>
              <p>{t.contactIntro}</p>
            </div>
            {profile.email ? (
              <a
                className="contact-circle"
                href={`mailto:${encodeURIComponent(profile.email)}`}
                aria-label={t.contactCta}
              >
                <ArrowUpRight size={56} strokeWidth={1} />
              </a>
            ) : (
              <button
                className="contact-circle"
                onClick={() => setSettingsOpen(true)}
                aria-label={t.configure}
              >
                <ArrowUpRight size={56} strokeWidth={1} />
              </button>
            )}
          </div>
          <div className="contact-bottom reveal">
            <div className="contact-links">
              {profile.email ? (
                <a href={`mailto:${encodeURIComponent(profile.email)}`}>
                  {profile.email}
                  <ArrowUpRight size={15} />
                </a>
              ) : (
                <span className="contact-pending">{t.contactMissing}</span>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  GitHub
                  <ArrowUpRight size={14} />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} />
                  LinkedIn
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
            <button
              className="settings-link"
              onClick={() => setSettingsOpen(true)}
            >
              {t.configure}
              <ArrowUpRight size={14} />
            </button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>
          © {new Date().getFullYear()} {profile.name || `${t.brand}.`}
        </span>
        <span>{t.footer}</span>
        <a href="#top">
          {t.top}
          <ArrowUpRight size={14} />
        </a>
      </footer>
      {settingsOpen && (
        <ProfileDialog
          lang={lang}
          profile={profile}
          onSave={saveProfile}
          onClose={() => setSettingsOpen(false)}
        />
      )}
      {notice && (
        <div className="toast" role="status">
          <Check size={17} />
          {notice}
        </div>
      )}
    </div>
  );
}
