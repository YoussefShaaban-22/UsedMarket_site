import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  addorder(order: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/Order", order);
  }
  getorder() {
    return this.http.get<order[]>("http://127.0.0.1:8000/api/Order");
  }

  getorderId(id: number) {
    return this.http.get<order[]>(`http://127.0.0.1:8000/api/OrderById/${id}`);
  }

  updateorder(id: number, order: order) {
    return this.http.put(`http://127.0.0.1:8000/api/Order/${id}`, order);
  }
  updatecancel(id: number, order: any) {
    return this.http.put(`http://127.0.0.1:8000/api/Order/cancel/${id}`, order);
  }
  updateaccept(id: number, order: any) {
    return this.http.put(`http://127.0.0.1:8000/api/Order/accept/${id}`, order);
  }
  updatepaid(id: number, order: any) {
    return this.http.put(`http://127.0.0.1:8000/api/Order/paid/${id}`, order);
  }
  updatecomment(id: number, order: any) {
    return this.http.put(`http://127.0.0.1:8000/api/Order/comment/${id}`, order);
  }
  
  updateuser_required(id: number, order: any) {
    return this.http.put(`http://127.0.0.1:8000/api/Order/user_required/${id}`, order);
  }
  updateOrderTotalPrice(orderId: number, totalPrice: any, totalQuantity: any): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/Order/update-total-price/${orderId}`, {
      total_price: totalPrice,
      quantity: totalQuantity
    });
  }

  getorderById(id: any) {
    return this.http.get<order>(`http://127.0.0.1:8000/api/Order/${id}`);
  }
  getorderByuserId(id: any) {
    return this.http.get<order[]>(`http://127.0.0.1:8000/api/OrderByUserId/${id}`);
  }

  deleteorder(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/order/${id}`);
  }
}
