"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import GithubContribution from "../github/contributions";

export default function About() {
  const { t } = useI18n();

  return (
    <section className="py-24 px-6 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <Image
          src="/Fran.png"
          loading="eager"
          alt="Francisco Caparruvá"
          width={280}
          height={280}
          className="rounded-2xl object-cover shadow-lg"
        />
        <div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ color: "#0a1a2e", textShadow: "0 1px 8px rgba(255,255,255,0.7)" }}
          >
            {t.about.title}
          </h2>
          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#1a2d42", textShadow: "0 1px 4px rgba(255,255,255,0.5)" }}
          >
            {t.about.description}
          </p>
          <GithubContribution/>
        </div>
      </div>
    </section>
  );
}
