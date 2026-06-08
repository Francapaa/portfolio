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
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "#0a1a2e", textShadow: "0 1px 6px rgba(255,255,255,0.6)" }}
              >
                {project.name}
              </h3>
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
