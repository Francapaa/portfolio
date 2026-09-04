export const projects = [
  {
    name: "RateYourProject",
    url: "https://github.com/francapaa/rateyourproject",
    description:
      "A platform that analyzes your entire codebase and tells you whether your project is strong enough to get hired, adapted by role and seniority.",
    tech: ["Next.js", "TypeScript", "Go", "PostgreSQL", "Gemini API"],
  },
  {
    name: "PRD2Blog",
    url: "https://github.com/francapaa/multi-agents-data-ops",
    description:
      "AI-driven data pipeline automation platform that transforms product requirements into publication-ready technical blog posts through coordinated agents.",
    tech: ["Next.js 16", "FastAPI", "LangGraph", "PostgreSQL", "Gemini"],
  },
] as const;

export const currentProjects = [
  {
    name: "C++ Transformer Inference Engine",
    url: "https://github.com/Francapaa/capaa-inference-sv",
    description:
      "A Transformer-based LLM inference engine from scratch in modern C++, with custom tensors, optimized matrix multiplication, attention, RoPE, KV Cache, scheduling, and an HTTP server.",
    tech: ["C++", "LLM Inference", "KV Cache", "RoPE", "Multithreading"],
  },
  {
    name: "AccountantAI",
    url: "https://github.com/Francapaa/accountantAI",
    description:
      "AI assistant for accounting firms that answers tax questions with official ARCA/AFIP citations, persistent client context, multi-accountant workspaces, and automatic regulation sync.",
    tech: ["Next.js", "FastAPI", "Gemini 2.5", "Supabase", "pgvector", "RAG"],
  },
] as const;
