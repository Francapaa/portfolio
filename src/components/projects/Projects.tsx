"use client";

import { useI18n } from "@/lib/i18n";

export default function Projects() {
  const { t } = useI18n();

  return (
    <section className="py-24 px-6 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{ color: "#0a1a2e", textShadow: "0 1px 8px rgba(255,255,255,0.7)" }}
        >
          {t.projects.title}
        </h2>
        <div className="space-y-12">
          {t.projects.items.map((project) => (
            <div key={project.name} className="p-8">
              <div className="flex items-center gap-3 mb-3">
                <h3
                  className="text-xl font-bold"
                  style={{ color: "#0a1a2e", textShadow: "0 1px 6px rgba(255,255,255,0.6)" }}
                >
                  {project.name}
                </h3>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#0a1a2e" }}
                  aria-label={`GitHub ${project.name}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
              <p
                className="mb-4 leading-relaxed"
                style={{ color: "#1a2d42", textShadow: "0 1px 4px rgba(255,255,255,0.5)" }}
              >
                {project.description}
              </p>
              <ul className="space-y-2 mb-6">
                {project.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="text-sm flex gap-2"
                    style={{ color: "#1e3350", textShadow: "0 1px 3px rgba(255,255,255,0.5)" }}
                  >
                    <span style={{ color: "#2a4a6b" }}>•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-medium rounded-full"
                    style={{
                      color: "#0a1a2e",
                      background: "rgba(255,255,255,0.5)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
