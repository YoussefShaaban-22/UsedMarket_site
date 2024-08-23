import { Component } from '@angular/core';
import { BlogService } from '../../../apiservices/blog.service';
import { Router } from '@angular/router';
import { blogcategory } from '../../../models/blogcategory';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateBlogCategoryComponent {
  category: blogcategory = { id: 0, name: '' };
  formErrors: any = {};

  constructor(private serv: BlogService, private router: Router) { }

  save(): void {
    this.serv.addblogCategory(this.category).subscribe(() => {
      this.router.navigate(['/admin/blogCategory/show']);
    }, error => {
      this.formErrors = error.error.errors;
      console.error(error);
      console.error('Error adding blog category', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }



}
