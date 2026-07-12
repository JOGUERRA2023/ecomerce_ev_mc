import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoTags {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'product';
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  updateTags({ title, description, image, type = 'website' }: SeoTags): void {
    this.titleService.setTitle(title);

    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: type });
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });

    if (image) {
      this.metaService.updateTag({ property: 'og:image', content: image });
      this.metaService.updateTag({ name: 'twitter:image', content: image });
    }
  }
}
