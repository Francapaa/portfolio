"use client";

import { useI18n } from "@/lib/i18n";

export default function Experience() {
  const { t } = useI18n();

  return (
    <section className="py-24 px-6 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          {t.experience.title}
        </h2>
        <div className="space-y-8">
          {t.experience.items.map((exp, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white/80 backdrop-blur border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {exp.role}
                  </h3>
                  <p className="text-gray-500">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-400 mt-1 sm:mt-0">
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-2">
                {exp.description.map((item, j) => (
                  <li key={j} className="text-gray-600 flex gap-2">
                    <span className="text-gray-400 mt-1">•</span>
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
