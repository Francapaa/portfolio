"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import gsap from "gsap";

export default function Navbar() {
  const { lang, t, toggleLang } = useI18n();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);

  const items = [
    { href: "/about", label: t.nav.about },
    { href: "/skills", label: t.nav.skills },
    { href: "/projects", label: t.nav.projects },
    { href: "/experience", label: t.nav.experience },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-logo",
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(
        ".nav-link",
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".nav-lang",
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.5, delay: 0.45, ease: "back.out(2)" }
      );

      document.querySelectorAll<HTMLElement>(".nav-link").forEach((el) => {
        const underline = el.querySelector<HTMLElement>(".nav-underline");
        const onEnter = () => {
          gsap.to(el, { y: -2, scale: 1.06, duration: 0.35, ease: "elastic.out(1, 0.5)" });
          if (underline) gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(el, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
          if (underline && !el.classList.contains("is-active")) {
            gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.in" });
          }
        };
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

      document.querySelectorAll<HTMLElement>(".nav-lang").forEach((btn) => {
        const onEnter = () => gsap.to(btn, { scale: 1.08, duration: 0.25, ease: "power2.out" });
        const onLeave = () => gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.out" });
        const onClick = () =>
          gsap.fromTo(
            btn,
            { scale: 0.9, rotate: 8 },
            { scale: 1, rotate: 0, duration: 0.45, ease: "elastic.out(1, 0.4)" }
          );
        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
        btn.addEventListener("click", onClick);
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    rootRef.current?.querySelectorAll<HTMLElement>(".nav-link").forEach((el) => {
      const underline = el.querySelector<HTMLElement>(".nav-underline");
      if (!underline) return;
      gsap.to(underline, {
        scaleX: el.classList.contains("is-active") ? 1 : 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div
        ref={rootRef}
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        <Link href="/" className="nav-logo flex items-center gap-2 opacity-0">
          <Image
            src="/Fran.png"
            alt="Francisco Caparruva"
            loading="eager"
            width={70}
            height={70}
            className="rounded-full object-cover"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link relative opacity-0 transition-colors hover:text-gray-900 ${
                  active ? "is-active text-gray-900" : ""
                }`}
              >
                {item.label}
                <span className="nav-underline absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-slate-900" />
              </Link>
            );
          })}

          <button
            onClick={toggleLang}
            className="nav-lang opacity-0 px-3 py-1 text-xs font-semibold rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="nav-lang opacity-0 px-3 py-1 text-xs font-semibold rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>
      </div>
    </nav>
  );
}