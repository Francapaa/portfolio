export const projects = [
  {
    name: "PRD2Blog",
    url: "https://github.com/francapaa/multi-agents-data-ops",
    description:
      "Multi-agent AI architecture (Researcher, Writer, Checker, Polisher) that autonomously turns product requirement documents (PRDs) into blog posts. Distributed async task queues with Celery and long-running AI pipelines streamed via SSE.",
    tech: ["Next.js", "FastAPI", "LangGraph", "Celery", "SSE", "PostgreSQL", "Gemini"],
  },
  {
    name: "rateyourproject.com",
    url: "https://github.com/francapaa/rateyourproject",
    description:
      "Platform that rates software project quality to tell if your projects are solid enough for job applications, via a hexagonal chart. Go backend that analyzes repos, rebuilds structure and detects languages, project patterns, best practices, test coverage, docs and architecture.",
    tech: ["Next.js", "TypeScript", "Go", "Gin", "PostgreSQL", "Gemini API"],
  },
] as const;

export const projectsEs = [
  {
    name: "PRD2Blog",
    url: "https://github.com/francapaa/multi-agents-data-ops",
    description:
      "Arquitectura de IA multiagente (Researcher, Writer, Checker y Polisher) para convertir de forma autónoma documentos de requisitos de producto (PRD) en artículos de blog. Arquitectura distribuida con Celery para colas de tareas asíncronas y pipelines de IA de larga duración mediante SSE.",
    tech: ["Next.js", "FastAPI", "LangGraph", "Celery", "SSE", "PostgreSQL", "Gemini"],
  },
  {
    name: "rateyourproject.com",
    url: "https://github.com/francapaa/rateyourproject",
    description:
      "Plataforma que evalúa la calidad de proyectos de software para determinar si son lo suficientemente sólidos para postulaciones laborales, mediante un gráfico hexagonal. Backend en Go que analiza repositorios, reconstruye su estructura e identifica lenguajes, patrones, mejores prácticas, cobertura de pruebas, documentación y arquitectura.",
    tech: ["Next.js", "TypeScript", "Go", "Gin", "PostgreSQL", "Gemini API"],
  },
] as const;

export const currentProjects = [
  {
    name: "FactoryMark",
    url: "https://github.com/francapaa/factoryMark",
    description:
      "Agent for retail and online stores that researches competitors, detects opportunities (SWOT) and generates ready-to-publish marketing, with human approval.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Jev", "LLMs"],
  },
  {
    name: "C++ Inference Server",
    url: "https://github.com/Francapaa/capaa-inference-sv",
    description:
      "A Transformer-based LLM inference engine from scratch in modern C++, with custom tensors, optimized matrix multiplication, attention, RoPE, KV Cache, scheduling, and an HTTP server.",
    tech: ["C++", "LLM Inference", "KV Cache", "RoPE", "Multithreading"],
  },
] as const;

export const currentProjectsEs = [
  {
    name: "FactoryMark",
    url: "https://github.com/francapaa/factoryMark",
    description:
      "Agente para comercios y comercios online que investiga a la competencia, detecta oportunidades (FODA) y genera el marketing listo para publicar, con aprobación humana.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Jev", "LLMs"],
  },
  {
    name: "C++ Inference Server",
    url: "https://github.com/Francapaa/capaa-inference-sv",
    description:
      "Servidor de inferencia de Transformers desde cero en C++ moderno, con tensores propios, multiplicación matricial optimizada, atención, RoPE, KV Cache, scheduling y servidor HTTP.",
    tech: ["C++", "LLM Inference", "KV Cache", "Multi-Head Attention", "RoPE", "HTTP Server", "Multithreading"],
  },
] as const;
