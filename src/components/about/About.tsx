"use client";

import { useI18n } from "@/lib/i18n";

export default function About() {
  const { t } = useI18n();

  return (
    <section className="py-24 px-6 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          {t.about.title}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          {t.about.description}
        </p>
      </div>
    </section>
  );
}
