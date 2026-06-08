"use client";

import Navbar from "@/components/navbar/Navbar";
import Projects from "@/components/projects/Projects";
import Footer from "@/components/footer/Footer";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-16">
        <Projects />
      </main>
      <Footer />
    </>
  );
}
