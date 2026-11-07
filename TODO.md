# Portfolio — alcance confirmado

- [x] Portfolio clean, elegante y premium con negro y tonos anaranjados. Hero interactivo con objetos 3D creados mediante React Three Fiber y Three.js.
- [x] Selector inglés/español que alterna todos los contenidos y las versiones profesionales proporcionadas. Mostrar Damiano Bazar Argentina — Freelance (May 2026 — Sep 2026), PuraHome Argentina — Freelance (Dec/Dic 2025 — May 2026) y South Neumaticos Argentina — Freelance (Mar 2025 — Mar 2026), con cargos y dos responsabilidades literales por experiencia, conservando integraciones, herramientas, cifras y terminología técnica. No inventar información personal, académica, proyectos, tecnologías, disponibilidad ni contacto.
- [x] Animaciones smooth de entrada, scroll y transición; textos animados con GSAP y microinteracciones coherentes. Navegación fluida entre secciones con indicadores y estados interactivos.
- [x] Fondo atmosférico reactivo al scroll: el negro carbón cambia suavemente hacia tonos óxido/cobre y las luces radiales se desplazan por las secciones, acompañado por una textura técnica muy sutil e indicador de progreso vertical.
- [x] Responsive escritorio/tablet/móvil, con escena y animaciones adaptadas a la capacidad del dispositivo. Accesibilidad con teclado, contraste legible y reducción de movimiento conforme al sistema; controles explícitos de animación.
- [x] Revisar la implementación con un agente de solo lectura y checks existentes; guardar un checkpoint con el sitio disponible en Preview.

## Estructura

Frontend estático React + TypeScript + Vite, sin backend ni base de datos. `src/data.ts` conserva los datos bilingües; `src/profile.ts` permite personalizar la identidad no provista; `src/components/` separa la escena 3D y el diálogo accesible; `src/App.tsx` compone el portfolio; `src/styles.css` contiene diseño y responsive. `public/` contiene favicon y manifest de rutas. Dependencias: React, Three.js, @react-three/fiber, GSAP, lucide-react. Escena procedural original, no modelos remotos. Negro carbón, naranja cobre; tipografía editorial de alto contraste y etiquetas monoespaciadas. Navegación sticky, hero asimétrico y experiencia con detalles desplegables; datos profesionales completos siempre accesibles.

## Evidencia

`pnpm build` pasó TypeScript estricto y Vite tras la actualización de fondo cromático. Tras reiniciar Vite con el entorno sincronizado, `GET /` respondió HTTP 200, `/manus-routes.json` entregó HTTP 200 y Content-Type application/json y el módulo principal pasó la transformación de Vite. La revisión confirmó los datos literales, escena R3F, GSAP y controles de reducción de movimiento. La atmósfera de scroll usa un timeline GSAP con scrub para desplazar los colores RGB base y los halos cobre/naranja, con trama y progreso visual discretos. Nombre y contacto están vacíos deliberadamente, configurables en código o en una prueba local por navegador.
