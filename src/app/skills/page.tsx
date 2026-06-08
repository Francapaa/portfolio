"use client";

import Navbar from "@/components/navbar/Navbar";
import Skills from "@/components/skills/Skills";
import Footer from "@/components/footer/Footer";

export default function SkillsPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-16">
        <Skills />
      </main>
      <Footer />
    </>
  );
}
