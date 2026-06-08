"use client";

import Navbar from "@/components/navbar/Navbar";
import Experience from "@/components/experience/Experience";
import Footer from "@/components/footer/Footer";

export default function ExperiencePage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-16">
        <Experience />
      </main>
      <Footer />
    </>
  );
}
