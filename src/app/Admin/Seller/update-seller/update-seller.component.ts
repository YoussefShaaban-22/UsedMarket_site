import { Component, ElementRef, ViewChild } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { seller } from '../../../models/seller';
import { SellerService } from '../../../apiservices/seller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare const $: any; // Declare jQuery globally

@Component({
  selector: 'app-update-seller',
  templateUrl: './update-seller.component.html',
  styleUrl: './update-seller.component.css'
})
export class UpdateSellerComponent {
  id: any;
  selectedFile!: File;
  formErrors: any = {};
  seller: seller = {
    id: 0, name: '', logo: '',
    description: '',phone: '', whatsappLink: '',map: '',showData: '',slug: '', slide_image: ''};
  @ViewChild('descriptionEditor') descriptionEditor!: ElementRef;

  constructor(private serv: SellerService, private router: Router,
    private activeRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.serv.getsellerById(this.id).subscribe((data: seller) => {
      this.seller = data;
      this.initializeSummernote();
    }, error => {
      console.error('Error fetching blog', error);
    });

  }

  ngAfterViewInit(): void {
    this.initializeSummernote();
  }

  initializeSummernote(): void {
    if (this.descriptionEditor) {
      ($(this.descriptionEditor.nativeElement) as any).summernote({
        height: 300,
        callbacks: {
          onChange: (contents: string) => {
            this.seller.description = contents;
          }
        }
      }).summernote('code', this.seller.description);
    }
  }

  onFileChangeLogo(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const fileName = this.selectedFile.name;
      const fileUrl = URL.createObjectURL(this.selectedFile);
      this.upload(this.selectedFile).subscribe(url => {
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
    this.serv.updateseller(this.seller.id, this.seller).subscribe(() => {
      this.router.navigate(['/admin/seller/show']);
    }, error => {
      this.formErrors = error.error.errors;
        console.error(error);
      console.error('Error updating seller', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
