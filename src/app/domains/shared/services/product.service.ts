import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/api/v1`;

  getProducts(categoryId?: string, categorySlug?: string) {
    let params = new HttpParams();

    if (categoryId) {
      params = params.set('categoryId', categoryId);
    }

    if (categorySlug) {
      params = params.set('categorySlug', categorySlug);
    }

    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params });
  }

  getOne(params: { id?: string; slug?: string }) {
    const route = params.id ?? `slug/${params.slug}`;
    return this.http.get<Product>(
      `${environment.apiUrl}/api/v1/products/${route}`
    );
  }

  getRelatedProduct(slug: string) {
    return this.http.get<Product[]>(
      `${environment.apiUrl}/api/v1/products/slug/${slug}/related`
    );
  }
}
