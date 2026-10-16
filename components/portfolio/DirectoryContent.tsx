"use client";

import { useMemo } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { projects, currentProjects, projectsEs, currentProjectsEs } from "@/data/projects";
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

interface DirectoryContentProps {
  directory: string;
}

/**
 * Renders the right-hand panel for the current terminal directory.
 * Pure presentational switch — navigation state lives in `useTerminal`.
 */
export function DirectoryContent({ directory }: DirectoryContentProps) {
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

    if (directory === "/educacion") {
      return (
        <motion.section
          className="detail-stack"
          variants={stackVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {educationEs.map((item) => (
            <motion.article
              variants={cardVariants}
              className="education-card"
              key={`${item.school}-${item.period}`}
            >
              <span className="eyebrow">{item.period}</span>
              <h3>{item.degree}</h3>
              <p className="company">{item.school}</p>
              <p>{item.detail}</p>
              <div className="chips">
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </motion.article>
          ))}
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
          {education.map((item) => (
            <motion.article
              variants={cardVariants}
              className="education-card"
              key={`${item.school}-${item.period}`}
            >
              <span className="eyebrow">{item.period}</span>
              <h3>{item.degree}</h3>
              <p className="company">{item.school}</p>
              <p>{item.detail}</p>
              <div className="chips">
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </motion.article>
          ))}
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
  }, [directory, gridVariants, cardVariants, stackVariants]);

  return content;
}
