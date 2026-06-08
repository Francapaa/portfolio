"use client";

import { useI18n } from "@/lib/i18n";

const skillsData = {
  programmingLanguages: ["TypeScript", "Go", "Python", "C++"],
  database: ["PostgreSQL", "MongoDB", "Redis"],
  technologies: ["Celery", "React", "NextJS", "FastAPI", "Gin", "NodeJS", "LangGraph", "AWS", "Vercel"],
  testing: ["Vitest", "Playwright"],
};

export default function Skills() {
  const { t } = useI18n();

  return (
    <section className="py-24 px-6 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          {t.skills.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(Object.keys(skillsData) as Array<keyof typeof skillsData>).map(
            (category) => (
              <div key={category}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
                  {t.skills.categories[category]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillsData[category].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm font-medium bg-white/80 backdrop-blur border border-gray-200 rounded-full text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
