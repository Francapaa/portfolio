export type Language = "es" | "en";

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  bullets: readonly string[];
}

export interface ProjectEntry {
  name: string;
  url: string;
  description: string;
  tech: readonly string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  detail: string;
}

export const experience: readonly ExperienceEntry[] = [
  {
    role: "Software Developer",
    company: "Damiano Bazar Argentina — Freelance",
    period: "May 2026 — Sep 2026",
    bullets: [
      "Defined the platform architecture to enable online sales, integrating Mercado Pago (payments), Contabilium (ERP), Cron Jobs, ARCA (electronic invoicing) and Correo Argentino (shipping).",
      "Built a reseller system that sells from the client's physical stock, integrated with Tiendanube and Mercado Libre.",
    ],
  },
  {
    role: "Software Developer",
    company: "PuraHome Argentina — Freelance",
    period: "Dec 2025 — May 2026",
    bullets: [
      "Designed a high-availability full-stack platform processing 15,000+ daily requests for sales and inventory.",
      "Built an internal ERP for order management with sales analytics and E2E + unit tests (Vitest, Playwright, Pytest).",
    ],
  },
  {
    role: "Software Developer",
    company: "South Neumaticos Argentina — Freelance",
    period: "Mar 2025 — Mar 2026",
    bullets: [
      "Replaced Excel workflows with a centralized ERP supporting 20+ concurrent sales reps.",
      "Implemented pessimistic locking in PostgreSQL to eliminate race conditions on shared inventory during reservation peaks.",
    ],
  },
];

export const experienceEs: readonly ExperienceEntry[] = [
  {
    role: "Desarrollador de software",
    company: "Damiano Bazar Argentina — Freelance",
    period: "May 2026 — Sep 2026",
    bullets: [
      "Definí la arquitectura de la plataforma para habilitar la venta por internet, integrando Mercado Pago (cobros), Contabilium (ERP), Cron Jobs, ARCA (facturación electrónica) y Correo Argentino (envíos).",
      "Desarrollé un sistema de revendedores que permite vender con el stock físico del cliente, integrado con Tiendanube y Mercado Libre.",
    ],
  },
  {
    role: "Desarrollador de software",
    company: "PuraHome Argentina — Freelance",
    period: "Dic 2025 — May 2026",
    bullets: [
      "Diseñé una plataforma full-stack de alta disponibilidad que procesa más de 15.000 peticiones diarias relacionadas con ventas e inventario.",
      "Desarrollé un sistema ERP interno para la gestión de pedidos, con análisis de ventas con test E2E y unitarios (Vitest, Playwright, Pytest).",
    ],
  },
  {
    role: "Desarrollador de software",
    company: "South Neumaticos Argentina — Freelance",
    period: "Mar 2025 — Mar 2026",
    bullets: [
      "Sustituí flujos de trabajo en Excel por un sistema ERP centralizado que da soporte a más de 20 representantes de ventas simultáneos.",
      "Implementé bloqueo pesimista en PostgreSQL para eliminar race conditions en el inventario compartido durante los picos de reservas.",
    ],
  },
];

export const projects: readonly ProjectEntry[] = [
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
];

export const projectsEs: readonly ProjectEntry[] = [
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
];

export const currentProjects: readonly ProjectEntry[] = [
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
];

export const currentProjectsEs: readonly ProjectEntry[] = [
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
];

export const education: readonly EducationEntry[] = [
  {
    degree: "Bachelor in Computer Science",
    school: "Universidad de Buenos Aires (UBA), Argentina",
    period: "2026 — Present",
    detail: "Licenciatura en Ciencias de la Computación.",
  },
  {
    degree: "University Technician in Programming — GPA: 8.5",
    school: "Universidad Tecnológica Nacional (UTN), Argentina",
    period: "2024 — 2026 (Graduated)",
    detail: "Tecnicatura Universitaria en Programación.",
  },
];

export const educationEs: readonly EducationEntry[] = [
  {
    degree: "Licenciatura en Ciencias de la Computación",
    school: "Universidad de Buenos Aires (UBA), Argentina",
    period: "2026 — Presente",
    detail: "Licenciatura en Ciencias de la computación.",
  },
  {
    degree: "Tecnicatura Universitaria en Programación — Promedio: 8.5",
    school: "Universidad Tecnológica Nacional (UTN), Argentina",
    period: "2024 — 2026 (Graduado)",
    detail: "Tecnicatura Universitaria en Programación.",
  },
];

