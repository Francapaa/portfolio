export type Lang = "es" | "en";

export const content = {
  es: {
    nav: {
      about: "Sobre Mí",
      skills: "Habilidades",
      projects: "Proyectos",
      experience: "Experiencia",
      contact: "Contacto",
    },
    hero: {
      greeting: "Hola, soy",
      name: "Francisco Caparruva",
      title: "Software Developer",
      description:
        "Desarrollador full-stack especializado en arquitecturas modernas, inteligencia artificial y experiencias de usuario de alto rendimiento.",
      cta: "Ver Proyectos",
      contact: "Contactar",
    },
    about: {
      title: "Sobre Mí",
      description:
        "Soy un desarrollador de software apasionado por crear soluciones escalables y de alto rendimiento. Me especializo en desarrollo full-stack con foco en arquitecturas modernas, integración de IA y optimización de rendimiento. Siempre buscando aprender nuevas tecnologías y enfrentar desafíos complejos.",
    },
    skills: {
      title: "Habilidades",
      categories: {
        programmingLanguages:"Lenguajes de programacion",
        database: "Bases de Datos",
        technologies: "Tecnologias",
        testing: "Testing",
      },
    },
    projects: {
      title: "Proyectos",
      items: [
        {
          name: "RateYourProject",
          url: "https://github.com/francapaa/rateyourproject",
          description:
            "Plataforma que analiza tu codebase completo (vía upload de .ZIP) y te dice si tus proyectos son suficientemente fuertes para ser contratado, adaptado por rol objetivo y nivel de seniority.",
          highlights: [
            "Diseñé un sistema multi-agente que evalúa arquitectura, testing, mantenibilidad y calidad de código, generando un gráfico hexagonal con sugerencias accionables.",
            "Implementé un backend en Go que reconstruye la estructura del repositorio, identifica lenguajes y patrones, y alimenta un pipeline de scoring por rol.",
          ],
          tech: ["Next.js", "TypeScript", "Go", "PostgreSQL", "Gemini API"],
        },
        {
          name: "Multi-Agents Data Ops",
          url: "https://github.com/francapaa/multi-agents-data-ops",
          description:
            "Plataforma DataOps impulsada por IA que transforma PRDs en contenido técnico estructurado a través de un workflow multi-agente.",
          highlights: [
            "Sistema multi-agente con LangGraph (researcher, writer, checker, polisher) con validación automatizada, reintentos y verificación basada en confianza.",
            "Pipeline asíncrono con Celery y Redis, con streaming de progreso en tiempo real vía Server-Sent Events (SSE).",
          ],
          tech: [
            "FastAPI",
            "Next.js",
            "LangGraph",
            "PostgreSQL",
            "Celery",
            "Gemini API",
          ],
        },
      ],
    },
    experience: {
      title: "Experiencia",
      items: [
        {
          role: "Software Developer",
          period: "Feb 2025 — Presente",
          company: "Freelance",
          description: [
            "Desarrollé aplicaciones full-stack usando Next.js, Go, Node.js y Supabase.",
            "Reduje la latencia de las aplicaciones hasta en un 85% mediante caching, SSR e indexación de base de datos.",
            "Implementé arquitecturas en tiempo real usando WebSockets/SSE y funcionalidades RAG/LLM.",
            "Incrementé la cobertura de tests del 15% al 80% usando Vitest y Playwright.",
          ],
        },
      ],
    },
    contact: {
      title: "Contacto",
      description:
        "¿Tenés un proyecto en mente o querés charlar? No dudes en contactarme.",
      email: "Enviar Email",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Francisco Caparruva",
      title: "Software Developer",
      description:
        "Full-stack developer specialized in modern architectures, artificial intelligence, and high-performance user experiences.",
      cta: "View Projects",
      contact: "Contact Me",
    },
    about: {
      title: "About Me",
      description:
        "I'm a software developer passionate about building scalable, high-performance solutions. I specialize in full-stack development with a focus on modern architectures, AI integration, and performance optimization. Always looking to learn new technologies and tackle complex challenges.",
    },
    skills: {
      title: "Skills",
      categories: {
        programmingLanguages: "programmingLanguages",
        database: "Databases",
        technologies: "technologies",
        testing: "Testing",
      },
    },
    projects: {
      title: "Projects",
      items: [
        {
          name: "RateYourProject",
          url: "https://github.com/francapaa/rateyourproject",
          description:
            "A platform that analyzes your entire codebase (via .ZIP upload) and tells you whether your projects are strong enough to get hired, adapted by target role and seniority level.",
          highlights: [
            "Designed a multi-agent system that evaluates architecture, testing, maintainability and code quality, generating a hexagonal chart with actionable improvement suggestions.",
            "Implemented a Go backend that reconstructs repository structure, identifies languages and patterns, and feeds a role-aware scoring pipeline.",
          ],
          tech: ["Next.js", "TypeScript", "Go", "PostgreSQL", "Gemini API"],
        },
        {
          name: "Multi-Agents Data Ops",
          url: "https://github.com/francapaa/multi-agents-data-ops",
          description:
            "An AI-driven DataOps platform that transforms Product Requirements Documents (PRDs) into structured technical content through a multi-agent workflow.",
          highlights: [
            "Built a LangGraph-based multi-agent system with researcher, writer, checker, and polisher agents, including automated validation, retries, and confidence-based verification.",
            "Implemented asynchronous pipeline processing using Celery and Redis, with real-time progress streaming through Server-Sent Events (SSE).",
          ],
          tech: [
            "FastAPI",
            "Next.js",
            "LangGraph",
            "PostgreSQL",
            "Celery",
            "Gemini API",
          ],
        },
      ],
    },
    experience: {
      title: "Experience",
      items: [
        {
          role: "Software Developer",
          period: "Feb 2025 — Present",
          company: "Freelance",
          description: [
            "Developed full-stack applications using Next.js, Go, Node.js, and Supabase.",
            "Reduced application latency by up to 85% through caching, SSR, and database indexing.",
            "Implemented real-time architectures using WebSockets/SSE and RAG/LLM features.",
            "Increased test coverage from 15% to 80% using Vitest and Playwright.",
          ],
        },
      ],
    },
    contact: {
      title: "Contact",
      description:
        "Have a project in mind or want to chat? Feel free to reach out.",
      email: "Send Email",
    },
  },
} as const;
