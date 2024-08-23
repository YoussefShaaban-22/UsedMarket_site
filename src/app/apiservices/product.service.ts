import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../models/product';
import { productattribute } from '../models/productattribute';
import { productcolor } from '../models/productcolor';
import { productdiscount } from '../models/productdiscount';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  addproduct(product: FormData): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/Product", product);
  }

  getproduct() {
    return this.http.get<product[]>("http://127.0.0.1:8000/api/Product");
  }
  getproductcolor() {
    return this.http.get<productcolor[]>("http://127.0.0.1:8000/api/ProductColor");
  }

  getNewproduct() {
    return this.http.get<product[]>("http://127.0.0.1:8000/api/NewProduct");
  }

  getProductsByCategory(categoryId: number): Observable<product[]> {
    return this.http.get<product[]>(`http://127.0.0.1:8000/api/Product/category/${categoryId}`);
  }

  getProductsBybrand(brandId: number): Observable<product[]> {
    return this.http.get<product[]>(`http://127.0.0.1:8000/api/Product/brand/${brandId}`);
  }

  getFilteredProducts(selectedBrands: string[], selectedColors: string[], categoryId: number, startValue: number, endValue: number): Observable<product[]> {
    return this.http.post<product[]>(`http://127.0.0.1:8000/api/products/filter/${categoryId}`, {
      brands: selectedBrands,
      colors: selectedColors,
      start_price: startValue,
      end_price: endValue
    });
  }
  getFilteredSearchProducts(selectedBrands: string[], selectedColors: string[],searchTerm: string,startValue: number, endValue: number): Observable<product[]> {
    return this.http.post<product[]>(`http://127.0.0.1:8000/api/searchproducts/filter`, {
      brands: selectedBrands,
      colors: selectedColors,
      start_price: startValue,
      end_price: endValue,
      search: searchTerm,
    });
  }
  getFilteredProductsBrand(brandId: number, selectedColors: string[], startValue: number, endValue: number): Observable<product[]> {
    return this.http.post<product[]>(`http://127.0.0.1:8000/api/products/filterbrand/${brandId}`, {
      colors: selectedColors,
      start_price: startValue,
      end_price: endValue
    });
  }
  updateproduct(id: number, product: any) {
    return this.http.put(`http://127.0.0.1:8000/api/Product/${id}`, product);
  }

  updateproductcolor(id: number, product: FormData) {
    return this.http.put(`http://127.0.0.1:8000/api/Productcolor/${id}`, product);
  }

  updateproductattribute(id: number, product: FormData) {
    return this.http.put(`http://127.0.0.1:8000/api/Productattribute/${id}`, product);
  }

  getProductattribute(id: any) {
    return this.http.get<productattribute[]>(`http://127.0.0.1:8000/api/Productattribute/${id}`);
  }
  
  getProductdiscount(id: any) {
    return this.http.get<productdiscount[]>(`http://127.0.0.1:8000/api/Productdiscount/${id}`);
  }

  getproductById(id: any) {
    return this.http.get<product>(`http://127.0.0.1:8000/api/ProductID/${id}`);
  }

  getProductcolor(id: any) {
    return this.http.get<productcolor[]>(`http://127.0.0.1:8000/api/Productcolor/${id}`);
  }

  getproductByslug(slug: any) {
    return this.http.get<product>(`http://127.0.0.1:8000/api/ProductSlug/${slug}`);
  }

  deleteproduct(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/Product/${id}`);
  }

  getSearchProduct(searchTerm: string): Observable<product[]> {
    return this.http.get<product[]>(`http://127.0.0.1:8000/api/searchProduct?search=${searchTerm}`);
  }

  decreaseProductQuantity(productId: number, quantity: number): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/products/decrease-quantity`, { productId, quantity });
  }
}
