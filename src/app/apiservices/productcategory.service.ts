import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productcategory } from '../models/productcategory';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {

  constructor(private http: HttpClient) { }

  addproductcategory(productcategory: FormData): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/ProductCategory", productcategory);
  }
  getproductcategory() {
    return this.http.get<productcategory[]>("http://127.0.0.1:8000/api/ProductCategory");
  }
  getproductcategoryTree() {
    return this.http.get<productcategory[]>("http://127.0.0.1:8000/api/ProductCategoryTree");
  }
  updateproductcategory(id: number, productcategory: productcategory) {
    return this.http.put(`http://127.0.0.1:8000/api/ProductCategory/${id}`, productcategory);
  }
  getproductcategoryById(id: any) {
    return this.http.get<productcategory>(`http://127.0.0.1:8000/api/ProductCategoryID/${id}`);
  }
  getproductcategoryByslug(slug: any) {
    return this.http.get<productcategory>(`http://127.0.0.1:8000/api/ProductCategorySlug/${slug}`);
  }
  deleteproductcategory(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/ProductCategory/${id}`);
  }
}
