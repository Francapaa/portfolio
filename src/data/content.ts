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
      title: "Ingeniero de software",
      description:
        "Ingeniero de software con 1 año de experiencia, especializado en arquitecturas modernas, inteligencia artificial y experiencias de usuario de alto rendimiento.",
      cta: "Ver Proyectos",
      contact: "Contactar",
    },
    about: {
      title: "Sobre Mí",
      description:
        "Soy un Ingeniero de software apasionado por crear soluciones escalables y de alto rendimiento. Me especializo en desarrollo full-stack con foco en arquitecturas modernas, integración de IA y optimización de rendimiento. Siempre buscando aprender nuevas tecnologías y enfrentar desafíos complejos.",
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
          name: "PRD2Blog",
          url: "https://github.com/francapaa/multi-agents-data-ops",
          description:
            "Plataforma de automatización de pipelines de datos impulsada por IA con arquitectura multi-agente usando LangGraph. PRD2Blog transforma Documentos de Requisitos de Producto (PRDs) en artículos técnicos listos para publicar mediante un workflow coordinado multi-agente.",
          highlights: [
            "Sistema multi-agente con LangGraph que investiga fuentes externas, verifica consistencia factual e itera hasta cumplir umbrales de calidad.",
            "Entrega artículos pulidos mientras rastrea uso de tokens, costos de ejecución y métricas del pipeline.",
          ],
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
      ],
    },
    currentProjects: {
      title: "Proyectos Actuales",
      items: [
        {
          name: "C++ Transformer Inference Engine",
          url: "https://github.com/Francapaa/capaa-inference-sv",
          description:
            "Building a Transformer-based LLM inference engine from scratch in modern C++, implementando el pipeline matemático y de sistemas completo para generación de texto autoregresiva. El proyecto incluye una librería de tensores custom, multiplicación matricial optimizada, softmax, RMSNorm, activaciones SiLU, positional embeddings (RoPE) y una implementación completa de Multi-Head Attention con KV Cache para inferencia token por token. El motor está diseñado con una arquitectura modular con memory management custom, scheduling multithread de requests, integración de tokenizer y un servidor HTTP, asemejándose a la arquitectura de sistemas de producción como llama.cpp y vLLM.",
          highlights: [
            "Implementando el forward pass completo de Transformers desde cero, incluyendo Multi-Head Attention, RMSNorm, RoPE, SiLU, residual connections y decoding autoregresivo.",
            "Desarrollando una librería de tensores custom y operaciones matemáticas clave: multiplicación matricial, softmax, normalización y funciones de activación.",
            "Diseñando un motor de inferencia con KV Cache, scheduling multithread de requests y componentes modulares inspirados en arquitecturas modernas de LLM serving.",
            "Construyendo la infraestructura circundante: integración de tokenizer, memory management custom, worker threads y API HTTP para servir modelos.",
            "Estructurando el proyecto para reflejar motores de inferencia reales, habilitando soporte futuro para checkpoints de Transformers preentrenados y ejecución optimizada.",
          ],
          tech: ["C++", "LLM Inference", "KV Cache", "Multi-Head Attention", "RoPE", "HTTP Server", "Multithreading"],
        },
        {
          name: "AccountantAI",
          url: "https://github.com/Francapaa/accountantAI",
          description:
            "Asistente de IA para estudios contables que responde consultas impositivas citando siempre la normativa oficial ARCA/AFIP. RAG sobre un corpus vectorizado de normas, con contexto persistente por cliente, historial completo, multi-contador y sincronización automática de la normativa.",
          highlights: [
            "RAG sobre normativa oficial (ARCA/AFIP) vectorizada, con citas verificables (documento + URL) en cada respuesta.",
            "Chatbot RAG (recuperación y generación) con Gemini 2.5 que adapta las respuestas al contexto real de cada cliente.",
            "Bot de ingesta que corre como cron job nocturno: detecta cambios por hash y re-indexa solo lo modificado.",
            "Espacio de trabajo por cliente con historial completo y login multi-contador con row-level security.",
          ],
          tech: ["Next.js", "TypeScript", "FastAPI", "Gemini 2.5", "Supabase", "pgvector", "Playwright", "RAG"],
        },
      ],
    },
    experience: {
      title: "Experiencia",
      items: [
        {
          role: "Ingeniero de Software",
          period: "Feb 2025 — Presente",
          company: "Freelance",
          description: [
            "Reemplacé flujos de trabajo manuales heredados por un ERP centralizado que soporta más de 20 vendedores concurrentes.",
            "Implementé bloqueo pesimista (pessimistic locking) en PostgreSQL para eliminar condiciones de carrera sobre el inventario compartido durante picos de reservas.",
            "Construí una plataforma e-commerce B2C con trabajos cron automatizados de expiración de reservas.",
            "Desarrollé una plataforma full-stack de alta disponibilidad que procesa más de 15.000 solicitudes diarias en los flujos de ventas, inventario y checkout.",
            "Diseñé un chatbot RAG multi-agente (recuperación y generación) para brindar recomendaciones de productos contextuales en tiempo real.",
            "Construí un ERP interno de cumplimiento de pedidos con analíticas de ventas personalizadas y pruebas rigurosas E2E y unitarias (Vitest, Playwright, Pytest).",
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
      title: "Software Engineer",
      description:
        "Software Engineer with 1 year of experience, specialized in modern architectures, artificial intelligence, and high-performance user experiences.",
      cta: "View Projects",
      contact: "Contact Me",
    },
    about: {
      title: "About Me",
      description:
        "I'm a software engineer passionate about building scalable, high-performance solutions. I specialize in full-stack development with a focus on modern architectures, AI integration, and performance optimization. Always looking to learn new technologies and tackle complex challenges.",
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
          name: "PRD2Blog",
          url: "https://github.com/francapaa/multi-agents-data-ops",
          description:
            "AI-driven data pipeline automation platform built with a multi-agent architecture using LangGraph. PRD2Blog transforms Product Requirements Documents (PRDs) into publication-ready technical blog posts using a coordinated multi-agent workflow.",
          highlights: [
            "Multi-agent system with LangGraph that researches external sources, verifies factual consistency, and iterates until quality thresholds are met.",
            "Delivers polished articles while tracking token usage, execution costs, and pipeline metrics.",
          ],
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
      ],
    },
    currentProjects: {
      title: "Current Projects",
      items: [
        {
          name: "C++ Transformer Inference Engine",
          url: "https://github.com/Francapaa/capaa-inference-sv",
          description:
            "Building a Transformer-based LLM inference engine from scratch in modern C++, implementing the complete mathematical and systems pipeline required for autoregressive text generation. The project includes a custom tensor library, optimized matrix multiplication, softmax, RMSNorm, SiLU activations, positional embeddings (RoPE), and a full Multi-Head Attention implementation with KV Cache for efficient token-by-token inference. The engine is designed with a modular architecture featuring custom memory management, multithreaded request scheduling, tokenizer integration, and an HTTP server, closely resembling the architecture of production inference systems such as llama.cpp and vLLM.",
          highlights: [
            "Implementing the complete Transformer forward pass from scratch, including Multi-Head Attention, RMSNorm, RoPE, SiLU, residual connections, and autoregressive decoding.",
            "Developing a custom tensor library and core mathematical operations such as matrix multiplication, softmax, normalization, and activation functions.",
            "Designing an inference engine with KV Cache, multithreaded request scheduling, and modular components inspired by modern LLM serving architectures.",
            "Building the surrounding infrastructure, including tokenizer integration, custom memory management, worker threads, and an HTTP API for model serving.",
            "Structuring the project to closely mirror real-world inference engines, enabling future support for pretrained Transformer checkpoints and optimized execution.",
          ],
          tech: ["C++", "LLM Inference", "KV Cache", "Multi-Head Attention", "RoPE", "HTTP Server", "Multithreading"],
        },
        {
          name: "AccountantAI",
          url: "https://github.com/Francapaa/accountantAI",
          description:
            "AI assistant for accounting firms that answers tax questions always citing the official ARCA/AFIP regulations. RAG over a vectorized corpus of official regulations, with persistent per-client context, full history, multi-accountant, and automatic regulation sync.",
          highlights: [
            "RAG over official ARCA/AFIP regulations with verifiable citations (document + URL) in every answer.",
            "RAG chatbot (retrieval & generation) with Gemini 2.5 that tailors answers to each client's real context.",
            "Ingestion bot running as a nightly cron job: detects changes by hash and re-indexes only what changed.",
            "Per-client workspace with full history and multi-accountant login with row-level security.",
          ],
          tech: ["Next.js", "TypeScript", "FastAPI", "Gemini 2.5", "Supabase", "pgvector", "Playwright", "RAG"],
        },
      ],
    },
    experience: {
      title: "Experience",
      items: [
        {
          role: "Software Engineer",
          period: "Feb 2025 — Present",
          company: "Freelance",
          description: [
            "Replaced legacy manual workflows with a centralized ERP supporting 20+ concurrent sales reps.",
            "Implemented pessimistic locking on PostgreSQL to eliminate race conditions on shared inventory during peak reservations.",
            "Built a B2C e-commerce platform with automated reservation expiration cron jobs.",
            "Engineered a high-availability full-stack platform processing 15,000+ daily requests across sales, inventory, and checkout flows.",
            "Designed a multi-agent RAG chatbot (retrieval & generation) to deliver real-time, context-aware product recommendations.",
            "Built an internal order fulfillment ERP with custom sales analytics and rigorous E2E/unit testing (Vitest, Playwright, Pytest).",
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
