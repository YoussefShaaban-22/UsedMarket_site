import { Component } from '@angular/core';
import { BlogService } from '../../../apiservices/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { blog } from '../../../models/blog';
import { blogcategory } from '../../../models/blogcategory';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent {
  slug: any;
  blog: any = new blog();
  blogcategories: blogcategory[] = [];
  blogs: blog[] = [];

  constructor(private serv: BlogService, private router: Router,
    private activeRoute: ActivatedRoute, private http: HttpClient) {

  }
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.serv.getBlogByslug(this.slug).subscribe(
        (data: blog) => {
          this.blog = data;
        },
        error => {
          console.error('Error fetching blog', error);
        }
      );
    });
    this.slug = this.activeRoute.snapshot.paramMap.get('slug')!;
    console.log(this.slug);

    this.serv.getnewblog().subscribe((data: blog[]) => {
      this.blogs = data;
    }, error => {
      console.error('Error fetching products', error);
    });
    this.serv.getblogCategory().subscribe((data: blogcategory[]) => {
      this.blogcategories = data;
    }, error => {
      console.error('Error fetching products', error);
    });
  }
}
