import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  addbrand(brand: FormData): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/Brand", brand);
  }
  getbrand() {
    return this.http.get<brand[]>("http://127.0.0.1:8000/api/Brand");
  }
  updatebrand(id: number, brand: brand) {
    return this.http.put(`http://127.0.0.1:8000/api/Brand/${id}`, brand);
  }
  getbrandById(id: any) {
    return this.http.get<brand>(`http://127.0.0.1:8000/api/BrandID/${id}`);
  }
  getbrandByslug(slug: any) {
    return this.http.get<brand>(`http://127.0.0.1:8000/api/BrandSlug/${slug}`);
  }
  deletebrand(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/Brand/${id}`);
  }
}
