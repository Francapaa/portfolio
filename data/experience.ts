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
