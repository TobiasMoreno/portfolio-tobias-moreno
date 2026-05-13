## 1. Experience bullet (Creditú)

- [x] 1.1 Reemplazar `highlights[0]` en `public/assets/data/experience.json` (EN) por: "Owned end-to-end backend features in a microservices architecture, from spec definition to production deployment and post-release observability."
- [x] 1.2 Reemplazar `highlightsEs[0]` por la traducción ES equivalente.
- [x] 1.3 Verificar visualmente que ambas locales rinden correctamente la nueva versión.

## 2. Limpiar referencias a tobiasmoreno.dev

- [x] 2.1 En `src/index.html`, cambiar `og:url` de `https://tobiasmoreno.dev` a `https://portfolio-tobias-moreno.netlify.app`.
- [x] 2.2 En `public/assets/data/projects.json`, cambiar el `liveUrl` del proyecto Portfolio de `https://tobiasmoreno.dev` a `https://portfolio-tobias-moreno.netlify.app`.
- [x] 2.3 Grep `tobiasmoreno.dev` en todo el repo y confirmar que las únicas refs restantes son CLAUDE.md/README/openspec docs (aceptable, fuera de scope).

## 3. Botón Journal en hero

- [x] 3.1 Agregar key `hero.cta_journal` = "Journal" en `public/assets/i18n/en.json` y `es.json`.
- [x] 3.2 Agregar key `hero.cta_journal_aria` con label apropiado en EN/ES.
- [x] 3.3 En `src/app/features/sections/hero/hero-section.component.ts`, agregar un 5° botón después del CV (EN) con `href="https://tobias-moreno.netlify.app"`, `target="_blank"`, `rel="noopener noreferrer"`, y usando las keys nuevas.
- [x] 3.4 Mantener consistencia visual con los otros 4 botones (mismo componente/estilo).

## 4. Copy de Writing alineado con journal hero

- [x] 4.1 En `public/assets/i18n/es.json`, cambiar `writing.title` de "Blog" a "Journal".
- [x] 4.2 Actualizar el subtítulo/párrafos de la sección Writing en EN: "Technical learnings, professional decisions, and real mistakes. All in public, all unfiltered."
- [x] 4.3 Actualizar el subtítulo en ES: "Aprendizajes técnicos, decisiones profesionales y errores reales. Todo en público, todo sin filtro."
- [x] 4.4 Verificar que el componente `writing-section.component.ts` sigue rindiendo correctamente (sin cambios estructurales).

## 5. Quitar Vue 3 del stack

- [x] 5.1 Eliminar la entry `{ "id": "vue3", "name": "Vue 3", "category": "frontend" }` de `public/assets/data/skills.json`.
- [x] 5.2 Buscar referencias residuales a `vue3` en componentes/i18n y limpiar si las hay.

## 6. Validación

- [x] 6.1 `npm run build` sin errores.
- [ ] 6.2 Lighthouse SEO ≥ 90 en home. **PENDIENTE post-deploy.**
- [ ] 6.3 Verificar visualmente que el botón Journal abre el sitio correcto. **PENDIENTE revisión visual del usuario.**
- [x] 6.4 Verificar que el `og:url` no contiene `tobiasmoreno.dev`.
