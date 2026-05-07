## 1. Global styles — animations and base utilities

- [x] 1.1 Add `@keyframes tm-fade-in-up` to `src/styles.css` (opacity 0→1, translateY 20px→0, 400ms ease-out) and a utility class `.animate-fade-in-up` that applies it
- [x] 1.2 Add `@media (prefers-reduced-motion: reduce)` block in `styles.css` that sets `animation: none` and `transition: none` for all elements
- [x] 1.3 Add section-level base styles: `.section` utility for consistent `py-24 px-6` spacing and `max-w-5xl mx-auto` container (or use inline Tailwind in each component — choose consistency and apply same pattern everywhere)

## 2. i18n dictionaries — expand for all sections

- [x] 2.1 Expand `public/assets/i18n/en.json` with `hero`, `about`, `mindset`, `experience`, `projects`, `stack`, `writing`, `contact` namespaces — all English copy written naturally (see task notes below for key list)
- [x] 2.2 Expand `public/assets/i18n/es.json` with the same 8 namespaces — Spanish translations, identical key structure
- [x] 2.3 Verify both files have identical key sets at all nesting levels (manual diff)

**Key reference for en.json (add to existing file):**
```
hero.greeting, hero.name, hero.tagline, hero.description,
hero.cta_projects, hero.cta_contact,
hero.social_github, hero.social_linkedin, hero.cv_es, hero.cv_en

about.title, about.paragraph_1, about.paragraph_2,
about.chip_product, about.chip_observability, about.chip_impact,
about.chip_resilience, about.chip_async, about.chip_iterate

mindset.title, mindset.subtitle,
mindset.card1_title, mindset.card1_desc,
mindset.card2_title, mindset.card2_desc,
mindset.card3_title, mindset.card3_desc,
mindset.card4_title, mindset.card4_desc,
mindset.card5_title, mindset.card5_desc

experience.title, experience.present, experience.current_badge,
experience.highlights_title, experience.stack_title

projects.title, projects.subtitle,
projects.demo, projects.repo, projects.view_all

stack.title, stack.subtitle,
stack.backend, stack.frontend, stack.cloud, stack.testing, stack.practices

writing.title, writing.subtitle, writing.cta

contact.title, contact.subtitle, contact.location,
contact.copy_email, contact.copied, contact.availability
```

## 3. SiteHeader — complete navigation

- [x] 3.1 Add `RouterLink` import and nav links array to `SiteHeaderComponent`; render desktop nav links using `[routerLink]="'/'" [fragment]="'about'"` pattern for each of the 6 anchors (about, experience, projects, stack, writing, contact)
- [x] 3.2 Add locale toggle button: shows current locale (`EN`/`ES`), calls `locale.setLocale()` on click; inject `LocaleService`
- [x] 3.3 Add theme toggle button: shows icon for current resolved theme (☀️ light / 🌙 dark / 💻 system), cycles modes on click; inject `ThemeService`
- [x] 3.4 Add `isMenuOpen = signal(false)` and hamburger button (visible only on mobile via `md:hidden`); desktop nav hidden on mobile via `hidden md:flex`
- [x] 3.5 Add mobile overlay: `@if (isMenuOpen())` renders a fixed full-viewport overlay with the same nav links, locale toggle, theme toggle, and a close button; add `aria-expanded` binding on hamburger button
- [x] 3.6 Close mobile overlay when a nav link is clicked (call `isMenuOpen.set(false)` in the click handler)
- [x] 3.7 Use `t()` for all nav labels via `protected readonly locale = inject(LocaleService)` — brand stays as "TM" (no translation needed)

## 4. SiteFooter — update with translations and social links

- [x] 4.1 Inject `LocaleService` into `SiteFooterComponent`; replace hardcoded copyright with `{{ locale.t('footer.copyright') }}`
- [x] 4.2 Add GitHub and LinkedIn icon links (SVG inline or text links) to the footer
- [x] 4.3 Add `{{ locale.t('footer.built_with') }}` line

## 5. HeroSection

- [x] 5.1 Create `src/app/features/sections/hero/hero-section.component.ts` — standalone, OnPush
- [x] 5.2 Template: `<section id="hero">` with two-column layout (text left, photo right on desktop; stacked on mobile)
- [x] 5.3 Add profile photo using `NgOptimizedImage` with `ngSrc="assets/img/Tobi.jpeg"` `width="400"` `height="400"` `priority` `alt="Tobias Moreno"`
- [x] 5.4 Render name, tagline (`locale.t('hero.tagline')`), description paragraph
- [x] 5.5 CTA buttons: `[routerLink]="'/'" [fragment]="'projects'"` and `[routerLink]="'/'" [fragment]="'contact'"`
- [x] 5.6 Social links row: GitHub, LinkedIn, CV ES (Google Drive link), CV EN (Google Drive link) — all `target="_blank" rel="noopener"`
- [x] 5.7 Add `animate-fade-in-up` CSS animation class to the text column; slight delay on the photo column

## 6. AboutSection

- [x] 6.1 Create `src/app/features/sections/about/about-section.component.ts` — OnPush, inject `LocaleService`
- [x] 6.2 Template: `<section id="about">` with section title, two paragraphs from t(), and a row of value chips
- [x] 6.3 Chips: "Product mindset", "Observability", "Impact over complexity", "Resilience", "Async thinking", "Iterate fast" — all via t() keys
- [x] 6.4 Add `animate-fade-in-up` class to the section

## 7. MindsetSection

