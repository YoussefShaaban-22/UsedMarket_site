import { Component, ElementRef, ViewChild } from '@angular/core';
import { productcategory } from '../../../models/productcategory';
import { ProductcategoryService } from '../../../apiservices/productcategory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
declare const $: any; // Declare jQuery globally

@Component({
  selector: 'app-update-product-category',
  templateUrl: './update-product-category.component.html',
  styleUrl: './update-product-category.component.css'
})
export class UpdateProductCategoryComponent {
  id: any;
  productCategories: productcategory[] = [];
  selectedFile!: File;
  productcategory: productcategory = {
    id: 0, name: '', image: '', description: '', slug: '', parent_id: ''
  };
  formErrors: any = {};
  @ViewChild('descriptionEditor') descriptionEditor!: ElementRef;

  constructor(private serv: ProductcategoryService, private router: Router,
    private activeRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.serv.getproductcategoryById(this.id).subscribe((data: productcategory) => {
      this.productcategory = data;
      this.initializeSummernote();
    }, error => {
      console.error('Error fetching blog', error);
    });
    this.serv.getproductcategory().subscribe((data: productcategory[]) => {
      this.productCategories = data;
    }, error => {
      console.error('Error fetching blog categories', error);
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
            this.productcategory.description = contents;
          }
        }
      }).summernote('code', this.productcategory.description);
    }
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
    this.serv.updateproductcategory(this.productcategory.id, this.productcategory).subscribe(() => {
      this.router.navigate(['/admin/productcategory/show']);
    }, error => {
      this.formErrors = error.error.errors;
        console.error(error);
      console.error('Error updating product category.', error);
    });
  }

  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
