import { Component, effect, inject, input, linkedSignal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';
import { MetaTagsService } from '@shared/services/meta-tags.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-detail.component.html',
})
export default class ProductDetailComponent {
  metaService = inject(MetaTagsService);
  readonly slug = input.required<string>();
  productResourse = rxResource({
    request: () => this.slug(),
    loader: ({ request }) => this.productService.getOne({ slug: request }),
  });
  cover = linkedSignal(() => {
    return this.productResourse.value()?.images[0] ?? '';
  });
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  constructor() {
    effect(() => {
      const data = this.productResourse.value();
      if (data) {
        this.metaService.updateMetaTags({
          description: data.description,
          title: data.title,
          image: this.cover(),
          url: `${environment.domain}/product/${data.slug}`,
        });
      }
    });
  }

  changeCover(newImg: string) {
    this.cover.set(newImg);
  }

  addToCart() {
    const product = this.productResourse.value();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
