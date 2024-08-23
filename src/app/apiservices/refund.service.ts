import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { refund } from '../models/refund';

@Injectable({
  providedIn: 'root'
})
export class RefundService {
  constructor(private http: HttpClient) { }

  addrefund(refund: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/Refund", refund);
  }
  getrefund() {
    return this.http.get<refund[]>("http://127.0.0.1:8000/api/Refund");
  }

  getrefundByorderId(id: number) {
    return this.http.get<refund>(`http://127.0.0.1:8000/api/RefundByorderId/${id}`);
  }

  updaterefund(id: number, refund: refund) {
    return this.http.put(`http://127.0.0.1:8000/api/Refund/${id}`, refund);
  }
  updatecancel(id: number, refund: refund) {
    return this.http.put(`http://127.0.0.1:8000/api/Refund/cancel/${id}`, refund);
  }
  updateaccept(id: number, refund: refund) {
    return this.http.put(`http://127.0.0.1:8000/api/Refund/accept/${id}`, refund);
  }

  getrefundById(id: any) {
    return this.http.get<refund>(`http://127.0.0.1:8000/api/Refund/${id}`);
  }

  getrefundByuserId(id: any) {
    return this.http.get<refund[]>(`http://127.0.0.1:8000/api/RefundByUserId/${id}`);
  }

  deleterefund(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/Refund/${id}`);
  }
}
