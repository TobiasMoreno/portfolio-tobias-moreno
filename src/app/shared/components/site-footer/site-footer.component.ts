import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocaleService } from '../../../core/locale/locale.service';

@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-[--color-border] py-10">
      <div class="mx-auto max-w-5xl px-6 flex flex-col items-center gap-4 text-sm text-[--color-muted] sm:flex-row sm:justify-between">
        <p>{{ locale.t('footer.copyright') }} · {{ locale.t('footer.location') }}</p>
        <div class="flex items-center gap-5">
          <a href="https://github.com/TobiasMoreno" target="_blank" rel="noopener"
             class="hover:text-[--color-fg] transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/tobiasmoreno/" target="_blank" rel="noopener"
             class="hover:text-[--color-fg] transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  `,
})
export class SiteFooterComponent {
  protected readonly locale = inject(LocaleService);
}
