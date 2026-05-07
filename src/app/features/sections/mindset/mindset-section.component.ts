import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocaleService } from '../../../core/locale/locale.service';

const PRINCIPLES = [
  { icon: '🎯', titleKey: 'mindset.card1_title', descKey: 'mindset.card1_desc' },
  { icon: '⚖️', titleKey: 'mindset.card2_title', descKey: 'mindset.card2_desc' },
  { icon: '📊', titleKey: 'mindset.card3_title', descKey: 'mindset.card3_desc' },
  { icon: '🔄', titleKey: 'mindset.card4_title', descKey: 'mindset.card4_desc' },
  { icon: '✂️', titleKey: 'mindset.card5_title', descKey: 'mindset.card5_desc' },
] as const;

@Component({
  selector: 'app-mindset-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="mindset" class="section-container animate-fade-in-up">
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-[--color-fg] mb-3">
          {{ locale.t('mindset.title') }}
        </h2>
        <p class="text-[--color-muted]">{{ locale.t('mindset.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (p of principles; track p.titleKey) {
          <div class="flex flex-col gap-3 p-6 rounded-xl border border-[--color-border]
                      hover:border-[--color-accent] transition-all duration-200 cursor-default">
            <span class="text-2xl" aria-hidden="true">{{ p.icon }}</span>
            <h3 class="text-sm font-semibold text-[--color-fg]">{{ locale.t(p.titleKey) }}</h3>
            <p class="text-sm text-[--color-muted] leading-relaxed">{{ locale.t(p.descKey) }}</p>
          </div>
        }
      </div>
    </section>
  `,
})
export class MindsetSectionComponent {
  protected readonly locale = inject(LocaleService);
  protected readonly principles = PRINCIPLES;
}
