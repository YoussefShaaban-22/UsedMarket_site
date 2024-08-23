import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  addcart(cart: FormData): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/Cart", cart);
  }
  getcart() {
    return this.http.get<cart[]>("http://127.0.0.1:8000/api/Cart");
  }
  updatecart(id: number, cart: cart) {
    return this.http.put(`http://127.0.0.1:8000/api/Cart/${id}`, cart);
  }
  getcartById(id: any) {
    return this.http.get<cart>(`http://127.0.0.1:8000/api/Cart/${id}`);
  }
  getcartByuserId(id: any) {
    return this.http.get<cart[]>(`http://127.0.0.1:8000/api/CartByUserId/${id}`);
  }
  deletecart(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/Cart/${id}`);
  }
}
