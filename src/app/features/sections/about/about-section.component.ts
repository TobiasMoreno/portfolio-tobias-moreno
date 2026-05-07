import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocaleService } from '../../../core/locale/locale.service';

const CHIPS = [
  'about.chip_product',
  'about.chip_observability',
  'about.chip_impact',
  'about.chip_resilience',
  'about.chip_async',
  'about.chip_iterate',
] as const;

@Component({
  selector: 'app-about-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="section-container animate-fade-in-up">
      <div class="max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-[--color-fg] mb-8">
          {{ locale.t('about.title') }}
        </h2>
        <div class="flex flex-col gap-5 text-[--color-muted] leading-relaxed">
          <p>{{ locale.t('about.paragraph_1') }}</p>
          <p>{{ locale.t('about.paragraph_2') }}</p>
        </div>
        <div class="flex flex-wrap gap-2 mt-8">
          @for (key of chips; track key) {
            <span class="px-3 py-1 rounded-full text-xs font-medium border border-[--color-border] text-[--color-muted]">
              {{ locale.t(key) }}
            </span>
          }
        </div>
      </div>
    </section>
  `,
})
export class AboutSectionComponent {
  protected readonly locale = inject(LocaleService);
  protected readonly chips = CHIPS;
}
