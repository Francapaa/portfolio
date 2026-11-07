# Developer Portfolio

Portfolio bilingüe ES/EN construido con React, TypeScript, Vite, React Three Fiber, Three.js y GSAP. Estética editorial negra con acentos naranja cobre, escultura 3D procedural, navegación por anclas y experiencia profesional desplegable.

## Desarrollo

Usar Node 22 y pnpm 11.25.0. Ejecutar `corepack pnpm install --frozen-lockfile` y `corepack pnpm dev`. El servidor escucha en `0.0.0.0:3000`. `corepack pnpm check` verifica TypeScript y `corepack pnpm build` crea `dist/`.

## Personalización

Completar `src/profile.ts` con nombre, email y URLs HTTPS de GitHub y LinkedIn reales. Estos campos están vacíos deliberadamente porque no fueron proporcionados. El botón de personalización en Contacto permite probar esos datos en el navegador usando localStorage, pero no los publica globalmente. Cambios persistentes para todos los visitantes se realizan en el archivo y en un nuevo checkpoint.

Las responsabilidades y fechas originales bilingües se conservan en `src/data.ts`. La fuente de estilos es `src/styles.css` y la escultura 3D está en `src/components/Scene.tsx`.

## Movimiento y accesibilidad

El control junto al selector de idioma pausa el movimiento. La preferencia `prefers-reduced-motion` del sistema desactiva las animaciones, el scroll suave y la renderización continua 3D. Navegación por teclado, foco visible, enlace para saltar al contenido, acordeones con ARIA y diálogo nativo de personalización.

La escultura usa solo geometría e iluminación locales; no descarga modelos ni texturas. Un recurso generado original sirve como respaldo en caso de un error de WebGL.

## Publicación

Frontend estático sin backend ni base de datos. La configuración de WebDev usa un build reproducible y `dist` como directorio de salida. Guardar un checkpoint y publicar son acciones separadas. La web puede probarse desde Preview antes de publicar.

## Fondo atmosférico

El fondo cambia gradualmente de carbón a óxido/cobre mientras se recorre la página. Halos radiales desplazados y un indicador de progreso lateral siguen el scroll; una trama técnica de bajo contraste aporta textura sin interferir con la lectura. En móvil los halos y el indicador se ajustan para mantener la superficie ligera y no cubrir el texto.
