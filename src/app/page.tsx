"use client";

import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
