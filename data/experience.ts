export const experience = [
  {
    role: "Software Engineer",
    company: "Freelance",
    period: "Feb 2025 — Present",
    bullets: [
      "Replaced legacy manual workflows with a centralized ERP supporting 20+ concurrent sales reps.",
      "Implemented pessimistic locking on PostgreSQL to eliminate inventory race conditions.",
      "Built a B2C e-commerce platform with automated reservation expiration jobs.",
      "Engineered a high-availability platform processing 15,000+ daily requests.",
      "Designed a multi-agent RAG chatbot for real-time product recommendations.",
    ],
  },
] as const;

export const experienceEs = [
  {
    role: "Ingeniero de Software",
    company: "Freelance",
    period: "Feb 2025 — Presente",
    bullets: [
      "Reemplacé flujos de trabajo manuales heredados por un ERP centralizado que soporta más de 20 vendedores concurrentes.",
      "Implementé bloqueo pesimista (pessimistic locking) en PostgreSQL para eliminar condiciones de carrera sobre el inventario compartido durante picos de reservas.",
      "Construí una plataforma e-commerce B2C con trabajos cron automatizados de expiración de reservas.",
      "Desarrollé una plataforma full-stack de alta disponibilidad que procesa más de 15.000 solicitudes diarias en los flujos de ventas, inventario y checkout.",
      "Diseñé un chatbot RAG multi-agente (recuperación y generación) para brindar recomendaciones de productos contextuales en tiempo real.",
      "Construí un ERP interno de cumplimiento de pedidos con analíticas de ventas personalizadas y pruebas rigurosas E2E y unitarias (Vitest, Playwright, Pytest).",
    ],
  },
] as const;
