"use client";

import { useI18n } from "@/lib/i18n";

export default function Contact() {
  const { t } = useI18n();

  return (
    <section className="py-24 px-6 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t.contact.title}
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
          {t.contact.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://mail.google.com/mail/u/0/?ogbl#inbox?compose=DmwnWrRnZMwTPRcBrPFFmZXDmBKFWbnlrZXcZlBNhXnQjbNxbWFJkRqHdNcwTVGPCkFPFzRBwMVV"
            className="px-8 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
          >
            {t.contact.email}
          </a>
          <a
            href="https://github.com/Francapaa"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/francisco-caparruva-6711a82a2/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
