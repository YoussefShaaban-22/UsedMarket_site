import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { productcategory } from '../../../models/productcategory';
import { ProductcategoryService } from '../../../apiservices/productcategory.service';
import { NavigationExtras, Router } from '@angular/router';
import { BrandService } from '../../../apiservices/brand.service';
import { brand } from '../../../models/brand';
import { color } from '../../../models/color';
import { ColorService } from '../../../apiservices/color.service';
import { product } from '../../../models/product';
import { productattribute } from '../../../models/productattribute';
import { productcolor } from '../../../models/productcolor';
import { ProductService } from '../../../apiservices/product.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare const $: any;
type Row = {};


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',

})
export class CreateProductComponent implements OnInit {
  @ViewChildren('attributeName')
  attributeNameInputs!: QueryList<ElementRef>;
  @ViewChildren('attributeValue')
  attributeValueInputs!: QueryList<ElementRef>;

  @ViewChildren('quantityamount')
  quantityInputs!: QueryList<ElementRef>;
  @ViewChildren('discount')
  discountInputs!: QueryList<ElementRef>;
  @ViewChildren('Toquantityamount')
  ToquantityInputs!: QueryList<ElementRef>;

  formErrors: any = {};
  user: any = null;
  user_id: any = null;
  seller_id: any = null;
  rows: Row[] = [];
  discountrows: Row[] = [];
  tags: string[] = [];
  colors: color[] = [];
  selectedColors = new FormControl<any[]>([]);
  productcategories: productcategory[] = [];
  filteredCategories: productcategory[] = [];
  brands: brand[] = [];
  thumbnailImage!: File;
  images: File[] = [];
  imageUrls: string[] = [];
  product: product = {
    id: 0,
    name: '',
    user_id: '',
    category_id: '',
    brand_id: '',
    seller_id: '',
    thumbnail_image: '',
    image: [],
    tags: [],
    short_description: '',
    description: '',
    price: '',
    quantity: '',
    status: '',
    feature_product: '',
    slug: ''
  };
  productattribute: productattribute = {
    id: 0, product_id: '', attribute_name: '', attribute_value: ''
  };
  productcolor: productcolor = {
    id: 0, product_id: '', color_id: ''
  };

  @ViewChild('descriptionEditor') descriptionEditor!: ElementRef;
  @ViewChild('short_descriptionEditor') short_descriptionEditor!: ElementRef;
  ngAfterViewInit(): void {
    ($(this.descriptionEditor.nativeElement) as any).summernote({
      height: 300,
      callbacks: {
        onChange: (contents: string) => {
          this.product.description = contents;
        }
      }
    });

    ($(this.short_descriptionEditor.nativeElement) as any).summernote({
      height: 300,
      callbacks: {
        onChange: (contents: string) => {
          this.product.short_description = contents;
        }
      }
    });
  }

  constructor(private servcategories: ProductcategoryService,
    private servbarnd: BrandService, private servcolor: ColorService,
    private servproduct: ProductService, private router: Router, private http: HttpClient) { }



