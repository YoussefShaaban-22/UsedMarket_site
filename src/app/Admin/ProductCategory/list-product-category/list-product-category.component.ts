import { Component } from '@angular/core';
import { ProductcategoryService } from '../../../apiservices/productcategory.service';
import { Router } from '@angular/router';
import { productcategory } from '../../../models/productcategory';

@Component({
  selector: 'app-list-product-category',
  templateUrl: './list-product-category.component.html',
  styleUrl: './list-product-category.component.css'
})
export class ListProductCategoryComponent {
  productcategories: productcategory[] = [];
  parentCategories: { [key: number]: string } = {};


  constructor(private serv: ProductcategoryService, private router: Router) { }

  ngOnInit(): void {
    this.serv.getproductcategory().subscribe((data: productcategory[]) => {
      this.productcategories = data;
      this.mapParentCategories();
    }, error => {
      console.error('Error fetching product categories', error);
    });
  }

  mapParentCategories(): void {
    this.productcategories.forEach(category => {
      this.parentCategories[category.id] = category.name;
    });
  }

  getParentCategoryName(parentId: number): string {
    return parentId === 0 ? 'Main category' : this.parentCategories[parentId] || 'Unknown category';
  }
  
  editproductcategory(id: number): void {
    this.router.navigate(['admin/productcategory/update', id]);
  }

  deleteproductcategory(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.serv.deleteproductcategory(id).subscribe(() => {
        this.productcategories = this.productcategories.filter(category => category.id !== id);
      }, error => {
        console.error('Error deleting product category', error);
      });
    }
  }
}
