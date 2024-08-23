import { Component } from '@angular/core';
import { BrandService } from '../../../apiservices/brand.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { brand } from '../../../models/brand';

@Component({
  selector: 'app-createbrand',
  templateUrl: './createbrand.component.html',
  styleUrl: './createbrand.component.css'
})
export class CreatebrandComponent {
  selectedFile!: File;
  brand: brand = {
    id: 0, name: '', logo: '', slug: ''
  };
  formErrors: any = {};
  constructor(private serv: BrandService, private router: Router, private http: HttpClient) { }

  onFileChangeLogo(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const fileName = this.selectedFile.name;
      const fileUrl = URL.createObjectURL(this.selectedFile);


      this.upload(this.selectedFile).subscribe(url => {
        console.log('logo:', url);
        this.brand.logo = url;
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
    formData.append('name', this.brand.name);
    formData.append('slug', this.brand.slug);
    if (this.brand.logo) {
      formData.append('logo', this.brand.logo);
    }

    this.serv.addbrand(formData).subscribe(() => {
      this.router.navigate(['/admin/brand/show']);
    }, error => {

      this.formErrors = error.error.errors;
      console.error(error);
      console.error('Error adding brand', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
