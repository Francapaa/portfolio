"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-3xl">
        <p className="text-lg md:text-xl text-gray-600 mb-4">{t.hero.greeting}</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-4">
          {t.hero.name}
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-700 mb-6">
          {t.hero.title}
        </h2>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.hero.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projects"
            className="px-8 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
          >
            {t.hero.cta}
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            {t.hero.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}
