import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocaleService } from '../../../core/locale/locale.service';

const CERTIFICATIONS = [
  {
    code: 'C101',
    titleKey: 'certifications.card_claude_101_title',
    descKey: 'certifications.card_claude_101_desc',
    url: 'https://drive.google.com/file/d/193f_F7HbDAaYTGuVwQKsZ74l3CDNQav4/view?usp=sharing',
  },
  {
    code: 'AIF',
    titleKey: 'certifications.card_claude_fluency_title',
    descKey: 'certifications.card_claude_fluency_desc',
    url: 'https://drive.google.com/file/d/1pMdAuf0VG1UkNeKfiiJ3_mVwch4EXm7x/view?usp=sharing',
  },
  {
    code: 'AGT',
    titleKey: 'certifications.card_coding_agents_title',
    descKey: 'certifications.card_coding_agents_desc',
    url: 'https://drive.google.com/file/d/1UV4XRkVGsqDtYqtEpmQf9FeX8U0oOgLt/view?usp=sharing',
  },
  {
    code: 'PRO',
    titleKey: 'certifications.card_soft_skills_title',
    descKey: 'certifications.card_soft_skills_desc',
    url: 'https://drive.google.com/file/d/1c3sHZMD6cbSxxfMsJmrGexkzh8ZxdiVB/view?usp=sharing',
  },
  {
    code: 'UTN',
    titleKey: 'certifications.card_degree_title',
    descKey: 'certifications.card_degree_desc',
    url: 'https://drive.google.com/file/d/1fgBLJsvAkHfcyZpreRD7tZRRYFmt0dQa/view?usp=sharing',
  },
] as const;

const FOCUS_KEYS = [
  'certifications.focus_ai_development',
  'certifications.focus_agents',
  'certifications.focus_spec_driven',
  'certifications.focus_product',
  'certifications.focus_communication',
] as const;

@Component({
  selector: 'app-certifications-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="certifications" class="section-container animate-fade-in-up">
      <div class="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-end">
        <div>
          <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-[--color-accent]">
            {{ locale.t('certifications.eyebrow') }}
          </p>
          <h2 class="text-3xl font-bold tracking-tight text-[--color-fg] mb-4">
            {{ locale.t('certifications.title') }}
          </h2>
          <p class="max-w-3xl text-sm leading-7 text-[--color-muted] md:text-base">
            {{ locale.t('certifications.subtitle') }}
          </p>
        </div>

        <div class="flex flex-wrap gap-2 lg:justify-end" aria-label="Certification focus areas">
          @for (focusKey of focusKeys; track focusKey) {
            <span class="rounded-full border border-[--color-border] px-3 py-1 text-xs font-medium text-[--color-muted]">
              {{ locale.t(focusKey) }}
            </span>
          }
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        @for (certification of certifications; track certification.titleKey) {
          <article class="group grid min-h-40 grid-cols-[3.25rem_1fr] gap-4 rounded-xl border border-[--color-border]
                         bg-[--color-border]/10 p-5 transition-all duration-200 hover:-translate-y-0.5
                         hover:border-[--color-accent] hover:bg-[--color-border]/20">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg border border-[--color-border]
                        bg-[--color-bg] text-xs font-bold text-[--color-accent]">
              {{ certification.code }}
            </div>

            <div>
              <h3 class="text-sm font-semibold text-[--color-fg]">
                <a [href]="certification.url" target="_blank" rel="noopener"
                   class="inline-flex items-center gap-1.5 transition-colors hover:text-[--color-accent]">
                  {{ locale.t(certification.titleKey) }}
                  <span aria-hidden="true">-></span>
                </a>
              </h3>
              <p class="mt-2 text-sm leading-6 text-[--color-muted]">
                {{ locale.t(certification.descKey) }}
              </p>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class CertificationsSectionComponent {
  protected readonly locale = inject(LocaleService);
  protected readonly certifications = CERTIFICATIONS;
  protected readonly focusKeys = FOCUS_KEYS;
}
