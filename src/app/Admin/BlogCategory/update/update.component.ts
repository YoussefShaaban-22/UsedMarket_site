import { Component } from '@angular/core';
import { BlogService } from '../../../apiservices/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { blogcategory } from '../../../models/blogcategory';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateBlogCategoryComponent {
  id: any;
  category: blogcategory = { id: 0, name: '' };
  formErrors: any = {};

  constructor(private serv: BlogService, private router: Router,
    private activeRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    const id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.serv.getBlogCategoryById(id).subscribe((data: blogcategory) => {
      this.category = data;
    }, error => {
      console.error('Error fetching blog category', error);
    });


  }
  save(): void {
    this.serv.updateBlogCategory(this.category.id, this.category).subscribe(() => {
      this.router.navigate(['/admin/blogCategory/show']);
    }, error => {
      this.formErrors = error.error.errors;
      console.error(error);
      console.error('Error updating blog category', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }

}
