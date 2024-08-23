import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../../apiservices/product.service';
import { product } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { brand } from '../../../models/brand';
import { productcategory } from '../../../models/productcategory';
import { color } from '../../../models/color';
import { ProductcategoryService } from '../../../apiservices/productcategory.service';
import { ColorService } from '../../../apiservices/color.service';
import { BrandService } from '../../../apiservices/brand.service';
import { productattribute } from '../../../models/productattribute';
import { productcolor } from '../../../models/productcolor';
import { json } from 'stream/consumers';
import { productdiscount } from '../../../models/productdiscount';
declare const $: any; // Declare jQuery globally

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  id: any;
  user: any = null;
  user_id: any = null;
  seller_id: any = 4;
  rows: any[] = [{ attribute_name: '', attribute_value: '' }];
  discountrows: any[] = [{ quantity: '', To_quantity: '', discount: '' }];

  tags: string[] = [];
  colors: color[] = [];
  selectedColors = new FormControl<any[]>([]);
  productcategories: productcategory[] = [];
  filteredCategories: productcategory[] = [];
  brands: brand[] = [];
  thumbnailImage!: File;
  images: File[] = [];
  imageUrls: string[] = [];
  product: any = new product();
  productcolor: productcolor[] = [];
  productattribute: productattribute[] = [];
  productdiscont: productdiscount[] = [];

  products: product[] = [];

  @ViewChild('descriptionEditor') descriptionEditor!: ElementRef;
  @ViewChild('short_descriptionEditor') short_descriptionEditor!: ElementRef;

  constructor(private servProduct: ProductService, private router: Router,
    private activeRoute: ActivatedRoute, private servcategories: ProductcategoryService,
    private servbarnd: BrandService, private servcolor: ColorService, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.servProduct.getproductById(this.id).subscribe((data: product) => {
      this.product = data;
      if (typeof this.product.tags === 'string') {
        this.tags = this.product.tags.split(',').map((tag: string) => tag.trim());
      } else if (Array.isArray(this.product.tags)) {
        this.tags = this.product.tags;
      } else {
        console.error('Tags data is neither a string nor an array');
        this.tags = [];
      }
      this.initializeSummernote();
    }, error => {
      console.error('Error fetching Product', error);
    });

    this.servProduct.getProductcolor(this.id).subscribe((data: productcolor[]) => {
      const colorIds = data.map(pc => pc.color_id);
      this.selectedColors.setValue(colorIds);

    }, error => {
      console.error('Error fetching Product', error);
    });

    this.servProduct.getProductattribute(this.id).subscribe((data: any[]) => {
      this.productattribute = data;
      this.rows = this.productattribute.map(attr => ({
        attribute_name: attr.attribute_name,
        attribute_value: attr.attribute_value
      }));
    }, error => {
      console.error('Error fetching attributes', error);
    });


    this.servProduct.getProductdiscount(this.id).subscribe((data: any[]) => {
      this.productdiscont = data;
      this.discountrows = this.productdiscont.map(attr => ({
        quantity: attr.quantity,
        To_quantity: attr.To_quantity,
        discount: attr.discount
      }));
    }, error => {
      console.error('Error fetching discount', error);
    });

    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.user_id = this.user.id;
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

  ngAfterViewInit(): void {
    this.initializeSummernote();
  }
  initializeSummernote(): void {
    if (this.descriptionEditor) {
      ($(this.descriptionEditor.nativeElement) as any).summernote({
        height: 300,
        callbacks: {
          onChange: (contents: string) => {
            this.product.description = contents;
          }
        }
      }).summernote('code', this.product.description);
    }
    if (this.short_descriptionEditor) {
      ($(this.short_descriptionEditor.nativeElement) as any).summernote({
        height: 300,
        callbacks: {
          onChange: (contents: string) => {
            this.product.short_description = contents;
          }
        }
      }).summernote('code', this.product.short_description);
    }
  }
  addRow() {
    this.rows.push({ attribute_name: '', attribute_value: '' });
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
    const productData = {
      name: this.product.name,
      category_id: this.product.category_id,
      brand_id: this.product.brand_id,
      description: this.product.description,
      feature_product: this.product.feature_product,
      status: this.product.status,
      slug: this.product.slug,
      price: this.product.price,
      quantity: this.product.quantity,
      short_description: this.product.short_description,
      seller_id: this.product.seller_id,
      user_id: this.product.user_id,
      tags: Array.isArray(this.tags) ? this.tags : [],
      image: Array.isArray(this.product.image) ? this.product.image : [],
      thumbnail_image: this.product.thumbnail_image,
      colors: this.selectedColors.value,
      product_attributes: this.rows,
      product_discount: this.discountrows,
    };

    // Log the product data for debugging
    // console.log('Product Data:', JSON.stringify(productData, null, 2));

    // Send the JSON data
    this.servProduct.updateproduct(this.product.id, productData).subscribe(() => {
      this.router.navigate(['/admin/product/show']);
    }, error => {
      console.error('Error updating product', error);
    });

  }
}
