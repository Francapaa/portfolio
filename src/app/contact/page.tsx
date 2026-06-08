"use client";

import Navbar from "@/components/navbar/Navbar";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-16">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
