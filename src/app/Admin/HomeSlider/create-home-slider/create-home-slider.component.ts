import { Component } from '@angular/core';
import { homeslider } from '../../../models/homeslider';
import { SliderService } from '../../../apiservices/slider.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-create-home-slider',
  templateUrl: './create-home-slider.component.html',
  styleUrl: './create-home-slider.component.css'
})
export class CreateHomeSliderComponent {
  selectedFile!: File;
  // homeslider: any = new homeslider();
  homeslider: homeslider = {
    id: 0, slider_image: '', order: ''
  };
  formErrors: any = {};
  constructor(private serv: SliderService, private router: Router, private http: HttpClient) { }

  onFileChangeLogo(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.upload(this.selectedFile).subscribe(url => {
        this.homeslider.slider_image = url;
      });
    }
  }
  upload(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ path: string }>('http://localhost:8000/api/upload', formData).pipe(
      map(response => response.path),
      catchError(error => {
        console.error('Upload failed', error);
        return throwError(error);
      })
    );
  }

  save(): void {
    const formData = new FormData();

    if (this.homeslider.slider_image) {
      formData.append('slider_image', this.homeslider.slider_image);
    }
    formData.append('order', this.homeslider.order);
    this.serv.addhomeslider(formData).subscribe(() => {
      this.router.navigate(['/admin/homeslider/show']);
    }, error => {
      this.formErrors = error.error.errors;
      console.error(error);
      console.error('Error adding homeslider', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
