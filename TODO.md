# Portfolio — alcance confirmado

- [x] Portfolio clean, elegante y premium con negro y tonos anaranjados. Hero interactivo con objetos 3D creados mediante React Three Fiber y Three.js.
- [x] Selector inglés/español que alterna todos los contenidos y las versiones profesionales proporcionadas. Mostrar Damiano Bazar Argentina — Freelance (May 2026 — Sep 2026), PuraHome Argentina — Freelance (Dec/Dic 2025 — May 2026) y South Neumaticos Argentina — Freelance (Mar 2025 — Mar 2026), con cargos y dos responsabilidades literales por experiencia, conservando integraciones, herramientas, cifras y terminología técnica. No inventar información personal, académica, proyectos, tecnologías, disponibilidad ni contacto.
- [x] Animaciones smooth de entrada, scroll y transición; textos animados con GSAP y microinteracciones coherentes. Navegación fluida entre secciones con indicadores y estados interactivos.
- [x] Responsive escritorio/tablet/móvil, con escena y animaciones adaptadas a la capacidad del dispositivo. Accesibilidad con teclado, contraste legible y reducción de movimiento conforme al sistema; controles explícitos de animación.
- [x] Revisar la implementación con un agente de solo lectura y checks existentes; guardar un checkpoint con el sitio disponible en Preview.

## Estructura

Frontend estático React + TypeScript + Vite, sin backend ni base de datos. `src/data.ts` conserva los datos bilingües; `src/profile.ts` permite personalizar la identidad no provista; `src/components/` separa la escena 3D y el diálogo accesible; `src/App.tsx` compone el portfolio; `src/styles.css` contiene diseño y responsive. `public/` contiene favicon y manifest de rutas. Dependencias: React, Three.js, @react-three/fiber, GSAP, lucide-react. Escena procedural original, no modelos remotos. Negro carbón, naranja cobre; tipografía editorial de alto contraste y etiquetas monoespaciadas. Navegación sticky, hero asimétrico y experiencia con detalles desplegables; datos profesionales completos siempre accesibles.

## Evidencia

`pnpm build` pasó TypeScript estricto y Vite tras corregir las observaciones del agente de solo lectura. `GET /` responde correctamente y `GET /manus-routes.json` entrega HTTP 200 con Content-Type application/json y la ruta única `/`. El servidor Vite escucha en 0.0.0.0:3000. La revisión confirmó datos literales, escena R3F, GSAP y controles de reducción de movimiento. Se corrigieron navegación sticky, etiquetas bilingües, contraste, giro/restablecimiento por teclado y pausa de la escena fuera de pantalla. Nombre y contacto están vacíos deliberadamente, configurables en código o en una prueba local por navegador.
