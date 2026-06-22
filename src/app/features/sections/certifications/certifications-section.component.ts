import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LocaleService } from '../../../core/locale/locale.service';
import { ContentService } from '../../../data/content.service';
import type { Certification, CertificationType } from '../../../shared/models';

const FILTER_TYPES = [
  { value: 'ai-dev', labelKey: 'certifications.type_ai_dev' },
  { value: 'agents', labelKey: 'certifications.type_agents' },
  { value: 'professional', labelKey: 'certifications.type_professional' },
  { value: 'academic', labelKey: 'certifications.type_academic' },
] as const satisfies readonly { value: CertificationType; labelKey: string }[];

@Component({
  selector: 'app-certifications-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="certifications" class="section-container animate-fade-in-up">
      <div class="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-end">
        <div>
          <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-(--color-accent)">
            {{ locale.t('certifications.eyebrow') }}
          </p>
          <h2 class="text-3xl font-bold tracking-tight text-(--color-fg) mb-4">
            {{ locale.t('certifications.title') }}
          </h2>
          <p class="max-w-3xl text-sm leading-7 text-(--color-muted) md:text-base">
            {{ locale.t('certifications.subtitle') }}
          </p>
        </div>

        <div class="flex flex-wrap gap-2 lg:justify-end" role="group"
             [attr.aria-label]="locale.t('certifications.filter_label')">
          <button type="button" (click)="selectedType.set(null)"
                  [attr.aria-pressed]="selectedType() === null"
                  [class]="chipClass(selectedType() === null)">
            {{ locale.t('certifications.filter_all') }}
          </button>
          @for (filter of filterTypes; track filter.value) {
            <button type="button" (click)="selectedType.set(filter.value)"
                    [attr.aria-pressed]="selectedType() === filter.value"
                    [class]="chipClass(selectedType() === filter.value)">
              {{ locale.t(filter.labelKey) }}
            </button>
          }
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        @for (certification of filteredCertifications(); track certification.id) {
          <article class="group grid min-h-40 grid-cols-[3.25rem_1fr] gap-4 rounded-xl border border-(--color-border)
                         bg-(--color-border)/10 p-5 transition-all duration-200 hover:-translate-y-0.5
                         hover:border-(--color-accent) hover:bg-(--color-border)/20">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg border border-(--color-border)
                        bg-(--color-bg) text-xs font-bold text-(--color-accent)">
              {{ certification.code }}
            </div>

            <div>
              <h3 class="text-sm font-semibold text-(--color-fg)">
                <a [href]="certification.url" target="_blank" rel="noopener"
                   class="inline-flex items-center gap-1.5 transition-colors hover:text-(--color-accent)">
                  {{ certificationTitle(certification) }}
                  <span aria-hidden="true">-></span>
                </a>
              </h3>
              <p class="mt-2 text-sm leading-6 text-(--color-muted)">
                {{ certificationDescription(certification) }}
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
  private readonly content = inject(ContentService);
  protected readonly certifications = toSignal(this.content.getCertifications(), {
    initialValue: [] as Certification[],
  });
  protected readonly filterTypes = FILTER_TYPES;
  protected readonly selectedType = signal<CertificationType | null>(null);
  protected readonly filteredCertifications = computed(() => {
    const type = this.selectedType();
    const all = this.certifications();
    return type ? all.filter((certification) => certification.type === type) : all;
  });

  protected chipClass(active: boolean): string {
    const base = 'rounded-full border px-3 py-1 text-xs font-medium transition-colors';
    return active
      ? `${base} border-(--color-accent) bg-(--color-accent)/10 text-(--color-fg)`
      : `${base} border-(--color-border) text-(--color-muted) hover:border-(--color-accent) hover:text-(--color-fg)`;
  }

  protected certificationTitle(certification: Certification): string {
    return this.locale.locale() === 'es'
      ? (certification.titleEs ?? certification.title)
      : certification.title;
  }

  protected certificationDescription(certification: Certification): string {
    return this.locale.locale() === 'es'
      ? (certification.descriptionEs ?? certification.description)
      : certification.description;
  }
}
