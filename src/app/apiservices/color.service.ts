import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) { }

  addcolor(color: FormData): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/Color", color);
  }
  getcolor() {
    return this.http.get<color[]>("http://127.0.0.1:8000/api/Color");
  }
  updatecolor(id: number, color: color) {
    return this.http.put(`http://127.0.0.1:8000/api/Color/${id}`, color);
  }
  getcolorById(id: any) {
    return this.http.get<color>(`http://127.0.0.1:8000/api/Color/${id}`);
  }

  deletecolor(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/Color/${id}`);
  }
}
