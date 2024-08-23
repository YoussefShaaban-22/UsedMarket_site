import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductcategoryService } from '../../../apiservices/productcategory.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { productcategory } from '../../../models/productcategory';
import { catchError, map, Observable, throwError } from 'rxjs';
declare const $: any; // Declare jQuery globally

@Component({
  selector: 'app-create-product-category',
  templateUrl: './create-product-category.component.html',
  styleUrl: './create-product-category.component.css'
})
export class CreateProductCategoryComponent {
  productCategories: productcategory[] = [];
  selectedFile!: File;
  productcategory: productcategory = {
    id: 0, name: '', image: '', description: '', slug: '', parent_id: ''
  };
  formErrors: any = {};
  @ViewChild('descriptionEditor') descriptionEditor!: ElementRef;

  constructor(private serv: ProductcategoryService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.serv.getproductcategory().subscribe((data: productcategory[]) => {
      this.productCategories = data;
    }, error => {
      console.error('Error fetching blog categories', error);
    });
  }

  ngAfterViewInit(): void {
    ($(this.descriptionEditor.nativeElement) as any).summernote({
      height: 300,
      callbacks: {
        onChange: (contents: string) => {
          this.productcategory.description = contents;
        }
      }
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const fileName = this.selectedFile.name;
      console.log('File Name:', fileName);
      const fileUrl = URL.createObjectURL(this.selectedFile);
      console.log('File URL:', fileUrl);

      this.upload(this.selectedFile).subscribe(url => {
        console.log(url);
        this.productcategory.image = url;
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
    formData.append('name', this.productcategory.name);
    formData.append('parent_id', this.productcategory.parent_id);
    formData.append('description', this.productcategory.description);
    formData.append('slug', this.productcategory.slug);
    if (this.productcategory.image) {
      formData.append('image', this.productcategory.image);
    }

    this.serv.addproductcategory(formData).subscribe(() => {
      this.router.navigate(['/admin/productcategory/show']);
    }, error => {
      this.formErrors = error.error.errors;
      console.error(error);
      console.error('Error adding product category', error);
    });
  }

  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
