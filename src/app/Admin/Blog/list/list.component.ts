import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../apiservices/blog.service';
import { Router } from '@angular/router';
import { blog } from '../../../models/blog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListBlogComponent implements OnInit{
  blogs: blog[] = [];


  constructor(private serv: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.serv.getblog().subscribe((data: blog[]) => {
      this.blogs = data;
    }, error => {
      console.error('Error fetching blog categories', error);
    });
  }

  editBlog(id: number): void {
    this.router.navigate(['admin/blog/update', id]);
  }

  deleteBlog(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.serv.deleteBlog(id).subscribe(() => {
        this.blogs = this.blogs.filter(category => category.id !== id);
      }, error => {
        console.error('Error deleting blog', error);
      });
    }
  }
}