- [x] 7.1 Create `src/app/features/sections/mindset/mindset-section.component.ts` — OnPush, inject `LocaleService`
- [x] 7.2 Define a local `principles` array of 5 objects with `{ icon: string, titleKey: string, descKey: string }` — icons as Unicode emoji or simple SVG
- [x] 7.3 Template: `<section id="mindset">` with title/subtitle, then `@for (p of principles)` rendering cards
- [x] 7.4 Card styles: border `border-[--color-border]` + `hover:border-[--color-accent]` transition, rounded-xl, padding, `transition-all duration-200`
- [x] 7.5 Add `animate-fade-in-up` class to the section

## 8. ExperienceSection

- [x] 8.1 Create `src/app/features/sections/experience/experience-section.component.ts` — OnPush, inject `LocaleService` and `ContentService`
- [x] 8.2 Load experience data: `protected readonly items = toSignal(this.content.getExperience(), { initialValue: [] })`
- [x] 8.3 Template: `<section id="experience">` with vertical timeline layout; `@for (item of items())` renders each entry
- [x] 8.4 Each entry: company logo via `NgOptimizedImage` (`ngSrc="assets/img/creditu.png"` `width="40"` `height="40"`), role, company name, date range (startDate → `t('experience.present')` if current), "Current" badge if `item.current`, highlights list, stack chips
- [x] 8.5 Add `animate-fade-in-up` class to the section

## 9. ProjectsSection

- [x] 9.1 Create `src/app/features/sections/projects/projects-section.component.ts` — OnPush, inject `LocaleService` and `ContentService`
- [x] 9.2 Load projects: `protected readonly projects = toSignal(this.content.getProjects(), { initialValue: [] })`
- [x] 9.3 Template: `<section id="projects">` with title/subtitle, then a 2-column responsive grid (`grid-cols-1 md:grid-cols-2 gap-6`)
- [x] 9.4 Project card: fixed-aspect image container with `NgOptimizedImage` (`fill` mode), title, description (truncated with `line-clamp-3`), tech chips row, links (demo + repo icons/text)
- [x] 9.5 Card hover: `hover:-translate-y-1 hover:shadow-lg transition-all duration-200`
- [x] 9.6 Add `animate-fade-in-up` class to the section

## 10. StackSection

- [x] 10.1 Create `src/app/features/sections/stack/stack-section.component.ts` — OnPush, inject `LocaleService` and `ContentService`
- [x] 10.2 Load skills: `protected readonly skills = toSignal(this.content.getSkills(), { initialValue: [] })`
- [x] 10.3 Derive category groups: `protected readonly groups = computed(() => groupBy(this.skills(), s => s.category))` — implement a local `groupBy` utility
- [x] 10.4 Template: `<section id="stack">` with title/subtitle, then `@for (category of categoryOrder)` rendering a group with its category label (via t()) and pill grid
- [x] 10.5 Skill pill: small rounded badge with `bg-[--color-border]` background and `text-[--color-fg]` text
- [x] 10.6 Add `animate-fade-in-up` class to the section

## 11. WritingSection

- [x] 11.1 Create `src/app/features/sections/writing/writing-section.component.ts` — OnPush, inject `LocaleService` and `ContentService`
- [x] 11.2 Load posts: `protected readonly posts = toSignal(this.content.getPosts(), { initialValue: [] })`
- [x] 11.3 Template: `<section id="writing">` with title, subtitle, then `@if (posts().length === 0)` → render journal CTA; `@else` → render post cards
- [x] 11.4 Journal CTA: a styled link/button "Read my journal →" pointing to `https://tobias-moreno.netlify.app/` with `target="_blank" rel="noopener"`
- [x] 11.5 Post card (for future use): title, excerpt, publishedAt, tags, link to `post.url`
- [x] 11.6 Add `animate-fade-in-up` class to the section

## 12. ContactSection

- [x] 12.1 Create `src/app/features/sections/contact/contact-section.component.ts` — OnPush, inject `LocaleService`
- [x] 12.2 Add `copied = signal(false)` and `copyEmail()` method: `navigator.clipboard.writeText('tobiasmoreno.tm.21@gmail.com').then(() => { this.copied.set(true); setTimeout(() => this.copied.set(false), 2000); })`
- [x] 12.3 Template: `<section id="contact">` with title, subtitle/availability statement, email button (label toggles via `@if (copied())`), GitHub link, LinkedIn link, location string
- [x] 12.4 Add `animate-fade-in-up` class to the section

## 13. HomeComponent — compose all sections

- [x] 13.1 Import `NgOptimizedImage`, `RouterLink` and all 8 section components into `HomeComponent`
- [x] 13.2 Replace the empty template with `<app-hero-section />` (eager) followed by 7 `@defer (on viewport)` blocks, one per section (About → Mindset → Experience → Projects → Stack → Writing → Contact)
- [x] 13.3 Add `@placeholder` to each `@defer` block: an empty `<div>` with `min-h-[400px]` to prevent layout shift

## 14. Build verification

- [x] 14.1 Run `npm run build` — confirm zero errors and zero TypeScript type errors
- [ ] 14.2 Run `npm start`, open browser, verify all 8 sections render as expected, dark mode toggle works, locale switch works, mobile menu opens/closes
- [ ] 14.3 Confirm `@defer` works: open DevTools Network tab, scroll down, confirm section chunks load lazily
- [ ] 14.4 Confirm FOUC prevention still works: set `localStorage.tm-theme = 'dark'` and reload
