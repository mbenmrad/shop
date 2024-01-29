import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl+"/products").pipe(map(response => response));
  }

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl+"/products", product);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl+"/products/"+product.id, product);
  }

  delete(product: Product): Observable<void> {
    return this.http.delete<void>(this.apiUrl+"/products/"+product.id);
  }
}
