import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { slider } from '../models/slider';
import { homeslider } from '../models/homeslider';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http: HttpClient) { }

  addslider(slider: FormData): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/Slider", slider);
  }
  getslider() {
    return this.http.get<slider[]>("http://127.0.0.1:8000/api/Slider");
  }
  updateslider(id: number, slider: slider) {
    return this.http.put(`http://127.0.0.1:8000/api/Slider/${id}`, slider);
  }
  getsliderById(id: any) {
    return this.http.get<slider>(`http://127.0.0.1:8000/api/SliderID/${id}`);
  }
  deleteslider(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/Slider/${id}`);
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

addhomeslider(homeslider: FormData): Observable<any> {
  return this.http.post("http://127.0.0.1:8000/api/HomeSlider", homeslider);
}
gethomeslider() {
  return this.http.get<homeslider[]>("http://127.0.0.1:8000/api/HomeSlider");
}
updatehomeslider(id: number, homeslider: homeslider) {
  return this.http.put(`http://127.0.0.1:8000/api/HomeSlider/${id}`, homeslider);
}
gethomesliderById(id: any) {
  return this.http.get<homeslider>(`http://127.0.0.1:8000/api/HomeSliderID/${id}`);
}
deletehomeslider(id: number) {
  return this.http.delete(`http://127.0.0.1:8000/api/HomeSlider/${id}`);
}

}