export const skills = [
  "TypeScript",
  "Python",
  "C++",
  "Go",
  "Gin",
  "Next.js",
  "FastAPI",
  "LangGraph",
  "PostgreSQL",
  "AWS",
  "Vercel AI SDK",
] as const;

export const about = {
  es: `Nací con una computadora abajo del brazo, toda mi vida estuve ligado a los juegos, tanto es así que desde chico uno de mis pasatiempos favoritos era crear servidores en Minecraft. Cuando tenía 15/16 años yo ya sabía lo que quería estudiar, la tecnología, software y primeras apariciones de IAs chatbots como ChatGPT, me llamaban la atención. Desde los 17 años, todos los días prendo la computadora para crear, arreglar, aprender o mejorar algo, lo veo como un hobby.

Desde los 18 años trabajo como desarrollador de software freelance, momento en el que crecí y maduré muchísimo profesionalmente porque me empecé a encargar y a entender todo lo que conlleva elevar requerimientos hasta mantener una aplicación todos los días.`,
  en: `I was born with a computer under my arm — gaming has been part of my life for as long as I can remember, so much so that as a kid one of my favorite hobbies was creating Minecraft servers. When I was 15/16 I already knew what I wanted to study: technology, software and the first wave of AI chatbots like ChatGPT fascinated me. Since I was 17, I turn on my computer every day to create, fix, learn or improve something — I see it as a hobby.

Since I was 18 I've worked as a freelance software engineer, a period where I grew and matured a lot professionally because I started to own everything from gathering requirements to maintaining an application every single day.`,
} as const;

export const services = {
  es: {
    title: "Servicios",
    intro:
      "Creo flujos de trabajo autónomos con human-in-the-loop: mínima intervención humana, máxima continuidad. Diseño, automatizo y pongo en producción lo que hoy te cuesta tiempo y clientes.",
    items: [
      {
        title: "Flujos de Trabajo Autónomos",
        desc: "Procesos que corren solos y solo te piden un ok cuando hace falta. Tú decides, el sistema ejecuta.",
      },
      {
        title: "Automatizaciones a Medida",
        desc: "Conecto tus herramientas para que los datos se muevan solos. Sin copiar/pegar, sin errores, sin esperar a nadie.",
      },
      {
        title: "Chatbots RAG",
        desc: "Asistentes que responden con tu propia información, entendiendo el contexto y el historial de cada conversación.",
      },
      {
        title: "Software a Medida y Aplicaciones Web + Observabilidad Total",
        desc: "Entrego tu software a medida y aplicaciones web listas para usar, desplegados y con todo monitoreado. Ves dónde hacen click, dónde abandonan y qué usan más, para convertir más y no adivinar.",
      },
    ],
  },
  en: {
    title: "Services",
    intro:
      "I build autonomous workflows with human-in-the-loop: minimal human input, maximum continuity. I design, automate and ship what costs you time and customers today.",
    items: [
      {
        title: "Autonomous Workflows",
        desc: "Self-running processes that only need your sign-off when it matters. You decide, the system runs.",
      },
      {
        title: "Custom Automations",
        desc: "I connect your tools so data moves on its own. No copy-paste, no errors, no waiting.",
      },
      {
        title: "RAG Chatbots",
        desc: "Assistants grounded in your own knowledge, understanding context and conversation history.",
      },
      {
        title: "Custom Software & Web Apps + Full Observability",
        desc: "I ship your custom software and web apps ready to use, deployed and fully observed. See where users click, where they drop off and what they use most — to sell more, not guess.",
      },
    ],
  },
} as const;

