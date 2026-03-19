import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '@shared/services/product.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-related',
  imports: [ProductComponent],
  templateUrl: './related.component.html',
})
export class RelatedComponent {
  private productService = inject(ProductService);
  slug = input.required<string>();

  productRelatedResourse = rxResource({
    request: () => this.slug(),
    loader: ({ request }) => this.productService.getRelatedProduct(request),
  });
}
