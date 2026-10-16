"use client";

import { Code2 } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header" style={{ position: "relative", zIndex: 1 }}>
      <div className="brand-mark">
        <span className="brand-dot" /> FC
        <span className="brand-slash">/</span> 2026
      </div>
      <div className="status">
        <span className="status-dot" /> available for select projects
        <a
          href="https://github.com/francapaa"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          <Code2 size={16} />
        </a>
      </div>
    </header>
  );
}
