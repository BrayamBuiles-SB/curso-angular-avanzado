import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { environment } from '@env/environment';
interface PageMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
}

const defaultMetadata: PageMetadata = {
  title: 'ng store',
  description: 'Angular store application',
  image: '',
  url: environment.domain,
};

@Injectable({
  providedIn: 'root',
})
export class MetaTagsService {
  private metaTag = inject(Meta);
  private titleService = inject(Title);

  updateMetaTags(metadata: Partial<PageMetadata>): void {
    // Combinar metadatos proporcionados con valores predeterminados
    const metaInfo = { ...defaultMetadata, ...metadata };

    // Generar definiciones de metadatos
    const tags = this.generateMetaDefinitions(metaInfo);

    // Actualizar etiquetas meta
    tags.forEach(tag => this.metaTag.updateTag(tag));

    // Actualizar el título del documento
    this.titleService.setTitle(metaInfo.title);
  }

  private generateMetaDefinitions(metadata: PageMetadata): MetaDefinition[] {
    return [
      { name: 'title', content: metadata.title },
      { name: 'description', content: metadata.description },
      { property: 'og:title', content: metadata.title },
      { property: 'og:description', content: metadata.description },
      { property: 'og:image', content: metadata.image },
      { property: 'og:url', content: metadata.url },
    ];
  }
}
