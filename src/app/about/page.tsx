"use client";

import Navbar from "@/components/navbar/Navbar";
import About from "@/components/about/About";
import Footer from "@/components/footer/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-16">
        <About />
      </main>
      <Footer />
    </>
  );
}
