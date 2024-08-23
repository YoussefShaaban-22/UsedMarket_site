import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  addfeedback(feedback: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/Feedback", feedback);
  }
  getfeedback() {
    return this.http.get<feedback[]>("http://127.0.0.1:8000/api/Feedback");
  }

  getFeedbackById(id: any) {
    return this.http.get<feedback>(`http://127.0.0.1:8000/api/Feedback/${id}`);
  }
  getFeedbackByProduct(id: number) {
    return this.http.get<feedback[]>(`http://127.0.0.1:8000/api/FeedbackByProduct/${id}`);
  }
  deleteFeedback(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/Feedback/${id}`);
  }
}