export const copy = {
  es: {
    brand: "Francisco Caparruva",
    home: "Francisco Caparruva — Portfolio",
    role: "Software Engineer · AI Engineer",
    loading: "Cargando escena",
    nav: ["Sobre mí", "Experiencia", "Proyectos", "Servicios", "Contacto"],
    eyebrow: "INGENIERO DE SOFTWARE · AI ENGINEER",
    headline: ["Francisco", "Caparruva."],
    intro:
      "Desarrollador de software freelance desde los 18. Construyo plataformas, integraciones y productos con IA que funcionan en producción.",
    cta: "Ver experiencia",
    secondary: "Ver proyectos",
    available: "Disponible para proyectos puntuales",
    scroll: "Scroll para descubrir",
    drag: "Arrastrá para rotar",
    aboutKicker: "01 / SOBRE MÍ",
    aboutTitle: "Sobre mí",
    skillsLabel: "Tecnologías",
    educationLabel: "Educación",
    expKicker: "02 / EXPERIENCIA",
    expTitle: "Experiencia",
    expAccent: "en producción.",
    expIntro:
      "Trabajo freelance desde los 18. Cada uno de estos fue un sistema en producción, no una demo.",
    details: "Ver detalles",
    hide: "Cerrar detalles",
    responsibilities: "Responsabilidades",
    metricLabels: [
      "peticiones diarias en PuraHome",
      "representantes de ventas simultáneos",
    ],
    metricValues: ["15.000+", "20+"],
    projectsKicker: "03 / PROYECTOS",
    projectsTitle: "Proyectos",
    projectsAccent: "que construí.",
    projectsIntro:
      "Herramientas propias y sistemas que diseñé, desarrollé y puse en producción.",
    featuredLabel: "Destacados",
    currentLabel: "En desarrollo",
    view: "Ver en GitHub",
    servicesKicker: "04 / SERVICIOS",
    servicesTitle: "Servicios",
    servicesAccent: "",
    contactKicker: "05 / CONTACTO",
    contactTitle: ["¿Tenés un proyecto", "en mente?"],
    contactIntro:
      "Escribime y conversamos sobre tu proyecto, una integración o lo que necesites automatizar.",
    contactCta: "Escribime",
    footer: "© 2026 Francisco Caparruva",
    footerTagline: "Construido con React, TypeScript y Three.js.",
    top: "Volver arriba",
    pause: "Pausar animaciones",
    play: "Activar animaciones",
    menu: "Abrir navegación",
    close: "Cerrar",
    skip: "Ir al contenido",
    keyboard: "Usá las flechas para rotar y Inicio para restablecer.",
  },
  en: {
    brand: "Francisco Caparruva",
    home: "Francisco Caparruva — Portfolio",
    role: "Software Engineer · AI Engineer",
    loading: "Loading scene",
    nav: ["About", "Experience", "Projects", "Services", "Contact"],
    eyebrow: "SOFTWARE ENGINEER · AI ENGINEER",
    headline: ["Francisco", "Caparruva."],
    intro:
      "Freelance software engineer since 18. I build platforms, integrations and AI products that run in production.",
    cta: "See experience",
    secondary: "See projects",
    available: "Available for select projects",
    scroll: "Scroll to discover",
    drag: "Drag to rotate",
    aboutKicker: "01 / ABOUT",
    aboutTitle: "About",
    skillsLabel: "Skills",
    educationLabel: "Education",
    expKicker: "02 / EXPERIENCE",
    expTitle: "Experience",
    expAccent: "in production.",
    expIntro:
      "Freelancing since I was 18. Every one of these was a system in production, not a demo.",
    details: "View details",
    hide: "Close details",
    responsibilities: "Responsibilities",
    metricLabels: [
      "daily requests at PuraHome",
      "concurrent sales representatives",
    ],
    metricValues: ["15,000+", "20+"],
    projectsKicker: "03 / PROJECTS",
    projectsTitle: "Projects",
    projectsAccent: "I've built.",
    projectsIntro:
      "My own tools and systems that I designed, built and shipped to production.",
    featuredLabel: "Featured",
    currentLabel: "In progress",
    view: "View on GitHub",
    servicesKicker: "04 / SERVICES",
    servicesTitle: "Services",
    servicesAccent: "",
    contactKicker: "05 / CONTACT",
    contactTitle: ["Have a project", "in mind?"],
    contactIntro:
      "Reach out and we'll talk about your project, an integration or whatever you need to automate.",
    contactCta: "Email me",
    footer: "© 2026 Francisco Caparruva",
    footerTagline: "Built with React, TypeScript and Three.js.",
    top: "Back to top",
    pause: "Pause animations",
    play: "Enable animations",
    menu: "Open navigation",
    close: "Close",
    skip: "Skip to content",
    keyboard: "Use the arrow keys to rotate and Home to reset.",
  },
} as const;
