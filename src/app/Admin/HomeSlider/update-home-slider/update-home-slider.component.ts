import { Component } from '@angular/core';
import { homeslider } from '../../../models/homeslider';
import { SliderService } from '../../../apiservices/slider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-update-home-slider',
  templateUrl: './update-home-slider.component.html',
  styleUrl: './update-home-slider.component.css'
})
export class UpdateHomeSliderComponent {
  id: any;
  selectedFile!: File;
  // homeslider: any = new homeslider();
  homeslider: homeslider = {
    id: 0, slider_image: '', order: ''
  };
  formErrors: any = {};

  constructor(private serv: SliderService, private router: Router,
    private activeRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.serv.gethomesliderById(this.id).subscribe((data: homeslider) => {
      this.homeslider = data;
    }, error => {
      console.error('Error fetching blog', error);
    });

  }

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
    this.serv.updatehomeslider(this.homeslider.id, this.homeslider).subscribe(() => {
      this.router.navigate(['/admin/homeslider/show']);
    }, error => {
      this.formErrors = error.error.errors;
      console.error(error);
      console.error('Error updating homeslider', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
