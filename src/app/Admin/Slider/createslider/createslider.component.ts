import { Component } from '@angular/core';
import { SliderService } from '../../../apiservices/slider.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { slider } from '../../../models/slider';
import { catchError, map, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-createslider',
  templateUrl: './createslider.component.html',
  styleUrl: './createslider.component.css'
})
export class CreatesliderComponent {
  selectedFile!: File;
  slider: slider = { id: 0, image: '' };
  formErrors: any = {};
  constructor(private serv: SliderService, private router: Router, private http: HttpClient) { }

  onFileChangeLogo(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const fileName = this.selectedFile.name;
      const fileUrl = URL.createObjectURL(this.selectedFile);


      this.upload(this.selectedFile).subscribe(url => {
        console.log('logo:', url);
        this.slider.image = url;
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
    if (this.slider.image) {
      formData.append('image', this.slider.image);
    }

    this.serv.addslider(formData).subscribe(() => {
      this.router.navigate(['/admin/slider/show']);
    }, error => {
      this.formErrors = error.error.errors;
      console.error(error);
      console.error('Error adding slider', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
