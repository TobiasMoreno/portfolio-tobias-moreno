## Why

Hoy el portfolio, el journal y LinkedIn cuentan tres versiones distintas del mismo profesional. El portfolio tiene contenido sólido pero arrastra fricciones puntuales que rompen la coherencia con el journal: un bullet débil en la experiencia de Creditú, referencias canónicas a un dominio (`tobiasmoreno.dev`) que no apunta al sitio en producción, un copy de la sección Writing que no alinea con el hero del journal, falta de acceso directo al journal desde el hero, y una tecnología (Vue 3) listada en el stack que no se usa en el trabajo actual ni en proyectos públicos.

## What Changes

- Reemplazar el primer bullet del rol Backend/Full Stack @ Techforb/Creditú en `experience.json` (EN + ES) por una versión más fuerte que cubra el ciclo end-to-end (spec → producción → observabilidad).
- Limpiar todas las referencias canónicas a `https://tobiasmoreno.dev` (no activo) y reemplazarlas por `https://portfolio-tobias-moreno.netlify.app` en `index.html` (og:url) y `projects.json` (liveUrl del proyecto Portfolio).
- Agregar un botón "Journal" al hero, después de CV (EN), apuntando a `https://tobias-moreno.netlify.app`, con keys i18n.
- Alinear el copy de la sección Writing: cambiar el título ES de "Blog" a "Journal" y reescribir subtítulo en EN/ES a una versión consistente con el hero del journal ("Aprendizajes técnicos, decisiones profesionales y errores reales. Todo en público, todo sin filtro.").
- Quitar Vue 3 de `skills.json` (no se usa en el trabajo actual ni en proyectos públicos).

**Fuera de alcance**: traducción de bullets de Experiencia (el repo ya es bilingüe correctamente vía signal `locale`); cards con últimos posts del journal en el portfolio (postergado, requiere feed compartido entre repos).

## Capabilities

### New Capabilities
- `portfolio-content-alignment`: Asegura que el contenido textual y los enlaces salientes del portfolio sean coherentes con la identidad madre (Backend & Product Engineer en Techforb/Creditú) y con el journal hermano. Cubre experiencia, hero, sección Writing, stack y referencias canónicas de SEO.

### Modified Capabilities

## Impact

- **Archivos afectados**:
  - `public/assets/data/experience.json` (bullet 0 en EN y ES)
  - `public/assets/data/projects.json` (liveUrl del proyecto Portfolio)
  - `public/assets/data/skills.json` (quitar entry `vue3`)
  - `public/assets/i18n/en.json` y `es.json` (keys de hero CTA + writing section)
  - `src/index.html` (og:url canónico)
  - `src/app/features/sections/hero/hero-section.component.ts` (nuevo botón Journal)
- **SEO**: corrige la URL canónica que hoy apunta a un dominio muerto, mejorando indexación.
- **Sin breaking changes**: solo contenido + un botón nuevo. No toca lógica ni estructura de datos.
- **Decisión pendiente del usuario**: si el dominio `tobiasmoreno.dev` está comprado y se quiere activar en Netlify, este cambio se invierte (se mantienen las refs `tobiasmoreno.dev` y se configura el DNS). La propuesta asume el camino de limpieza.
