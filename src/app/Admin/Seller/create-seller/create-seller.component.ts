import { Component, ElementRef, ViewChild } from '@angular/core';
import { seller } from '../../../models/seller';
import { SellerService } from '../../../apiservices/seller.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
declare const $: any; // Declare jQuery globally

@Component({
  selector: 'app-create-seller',
  templateUrl: './create-seller.component.html',
  styleUrl: './create-seller.component.css'
})
export class CreateSellerComponent {
  selectedFile!: File;
  // seller:any =new seller();
  seller: seller = {
    id: 0, name: '', logo: '',
    description: '', phone: '', whatsappLink: '', map: '', showData: '', slug: '', slide_image: ''
  };
  formErrors: any = {};
  @ViewChild('descriptionEditor') descriptionEditor!: ElementRef;
  constructor(private serv: SellerService, private router: Router, private http: HttpClient) { }
  ngAfterViewInit(): void {
    ($(this.descriptionEditor.nativeElement) as any).summernote({
      height: 300,
      callbacks: {
        onChange: (contents: string) => {
          this.seller.description = contents;
        }
      }
    });
  }

  onFileChangeLogo(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const fileName = this.selectedFile.name;
      const fileUrl = URL.createObjectURL(this.selectedFile);


      this.upload(this.selectedFile).subscribe(url => {
        console.log('logo:', url);
        this.seller.logo = url;
      });
    }
  }

  onFileChangeSlide(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const fileName = this.selectedFile.name;
      const fileUrl = URL.createObjectURL(this.selectedFile);
      this.upload(this.selectedFile).subscribe(url => {
        console.log('slide:', url);
        this.seller.slide_image = url;
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
    formData.append('name', this.seller.name);
    formData.append('description', this.seller.description);
    formData.append('phone', this.seller.phone);
    formData.append('whatsappLink', this.seller.whatsappLink);
    formData.append('map', this.seller.map);
    formData.append('showData', this.seller.showData);
    formData.append('slug', this.seller.slug);
    if (this.seller.logo) {
      formData.append('logo', this.seller.logo);
    }
    if (this.seller.slide_image) {
      formData.append('slide_image', this.seller.slide_image);
    }
    this.serv.addseller(formData).subscribe(() => {
      this.router.navigate(['/admin/seller/show']);
    }, error => {

      this.formErrors = error.error.errors;
      console.error(error);
      console.error('Error adding blog', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
