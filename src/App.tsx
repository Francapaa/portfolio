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
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Pause,
  Play,
  Plus,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  about,
  copy,
  currentProjects,
  currentProjectsEs,
  education,
  educationEs,
  experience,
  experienceEs,
  projects,
  projectsEs,
  services,
  skills,
  type Language,
} from "./data";
import { profile } from "./profile";
import Cursor from "./components/Cursor";

const Scene = lazy(() => import("./components/Scene"));
gsap.registerPlugin(ScrollTrigger);
const sections = ["about", "experience", "projects", "services", "contact"];

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
  const root = useRef<HTMLDivElement>(null);
  const paused = userPaused || reduced;
  const t = copy[lang];
  const entries = lang === "es" ? experienceEs : experience;
  const projectEntries = lang === "es" ? projectsEs : projects;
  const currentEntries = lang === "es" ? currentProjectsEs : currentProjects;
  const educationEntries = lang === "es" ? educationEs : education;
  const serviceData = services[lang];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.motion = paused ? "reduced" : "full";
    document.title = `${profile.name} — Software Engineer`;
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
  }, [lang, paused]);

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
    const page = root.current;
    if (!page) return;

    const atmosphere = document.documentElement;
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: page,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.15,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .fromTo(
        atmosphere,
        {
          "--base-r": 15,
          "--base-g": 15,
          "--base-b": 15,
          "--ambient-x": "78%",
          "--ambient-y": "12%",
          "--ambient-glow": 0.22,
          "--ember-x": "12%",
          "--ember-y": "78%",
          "--ember-glow": 0.09,
          "--ambient-scale": 1,
        },
        {
          "--base-r": 38,
          "--base-g": 17,
          "--base-b": 11,
          "--ambient-x": "24%",
          "--ambient-y": "58%",
          "--ambient-glow": 0.34,
          "--ember-x": "88%",
          "--ember-y": "26%",
          "--ember-glow": 0.16,
          "--ambient-scale": 1.12,
          duration: 0.34,
          ease: "none",
        },
        0.2,
      )
      .to(
        atmosphere,
        {
          "--base-r": 52,
          "--base-g": 20,
          "--base-b": 10,
          "--ambient-x": "82%",
          "--ambient-y": "50%",
          "--ambient-glow": 0.28,
          "--ember-x": "14%",
          "--ember-y": "40%",
          "--ember-glow": 0.13,
          "--ambient-scale": 1.06,
          duration: 0.32,
          ease: "none",
        },
        0.5,
      )
      .to(
        atmosphere,
        {
          "--base-r": 30,
          "--base-g": 13,
          "--base-b": 9,
          "--ambient-x": "46%",
          "--ambient-y": "88%",
          "--ambient-glow": 0.38,
          "--ember-x": "82%",
          "--ember-y": "74%",
          "--ember-glow": 0.2,
          "--ambient-scale": 1.2,
          duration: 0.3,
          ease: "none",
        },
        0.82,
      );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      gsap.set(atmosphere, {
        "--base-r": 15,
        "--base-g": 15,
        "--base-b": 15,
        "--ambient-x": "78%",
        "--ambient-y": "12%",
        "--ambient-glow": 0.22,
        "--ember-x": "12%",
        "--ember-y": "78%",
        "--ember-glow": 0.09,
        "--ambient-scale": 1,
      });
    };
  }, []);

  const sceneFallback = (
    <div className="scene-placeholder">
      <Code2 size={34} strokeWidth={1} />
      <span>{t.loading}</span>
    </div>
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
          <span>{t.brand}</span>
        </a>
        <nav
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          aria-label={lang === "es" ? "Navegación principal" : "Main navigation"}
        >
          {t.nav.map((label, index) => (
            <a
              key={sections[index]}
              href={`#${sections[index]}`}
              className={active === sections[index] ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
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
            title={reduced ? t.keyboard : paused ? t.play : t.pause}
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
            <h1 aria-label={t.brand}>
              {t.headline.map((line, index) => (
                <span
                  className={`hero-line ${index > 0 ? "orange-text" : ""}`}
                  key={line}
                >
                  <span aria-hidden="true">
                    {line}
                    {index === 1 && (
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
              <a className="text-link" href="#projects">
                {t.secondary}
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="hero-visual" role="group" aria-label={t.role}>
            <div className="scene-wrap">
              <SceneBoundary fallback={sceneFallback}>
                <Suspense fallback={sceneFallback}>
                  <Scene
                    paused={paused || !sceneVisible}
                    label={lang === "es" ? "Escena 3D" : "3D scene"}
                    helpId="scene-help"
                  />
                </Suspense>
              </SceneBoundary>
            </div>
            <span id="scene-help" className="sr-only">
              {t.keyboard}
            </span>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="about-layout">
            <div className="about-heading reveal">
              <h2>{t.aboutTitle}</h2>
              <div className="skill-cloud">
                <span className="eyebrow">{t.skillsLabel}</span>
                <div className="skill-tags">
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="about-body reveal">
              {about[lang]
                .split("\n\n")
                .map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className="education-block">
                <span className="eyebrow">{t.educationLabel}</span>
                <ul>
                  {educationEntries.map((entry) => (
                    <li key={entry.degree}>
                      <GraduationCap size={18} />
                      <div>
                        <span className="education-degree">{entry.degree}</span>
                        <span className="education-school">
                          {entry.school}
                        </span>
                        <span className="education-period">{entry.period}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section experience-section">
          <div className="section-heading reveal">
            <h2>
              {t.expTitle}
              <br />
              <span className="muted-heading">{t.expAccent}</span>
            </h2>
            <p>{t.expIntro}</p>
          </div>
          <div className="experience-list">
            {entries.map((entry, index) => {
              const isOpen = expanded === index;
              return (
                <article
                  className={`experience-item reveal ${isOpen ? "is-open" : ""}`}
                  key={entry.company}
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
                        {entry.company.split("—")[0].trim()}
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
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="section-heading reveal">
            <h2>
              {t.projectsTitle}
              <br />
              <span className="muted-heading">{t.projectsAccent}</span>
            </h2>
            <p>{t.projectsIntro}</p>
          </div>
          <div className="project-group">
            <span className="group-label reveal">{t.featuredLabel}</span>
            <div className="project-grid">
              {projectEntries.map((project) => (
                <a
                  className="project-card reveal"
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="project-topline">
                    <span className="project-name">{project.name}</span>
                    <ExternalLink size={18} />
                  </span>
                  <p>{project.description}</p>
                  <span className="project-tech">
                    {project.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="project-group">
            <span className="group-label reveal">{t.currentLabel}</span>
            <div className="project-grid">
              {currentEntries.map((project) => (
                <a
                  className="project-card reveal"
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="project-topline">
                    <span className="project-name">{project.name}</span>
                    <ExternalLink size={18} />
                  </span>
                  <p>{project.description}</p>
                  <span className="project-tech">
                    {project.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="section-heading reveal">
            <h2>{t.servicesTitle}</h2>
            <p>{serviceData.intro}</p>
          </div>
          <div className="services-list">
            {serviceData.items.map((item, index) => (
              <article className="service-item reveal" key={item.title}>
                <span className="service-index">/ 0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-layout reveal">
            <div>
              <h2>
                {t.contactTitle[0]}
                <br />
                <span className="orange-text">{t.contactTitle[1]}</span>
              </h2>
              <p>{t.contactIntro}</p>
            </div>
            <a
              className="contact-circle"
              href={`mailto:${profile.email}`}
              aria-label={t.contactCta}
            >
              <ArrowUpRight size={56} strokeWidth={1} />
            </a>
          </div>
          <div className="contact-bottom reveal">
            <div className="contact-links">
              <a href={`mailto:${profile.email}`}>
                <Mail size={16} />
                {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} />
                GitHub
                <ArrowUpRight size={14} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={16} />
                LinkedIn
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>{t.footer}</span>
        <span>{t.footerTagline}</span>
        <a href="#top">
          {t.top}
          <ArrowUpRight size={14} />
        </a>
      </footer>
      <Cursor />
    </div>
  );
}
