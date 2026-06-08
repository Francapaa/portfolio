"use client";

import { useI18n } from "@/lib/i18n";

export default function Experience() {
  const { t } = useI18n();

  return (
    <section className="py-24 px-6 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{ color: "#0a1a2e", textShadow: "0 1px 8px rgba(255,255,255,0.7)" }}
        >
          {t.experience.title}
        </h2>
        <div className="space-y-8">
          {t.experience.items.map((exp, i) => (
            <div key={i} className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: "#0a1a2e", textShadow: "0 1px 6px rgba(255,255,255,0.6)" }}
                  >
                    {exp.role}
                  </h3>
                  <p style={{ color: "#1a2d42", textShadow: "0 1px 4px rgba(255,255,255,0.5)" }}>
                    {exp.company}
                  </p>
                </div>
                <span
                  className="text-sm mt-1 sm:mt-0"
                  style={{ color: "#2a4a6b", textShadow: "0 1px 3px rgba(255,255,255,0.5)" }}
                >
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-2">
                {exp.description.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-2"
                    style={{ color: "#1e3350", textShadow: "0 1px 3px rgba(255,255,255,0.5)" }}
                  >
                    <span style={{ color: "#2a4a6b" }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
