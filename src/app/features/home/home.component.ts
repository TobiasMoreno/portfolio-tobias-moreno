import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/seo/seo.service';
import { HeroSectionComponent } from '../sections/hero/hero-section.component';
import { AboutSectionComponent } from '../sections/about/about-section.component';
import { MindsetSectionComponent } from '../sections/mindset/mindset-section.component';
import { ExperienceSectionComponent } from '../sections/experience/experience-section.component';
import { ProjectsSectionComponent } from '../sections/projects/projects-section.component';
import { StackSectionComponent } from '../sections/stack/stack-section.component';
import { WritingSectionComponent } from '../sections/writing/writing-section.component';
import { ContactSectionComponent } from '../sections/contact/contact-section.component';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroSectionComponent,
    AboutSectionComponent,
    MindsetSectionComponent,
    ExperienceSectionComponent,
    ProjectsSectionComponent,
    StackSectionComponent,
    WritingSectionComponent,
    ContactSectionComponent,
  ],
  template: `
    <app-hero-section />

    @defer (on viewport) {
      <app-about-section />
    } @placeholder {
      <div class="min-h-[400px]"></div>
    }

    @defer (on viewport) {
      <app-experience-section />
    } @placeholder {
      <div class="min-h-[400px]"></div>
    }

    @defer (on viewport) {
      <app-projects-section />
    } @placeholder {
      <div class="min-h-[400px]"></div>
    }

    @defer (on viewport) {
      <app-stack-section />
    } @placeholder {
      <div class="min-h-[400px]"></div>
    }

    @defer (on viewport) {
      <app-writing-section />
    } @placeholder {
      <div class="min-h-[400px]"></div>
    }

    @defer (on viewport) {
      <app-mindset-section />
    } @placeholder {
      <div class="min-h-[400px]"></div>
    }

    @defer (on viewport) {
      <app-contact-section />
    } @placeholder {
      <div class="min-h-[400px]"></div>
    }
  `,
})
export class HomeComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setHomeMetadata();
  }
}
