"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();
  const [greetingText, setGreetingText] = useState("");
  const [nameText, setNameText] = useState("");
  const [titleText, setTitleText] = useState("");
  const [showDesc, setShowDesc] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    setGreetingText("");
    setNameText("");
    setTitleText("");
    setShowDesc(false);
    setShowButtons(false);

    const greeting = t.hero.greeting + " ";
    const name = t.hero.name;
    const title = t.hero.title;
    let i = 0;

    const typeGreeting = setInterval(() => {
      if (i < greeting.length) {
        setGreetingText(greeting.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeGreeting);
        let j = 0;
        const typeName = setInterval(() => {
          if (j < name.length) {
            setNameText(name.slice(0, j + 1));
            j++;
          } else {
            clearInterval(typeName);
            let k = 0;
            const typeTitle = setInterval(() => {
              if (k < title.length) {
                setTitleText(title.slice(0, k + 1));
                k++;
              } else {
                clearInterval(typeTitle);
                setTimeout(() => setShowDesc(true), 200);
                setTimeout(() => setShowButtons(true), 600);
              }
            }, 50);
          }
        }, 70);
      }
    }, 60);

    return () => {
      clearInterval(typeGreeting);
    };
  }, [t]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-3xl">
        <p
          className="text-lg md:text-xl mb-4 min-h-[1.75rem]"
          style={{ color: "#1a2d42", textShadow: "0 1px 4px rgba(255,255,255,0.5)" }}
        >
          {greetingText}
          <span className="inline-block w-[2px] h-[1.1em] bg-current ml-0.5 align-middle animate-pulse" />
        </p>
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4 min-h-[1.2em]"
          style={{ color: "#0a1a2e", textShadow: "0 2px 8px rgba(255,255,255,0.6)" }}
        >
          {nameText}
        </h1>
        <h2
          className="text-2xl md:text-3xl font-medium mb-6 min-h-[1.5em]"
          style={{ color: "#1a2d42", textShadow: "0 1px 6px rgba(255,255,255,0.5)" }}
        >
          {titleText}
        </h2>
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: showDesc ? 1 : 0,
            transform: showDesc ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "#1e3350", textShadow: "0 1px 3px rgba(255,255,255,0.4)" }}
          >
            {t.hero.description}
          </p>
        </div>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ease-out"
          style={{
            opacity: showButtons ? 1 : 0,
            transform: showButtons ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <Link
            href="/projects"
            className="px-8 py-3 rounded-full text-white font-medium transition-colors"
            style={{ background: "#0a1a2e" }}
          >
            {t.hero.cta}
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full border font-medium transition-colors"
            style={{ borderColor: "#1a2d42", color: "#0a1a2e" }}
          >
            {t.hero.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}
