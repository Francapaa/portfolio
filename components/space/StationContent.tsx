"use client";

import { useMemo } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  projects,
  currentProjects,
  projectsEs,
  currentProjectsEs,
} from "@/data/projects";
import { experience, experienceEs } from "@/data/experience";
import { education, educationEs } from "@/data/education";
import { skills } from "@/data/skills";
import { about } from "@/data/about";
import { services } from "@/data/services";
import {
  getCardVariants,
  getGridVariants,
  getStackVariants,
} from "@/lib/motion-variants";
import type { Lang, StationId } from "@/lib/stations";

interface StationContentProps {
  stationId: StationId;
  lang: Lang;
}

export function StationContent({ stationId, lang }: StationContentProps) {
  const shouldReduceMotion = useReducedMotion();
  const gridVariants = useMemo(
    () => getGridVariants(shouldReduceMotion ?? false),
    [shouldReduceMotion]
  );
  const cardVariants = useMemo(
    () => getCardVariants(shouldReduceMotion ?? false),
    [shouldReduceMotion]
  );
  const stackVariants = useMemo(
    () => getStackVariants(shouldReduceMotion ?? false),
    [shouldReduceMotion]
  );

  if (stationId === "home") {
    return (
      <motion.section
        className="welcome-panel"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="eyebrow">
          {lang === "es" ? "FRANCISCO CAPARRUVA" : "FRANCISCO CAPARRUVA"}
        </span>
        <h2>
          {lang === "es"
            ? "Construyo sistemas que hacen que lo complejo se sienta simple."
            : "Building systems that make complex things feel simple."}
        </h2>
        <p>
          {lang === "es"
            ? "Software engineer & AI engineer. Arquitecturas escalables, integración de IA y performance."
            : "Software engineer & AI engineer. Scalable architectures, AI integration, and performance."}
        </p>
        <div className="skill-cloud">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
        <a className="contact-link" href="mailto:francisco.caparruva@gmail.com">
          <Mail size={16} />{" "}
          {lang === "es" ? "Hablemos" : "Let's talk"}
        </a>
      </motion.section>
    );
  }

  if (stationId === "projects") {
    const list =
      lang === "es"
        ? [...projectsEs, ...currentProjectsEs]
        : [...projects, ...currentProjects];
    return (
      <motion.section
        className="content-grid"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {list.map((project) => (
          <motion.article
            variants={cardVariants}
            className="project-card"
            key={project.name}
          >
            <div className="card-topline">
              <span className="eyebrow">
                {lang === "es" ? "PROYECTO" : "PROJECT"}
              </span>
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

  if (stationId === "about") {
    const text = lang === "es" ? about.es : about.en;
    return (
      <motion.section
        className="detail-stack"
        variants={stackVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.article variants={cardVariants} className="welcome-panel">
          <span className="eyebrow">
            {lang === "es" ? "SOBRE MÍ" : "ABOUT ME"}
          </span>
          {text.split("\n\n").map((paragraph, idx) => (
            <p key={idx} style={{ marginTop: idx === 0 ? "16px" : "12px" }}>
              {paragraph}
            </p>
          ))}
          <div className="skill-cloud" style={{ marginTop: 20 }}>
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </motion.article>
      </motion.section>
    );
  }

  if (stationId === "services") {
    const block = lang === "es" ? services.es : services.en;
    return (
      <motion.section
        className="detail-stack"
        variants={stackVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.article variants={cardVariants} className="welcome-panel">
          <span className="eyebrow">{block.title.toUpperCase()}</span>
          <p style={{ marginTop: "16px" }}>{block.intro}</p>
        </motion.article>
        <motion.section
          className="content-grid"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {block.items.map((item) => (
            <motion.article
              variants={cardVariants}
              className="project-card"
              key={item.title}
            >
              <div className="card-topline">
                <span className="eyebrow">
                  {lang === "es" ? "SERVICIO" : "SERVICE"}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.article>
          ))}
        </motion.section>
      </motion.section>
    );
  }

  if (stationId === "experience") {
    const list = lang === "es" ? experienceEs : experience;
    return (
      <motion.section
        className="detail-stack"
        variants={stackVariants}
        initial="hidden"
        animate="visible"
      >
        {list.map((item) => (
          <motion.article
            variants={cardVariants}
            className="experience-card"
            key={`${item.company}-${item.period}`}
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

  // education
  const list = lang === "es" ? educationEs : education;
  return (
    <motion.section
      className="detail-stack"
      variants={stackVariants}
      initial="hidden"
      animate="visible"
    >
      {list.map((item) => (
        <motion.article
          variants={cardVariants}
          className="education-card"
          key={`${item.school}-${item.period}`}
        >
          <span className="eyebrow">{item.period}</span>
          <h3>{item.degree}</h3>
          <p className="company">{item.school}</p>
          <p>{item.detail}</p>
        </motion.article>
      ))}
    </motion.section>
  );
}
