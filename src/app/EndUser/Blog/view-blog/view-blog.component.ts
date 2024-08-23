import { Component, OnInit } from '@angular/core';
import { blogcategory } from '../../../models/blogcategory';
import { blog } from '../../../models/blog';
import { BlogService } from '../../../apiservices/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {
  blogcategories: blogcategory[] = [];
  blogs: blog[] = [];
  newblogs: blog[] = [];
  filteredBlogs: blog[] = [];
  selectedCategories: string[] = [];
  page: number = 1;

  constructor(private serv: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.loadBlogs(); // Load all blogs initially
    this.serv.getnewblog().subscribe((data: blog[]) => {
      this.newblogs = data;
    }, error => {
      console.error('Error fetching new blogs', error);
    });
    this.serv.getblogCategory().subscribe((data: blogcategory[]) => {
      this.blogcategories = data;
    }, error => {
      console.error('Error fetching blog categories', error);
    });
  }

  onCategoryChange(categoryId: string, event: any): void {
    if (event.target.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    }
    this.page = 1;
    this.loadBlogs();
  }

  loadBlogs(): void {
    if (this.selectedCategories.length === 0) {
      this.serv.getblog().subscribe((data: blog[]) => {
        this.filteredBlogs = data;
      }, error => {
        console.error('Error fetching blogs', error);
      });
    } else {
      this.serv.getBlogsByCategories(this.selectedCategories).subscribe((data: blog[]) => {
        this.filteredBlogs = data;
      }, error => {
        console.error('Error fetching filtered blogs', error);
      });
    }
  }
}
