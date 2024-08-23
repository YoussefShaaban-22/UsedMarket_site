import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../apiservices/blog.service';
import { Router } from '@angular/router';
import { blogcategory } from '../../../models/blogcategory';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListBlogCategoryComponent implements OnInit {
  blogCategories: blogcategory[] = [];

  constructor(private serv: BlogService, private route: Router) {

  }
  ngOnInit(): void {
    this.serv.getblogCategory().subscribe((data: blogcategory[]) => {
      this.blogCategories = data;
    }, error => {
      console.error('Error fetching blog categories', error);
    });
  }
  editBlogCategory(id: number): void {
    this.route.navigate(['admin/blogCategory/update', id]);
  }
  deleteBlogCategory(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.serv.deleteBlogCategory(id).subscribe(() => {
        this.blogCategories = this.blogCategories.filter(category => category.id !== id);
      }, error => {
        console.error('Error deleting blog category', error);
      });
    }
  }
}
