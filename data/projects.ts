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

export const projectsEs = [
  {
    name: "RateYourProject",
    url: "https://github.com/francapaa/rateyourproject",
    description:
      "Plataforma que analiza tu codebase completo (vía upload de .ZIP) y te dice si tus proyectos son suficientemente fuertes para ser contratado, adaptado por rol objetivo y nivel de seniority.",
    tech: ["Next.js", "TypeScript", "Go", "PostgreSQL", "Gemini API"],
  },
  {
    name: "PRD2Blog",
    url: "https://github.com/francapaa/multi-agents-data-ops",
    description:
      "Plataforma de automatización de pipelines de datos impulsada por IA con arquitectura multi-agente usando LangGraph. PRD2Blog transforma Documentos de Requisitos de Producto (PRDs) en artículos técnicos listos para publicar mediante un workflow coordinado multi-agente.",
    tech: [
      "Next.js 16",
      "React 19",
      "FastAPI",
      "LangGraph",
      "PostgreSQL",
      "Google Gemini",
      "Celery + Redis",
      "LangSmith",
    ],
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

export const currentProjectsEs = [
  {
    name: "C++ Transformer Inference Engine",
    url: "https://github.com/Francapaa/capaa-inference-sv",
    description:
      "Building a Transformer-based LLM inference engine from scratch in modern C++, implementando el pipeline matemático y de sistemas completo para generación de texto autoregresiva. El proyecto incluye una librería de tensores custom, multiplicación matricial optimizada, softmax, RMSNorm, activaciones SiLU, positional embeddings (RoPE) y una implementación completa de Multi-Head Attention con KV Cache para inferencia token por token.",
    tech: ["C++", "LLM Inference", "KV Cache", "Multi-Head Attention", "RoPE", "HTTP Server", "Multithreading"],
  },
  {
    name: "AccountantAI",
    url: "https://github.com/Francapaa/accountantAI",
    description:
      "Asistente de IA para estudios contables que responde consultas impositivas citando siempre la normativa oficial ARCA/AFIP. RAG sobre un corpus vectorizado de normas, con contexto persistente por cliente, historial completo, multi-contador y sincronización automática de la normativa.",
    tech: ["Next.js", "TypeScript", "FastAPI", "Gemini 2.5", "Supabase", "pgvector", "Playwright", "RAG"],
  },
] as const;