  addRow() {
    this.rows.push({});
  }
  removeRow(index: number) {
    this.rows.splice(index, 1);
  }
  addRowdiscount() {
    this.discountrows.push({});
  }
  removeRowdiscount(index: number) {
    this.discountrows.splice(index, 1);
  }
  addTag(input: HTMLInputElement) {
    const tag = input.value.trim();
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
      input.value = '';
    }
    input.focus();

  }
  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  ngOnInit(): void {

    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.user_id = this.user.id;
      this.seller_id = this.user.seller_id;
    }

    this.servcategories.getproductcategory().subscribe((data: productcategory[]) => {
      this.productcategories = data;
      this.filterCategories();
    }, error => {
      console.error('Error fetching product categories', error);
    });

    this.servbarnd.getbrand().subscribe((data: brand[]) => {
      this.brands = data;
    }, error => {
      console.error('Error fetching product categories', error);
    });

    this.servcolor.getcolor().subscribe((data: color[]) => {
      this.colors = data;
    }, error => {
      console.error('Error fetching product categories', error);
    });

  }

  filterCategories(): void {
    this.filteredCategories = this.productcategories.filter(category => category.parent_id > 0);
  }

  getParentName(category: productcategory): string {
    return category.parent ? category.parent.name : '';
  }

  onFileChangeLogo(event: any) {
    if (event.target.files.length > 0) {
      this.thumbnailImage = event.target.files[0];
      this.upload(this.thumbnailImage).subscribe(url => {
        this.product.thumbnail_image = url;
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

  onFileChange(event: any): void {
    const files = event.target.files;
    this.images = Array.from(files);
    this.uploadMultiple(this.images).subscribe(urls => {

      this.imageUrls = urls;
      this.product.image = urls;

    });
  }

  uploadMultiple(files: File[]): Observable<string[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('files[]', file));

    return this.http.post<{ paths: string[] }>('http://localhost:8000/api/uploadMultipleImage', formData).pipe(
      map(response => response.paths),
      catchError(error => {
        console.error('Upload failed', error);
        return throwError(error);
      })
    );
  }

  save() {
    const attributeNames = this.attributeNameInputs.map(input => input.nativeElement.value);
    const attributeValues = this.attributeValueInputs.map(input => input.nativeElement.value);
    const quantity = this.quantityInputs.map(input => input.nativeElement.value);
    const To_quantity = this.ToquantityInputs.map(input => input.nativeElement.value);
    const discount = this.discountInputs.map(input => input.nativeElement.value);
    this.product.tags = this.tags;
    this.product.seller_id = this.seller_id;
    this.product.user_id = this.user_id;

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('category_id', this.product.category_id);
    formData.append('brand_id', this.product.brand_id);
    formData.append('description', this.product.description);
    formData.append('slug', this.product.slug);
    formData.append('price', this.product.price);
    formData.append('quantity', this.product.quantity);
    formData.append('short_description', this.product.short_description);
    formData.append('user_id', this.product.user_id);
    if (this.product.seller_id!=null) {
      formData.append('seller_id', this.product.seller_id);
      formData.append('feature_product', 'no');
      formData.append('status', 'unpublish');
    }else{
      formData.append('feature_product', this.product.feature_product);
      formData.append('status', this.product.status);
    }
    if (Array.isArray(this.product.tags)) {
      this.product.tags.forEach((tag: string | Blob) => formData.append('tags[]', tag));
    } else {
      console.error('Tags data is not an array');
    }

    if (Array.isArray(this.product.image)) {
      this.product.image.forEach((file: string | Blob) => formData.append('image[]', file));
    } else {
      console.error('Images data is not an array');
    }

    if (this.product.thumbnail_image) {
      formData.append('thumbnail_image', this.product.thumbnail_image);
    }

    (this.selectedColors.value ?? []).forEach(colorId => {
      formData.append('colors[]', colorId);
    });

    attributeNames.forEach((attributeName, index) => {
      formData.append(`product_attributes[${index}][attribute_name]`, attributeName);
      formData.append(`product_attributes[${index}][attribute_value]`, attributeValues[index]);
    });

    quantity.forEach((quantity, index) => {
      formData.append(`product_discount[${index}][quantity]`, quantity);
      formData.append(`product_discount[${index}][To_quantity]`,To_quantity[index]);
      formData.append(`product_discount[${index}][discount]`, discount[index]);
    });
    const navigationExtras: NavigationExtras = {
      state: {
        message: 'We will check your product and publish it in 48 hours Max'
      }
    };
    this.servproduct.addproduct(formData).subscribe(() => {
      this.router.navigate(['/admin/product/show'], navigationExtras);

    }, error => {

      this.formErrors = error.error.errors;
      console.error('Error adding Product', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
