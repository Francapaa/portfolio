export type Language = "es" | "en";

export const experience = [
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
] as const;

export const experienceEs = [
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
] as const;

export const projectMeta = [
  {
    name: "Damiano Bazar",
    tags: ["E-commerce", "ERP", "Integrations"],
    tools: [
      "Mercado Pago",
      "Contabilium",
      "ARCA",
      "Tiendanube",
      "Mercado Libre",
    ],
  },
  {
    name: "PuraHome",
    tags: ["Full-stack", "High availability", "Testing"],
    tools: ["Vitest", "Playwright", "Pytest"],
  },
  {
    name: "South Neumaticos",
    tags: ["ERP", "PostgreSQL", "Concurrency"],
    tools: ["PostgreSQL", "Pessimistic locking"],
  },
] as const;

export const copy = {
  es: {
    brand: "DESARROLLADOR",
    home: "Portfolio — Inicio",
    loading: "3D / CARGANDO",
    settingsLabel: "PORTFOLIO / PERSONALIZACIÓN",
    workflow: ["PENSAR.", "CREAR.", "PULIR."],
    nav: ["Experiencia", "Enfoque", "Contacto"],
    eyebrow: "DESARROLLADOR DE SOFTWARE · FREELANCE",
    headline: ["Ideas claras.", "Sistemas", "sólidos."],
    intro:
      "Conecto diseño, arquitectura y código para convertir procesos complejos en experiencias simples.",
    cta: "Explorar experiencia",
    secondary: "Mi enfoque",
    drag: "ARRASTRÁ PARA EXPLORAR",
    scroll: "SCROLL PARA DESCUBRIR",
    sculpture: "ESTUDIO DE FORMA / 001",
    sculptureTitle: "Escultura 3D interactiva",
    sculptureHelp:
      "Arrastrá para rotar. Con teclado: flechas para girar; Inicio para restablecer. La animación se puede pausar desde el menú.",
    craft: "INGENIERÍA CON INTENCIÓN",
    specialties: [
      "Desarrollo full-stack",
      "Arquitectura de sistemas",
      "ERP e integraciones",
    ],
    experience: "Experiencia que",
    experienceAccent: "se traduce en impacto.",
    experienceIntro:
      "Software real. Problemas reales. Soluciones que funcionan más allá de la pantalla.",
    expLabel: "EXPERIENCIA SELECCIONADA",
    details: "Ver detalles",
    hide: "Cerrar detalles",
    responsibilities: "RESPONSABILIDADES",
    metricLabels: [
      "peticiones diarias en PuraHome",
      "representantes de ventas simultáneos",
    ],
    metricValues: ["15.000+", "20+"],
    focusLabel: "CÓMO TRABAJO",
    focusTitle: "El detalle importa.",
    focusIntro:
      "La interfaz es solo el principio. Debajo, cada decisión tiene que sostener el negocio.",
    focusItems: [
      {
        title: "Arquitectura antes que ruido.",
        text: "Plataformas de venta conectadas de punta a punta: cobros, inventario, facturación y envíos.",
        tags: "MERCADO PAGO / ARCA / CORREO ARGENTINO",
      },
      {
        title: "Confiabilidad por diseño.",
        text: "Alta disponibilidad, integridad del inventario y control de concurrencia en PostgreSQL.",
        tags: "POSTGRESQL / PESSIMISTIC LOCKING",
      },
      {
        title: "Calidad que se comprueba.",
        text: "Pruebas unitarias y E2E para validar los flujos que hacen funcionar cada plataforma.",
        tags: "VITEST / PLAYWRIGHT / PYTEST",
      },
    ],
    contactLabel: "EL SIGUIENTE PASO",
    contactTitle: ["Tu próxima idea.", "Buen código."],
    contactIntro: "De un proceso complejo a un sistema bien pensado.",
    contactCta: "Hablemos",
    configure: "Personalizar contacto",
    contactMissing: "Nombre y canales de contacto pendientes de personalizar.",
    footer: "Diseñado con intención. Construido con código.",
    top: "Volver arriba",
    pause: "Pausar animaciones",
    play: "Activar animaciones",
    menu: "Abrir navegación",
    close: "Cerrar",
    skip: "Ir al contenido",
    settingsTitle: "Hacé este portfolio tuyo.",
    settingsIntro:
      "Estos datos se guardan solo en este navegador. Para publicarlos para todos, incorporalos en src/profile.ts.",
    name: "Nombre",
    email: "Email",
    github: "URL de GitHub",
    linkedin: "URL de LinkedIn",
    save: "Guardar personalización",
    saved: "Personalización guardada en este navegador.",
    invalid: "Revisá el email y usá URLs completas https:// para tus enlaces.",
  },
  en: {
    brand: "DEVELOPER",
    home: "Portfolio — Home",
    loading: "3D / LOADING",
    settingsLabel: "PORTFOLIO / SETTINGS",
    workflow: ["THINK.", "BUILD.", "REFINE."],
    nav: ["Experience", "Approach", "Contact"],
    eyebrow: "SOFTWARE DEVELOPER · FREELANCE",
    headline: ["Clear ideas.", "Solid", "systems."],
    intro:
      "Connecting design, architecture, and code to turn complex processes into simple experiences.",
    cta: "Explore experience",
    secondary: "My approach",
    drag: "DRAG TO EXPLORE",
    scroll: "SCROLL TO DISCOVER",
    sculpture: "FORM STUDY / 001",
    sculptureTitle: "Interactive 3D sculpture",
    sculptureHelp:
      "Drag to rotate. Keyboard: arrow keys rotate; Home resets. Animation can be paused from the menu.",
    craft: "INTENTIONAL ENGINEERING",
    specialties: [
      "Full-stack development",
      "Systems architecture",
      "ERP & integrations",
    ],
    experience: "Experience that",
    experienceAccent: "makes an impact.",
    experienceIntro:
      "Real software. Real challenges. Solutions that work beyond the screen.",
    expLabel: "SELECTED EXPERIENCE",
    details: "View details",
    hide: "Close details",
    responsibilities: "RESPONSIBILITIES",
    metricLabels: [
      "daily requests at PuraHome",
      "concurrent sales representatives",
    ],
    metricValues: ["15,000+", "20+"],
    focusLabel: "MY APPROACH",
    focusTitle: "Details make the difference.",
    focusIntro:
      "The interface is only the beginning. Every decision beneath it has to support the business.",
    focusItems: [
      {
        title: "Architecture over noise.",
        text: "Sales platforms connected end to end: payments, inventory, invoicing, and shipping.",
        tags: "MERCADO PAGO / ARCA / CORREO ARGENTINO",
      },
      {
        title: "Reliability by design.",
        text: "High availability, inventory integrity, and PostgreSQL concurrency control.",
        tags: "POSTGRESQL / PESSIMISTIC LOCKING",
      },
      {
        title: "Quality you can verify.",
        text: "Unit and E2E tests to validate the flows that keep each platform working.",
        tags: "VITEST / PLAYWRIGHT / PYTEST",
      },
    ],
    contactLabel: "WHAT’S NEXT",
    contactTitle: ["Your next idea.", "Great code."],
    contactIntro: "From a complex process to a thoughtfully built system.",
    contactCta: "Let’s talk",
    configure: "Personalize contact",
    contactMissing: "Name and contact channels are waiting to be personalized.",
    footer: "Designed with intention. Built with code.",
    top: "Back to top",
    pause: "Pause animations",
    play: "Enable animations",
    menu: "Open navigation",
    close: "Close",
    skip: "Skip to content",
    settingsTitle: "Make this portfolio yours.",
    settingsIntro:
      "These details are saved only in this browser. To publish them for everyone, add them in src/profile.ts.",
    name: "Name",
    email: "Email",
    github: "GitHub URL",
    linkedin: "LinkedIn URL",
    save: "Save personalization",
    saved: "Personalization saved in this browser.",
    invalid: "Check your email and use complete https:// URLs for your links.",
  },
} as const;
