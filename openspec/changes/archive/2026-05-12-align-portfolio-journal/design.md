## Context

El portfolio es un Angular 21 standalone con arquitectura signal-based, i18n por archivos JSON (`public/assets/i18n/{en,es}.json`) accedidos vía `LocaleService` y data de contenido también en JSON (`public/assets/data/{experience,projects,skills}.json`). Casi todos los cambios de este change son de contenido, no de código. La única estructura nueva es un botón de CTA en el hero, que ya tiene un patrón consistente para los otros 4 botones.

Decisión clave: este change asume que el dominio `tobiasmoreno.dev` NO se va a activar a corto plazo (camino "limpiar" del PDF). Si el usuario decide activar el dominio en Netlify, este change se descarta o se invierte trivialmente.

## Goals / Non-Goals

**Goals:**
- Coherencia textual entre portfolio y journal (mismo tono, misma identidad).
- Cero referencias canónicas a dominios muertos.
- Acceso al journal desde la primera pantalla del portfolio.
- Stack tecnológico declarable y defendible (sin Vue 3 si no se usa).

**Non-Goals:**
- No tocar el flujo i18n ni la estructura de datos (sigue siendo JSON estático).
- No traducir bullets de Experiencia: ya están bilingüe correctamente vía `locale.locale()` signal.
- No agregar cards con los últimos posts del journal (4.3 del PDF) — postergado, requiere feed compartido entre repos.
- No tocar `CLAUDE.md`, `README.md` ni docs internas de openspec con refs a `tobiasmoreno.dev` (son documentación, no afectan al sitio publicado).

## Decisions

**Limpiar `tobiasmoreno.dev` en vez de activar el dominio.** Alternativa: configurar DNS en Netlify y mantener las refs. Razón para preferir limpiar: no hay confirmación de que el dominio esté comprado/configurable a corto plazo, y un og:url canónico apuntando a un host distinto al de producción perjudica SEO ya hoy. Si el dominio se activa después, revertir es un solo find-and-replace.

**Botón Journal en el hero, no en nav.** Alternativa: agregarlo en el nav superior. Razón: el hero ya tiene fila de CTAs (GitHub/LinkedIn/CV ES/CV EN) — agregar un 5° botón mantiene el patrón visual y aumenta la visibilidad del journal como activo de marca personal.

**Copy de Writing alineado con el hero del journal.** El portfolio dice algo distinto al hero del journal hoy. Alinear ambos al mismo subtítulo ("Aprendizajes técnicos, decisiones profesionales y errores reales. Todo en público, todo sin filtro.") es un costo bajo con beneficio de coherencia inmediata cuando alguien abre los dos sitios.

**Mantener "Writing" en EN / cambiar "Blog" a "Journal" en ES.** Alternativa: forzar "Journal" también en EN. Razón: "Writing" en inglés es más natural como sección de portfolio; el problema real es el ES que dice "Blog" pero linkea a "Journal". Solo se corrige ese desalineo.

**Quitar Vue 3 sin pedir confirmación.** Alternativa: dejarlo con link a proyecto. Razón: no hay proyecto público actual que lo use; mantener tecnologías que no se pueden defender en entrevista resta más que suma. Si en el futuro hay un proyecto Vue, se vuelve a agregar.

## Risks / Trade-offs

- [Cambiar `liveUrl` del proyecto Portfolio en `projects.json` puede romper si alguien hizo un link absoluto a la versión `tobiasmoreno.dev` desde redes] → Riesgo bajo; el dominio no resuelve hoy, así que ningún link externo está funcionando.
- [Quitar Vue 3 puede percibirse como retroceso si alguien lo vio antes] → Bajo; la decisión la respalda la política "solo lo que puedo defender".
- [Tocar i18n keys requiere mantener EN y ES sincronizados] → Mitigación: cada cambio toca los dos archivos en el mismo commit.

## Migration Plan

1. Branch dedicada por commit atómico (un commit por ítem del checklist en `tasks.md`).
2. Deploy a Netlify por push; verificación visual antes de mergear.
3. Rollback trivial: revertir commits, no hay migración de datos.

## Open Questions

- ¿`tobiasmoreno.dev` está comprado? Si sí, ¿se quiere activar antes de archivar este change? (Por defecto: no, seguir camino de limpieza.)
- ¿Confirma el usuario que Vue 3 no se usa en ningún proyecto vigente? (Por defecto: sí, se elimina.)
