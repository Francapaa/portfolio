"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const { lang, t, toggleLang } = useI18n();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Fran.png"
            alt="Francisco Caparruvá"
            width={70}
            height={70}
            className="rounded-full object-cover"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/about" className="hover:text-gray-900 transition-colors">
            {t.nav.about}
          </Link>
          <Link href="/skills" className="hover:text-gray-900 transition-colors">
            {t.nav.skills}
          </Link>
          <Link href="/projects" className="hover:text-gray-900 transition-colors">
            {t.nav.projects}
          </Link>
          <Link href="/experience" className="hover:text-gray-900 transition-colors">
            {t.nav.experience}
          </Link>
          <Link href="/contact" className="hover:text-gray-900 transition-colors">
            {t.nav.contact}
          </Link>

          <button
            onClick={toggleLang}
            className="px-3 py-1 text-xs font-semibold rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="px-3 py-1 text-xs font-semibold rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>
      </div>
    </nav>
  );
}
