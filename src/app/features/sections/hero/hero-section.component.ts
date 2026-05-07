import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { LocaleService } from '../../../core/locale/locale.service';

@Component({
  selector: 'app-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <section id="hero" class="section-container min-h-[calc(100vh-3.5rem)] flex items-center">
      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div class="animate-fade-in-up flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-[--color-fg]">
              Tobias Moreno
            </h1>
            <p class="text-base font-medium text-[--color-muted] tracking-wide">
              Backend Engineer
              <span class="mx-1.5 text-[--color-border]">·</span>
              <span class="text-[--color-accent]">Product Engineer</span>
            </p>
          </div>

          <p class="text-lg text-[--color-muted] leading-relaxed max-w-lg">
            {{ locale.t('hero.description') }}
          </p>

          <div class="flex flex-wrap gap-3">
            <a [routerLink]="'/'" [fragment]="'projects'"
               class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[--color-accent] text-white text-sm font-medium hover:opacity-90 transition-opacity">
              {{ locale.t('hero.cta_projects') }}
            </a>
            <a [routerLink]="'/'" [fragment]="'contact'"
               class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[--color-border] text-[--color-fg] text-sm font-medium hover:border-[--color-accent] transition-colors">
              {{ locale.t('hero.cta_contact') }}
            </a>
          </div>

          <div class="flex flex-wrap items-center gap-4 pt-2">
            <a href="https://github.com/TobiasMoreno" target="_blank" rel="noopener"
               class="flex items-center gap-1.5 text-sm text-[--color-muted] hover:text-[--color-fg] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              {{ locale.t('hero.social_github') }}
            </a>
            <a href="https://www.linkedin.com/in/tobiasmoreno/" target="_blank" rel="noopener"
               class="flex items-center gap-1.5 text-sm text-[--color-muted] hover:text-[--color-fg] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              {{ locale.t('hero.social_linkedin') }}
            </a>
            <a href="https://drive.google.com/file/d/1CVj8CjdPSItd1qcKQpO7Hpu6bb98BKRB/view" target="_blank" rel="noopener"
               class="text-sm text-[--color-muted] hover:text-[--color-fg] transition-colors px-2.5 py-1 rounded border border-[--color-border] hover:border-[--color-accent]">
              {{ locale.t('hero.cv_es') }}
            </a>
            <a href="https://drive.google.com/file/d/176l5VwXqlH8KP7SJiHWWtlfahl3PpL4O/view" target="_blank" rel="noopener"
               class="text-sm text-[--color-muted] hover:text-[--color-fg] transition-colors px-2.5 py-1 rounded border border-[--color-border] hover:border-[--color-accent]">
              {{ locale.t('hero.cv_en') }}
            </a>
          </div>
        </div>

        <div class="animate-fade-in-up-delay flex justify-center md:justify-end">
          <div class="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-[--color-border]">
            <img ngSrc="assets/img/Tobi.jpeg" fill priority alt="Tobias Moreno"
                 class="object-cover object-top" />
          </div>
        </div>

      </div>
    </section>
  `,
})
export class HeroSectionComponent {
  protected readonly locale = inject(LocaleService);
}
