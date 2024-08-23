import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { seller } from '../models/seller';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) { }

  addseller(seller: FormData): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/Seller", seller);
  }
  getseller() {
    return this.http.get<seller[]>("http://127.0.0.1:8000/api/Seller");
  }
  updateseller(id: number, seller: seller) {
    return this.http.put(`http://127.0.0.1:8000/api/Seller/${id}`, seller);
  }
  getsellerById(id: any) {
    return this.http.get<seller>(`http://127.0.0.1:8000/api/SellerID/${id}`);
  }
  getsellerByslug(slug: any) {
    return this.http.get<seller>(`http://127.0.0.1:8000/api/SellerSlug/${slug}`);
  }
  deleteseller(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/Seller/${id}`);
  }
}
