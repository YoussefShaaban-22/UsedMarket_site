import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inquiry } from '../models/inquiry';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  constructor(private http: HttpClient) { }

  addinquiry(inquiry: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/Inquiry", inquiry);
  }
  getinquiry() {
    return this.http.get<inquiry[]>("http://127.0.0.1:8000/api/Inquiry");
  }
}
