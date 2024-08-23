import { Component } from '@angular/core';
import { brand } from '../../../models/brand';
import { BrandService } from '../../../apiservices/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-updatebrand',
  templateUrl: './updatebrand.component.html',
  styleUrl: './updatebrand.component.css'
})
export class UpdatebrandComponent {
  id: any;
  selectedFile!: File;
  brand: brand = {
    id: 0, name: '', logo: '', slug: ''
  };
  formErrors: any = {};

  constructor(private serv: BrandService, private router: Router,
    private activeRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.serv.getbrandById(this.id).subscribe((data: brand) => {
      this.brand = data;
    }, error => {
      console.error('Error fetching blog', error);
    });

  }

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
    this.serv.updatebrand(this.brand.id, this.brand).subscribe(() => {
      this.router.navigate(['/admin/brand/show']);
    }, error => {
      this.formErrors = error.error.errors;
      console.error(error);
      console.error('Error updating brand', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
