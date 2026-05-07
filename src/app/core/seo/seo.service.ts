import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  setHomeMetadata(): void {
    this.title.setTitle('Tobias Moreno — Backend Engineer');
    this.meta.updateTag({
      name: 'description',
      content:
        'Backend Software Engineer based in Córdoba, Argentina. I build REST APIs, microservices, and integrations in fintech environments — focused on performance, scalability, and real user impact.',
    });
  }
}
