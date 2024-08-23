import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { blogcategory } from '../models/blogcategory';
import { blog } from '../models/blog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  addblogCategory(object: any) {
    return this.http.post("http://127.0.0.1:8000/api/BlogCategory", object);
  }
  getblogCategory() {
    return this.http.get<blogcategory[]>("http://127.0.0.1:8000/api/BlogCategory");
  }
  updateBlogCategory(id: number, category: blogcategory) {
    return this.http.put(`http://127.0.0.1:8000/api/BlogCategory/${id}`, category);
  }
  getBlogCategoryById(id: any) {
    return this.http.get<blogcategory>(`http://127.0.0.1:8000/api/BlogCategory/${id}`);
  }
  deleteBlogCategory(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/BlogCategory/${id}`);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  addblog(blog: FormData): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/Blog", blog);
  }
  getblog() {
    return this.http.get<blog[]>("http://127.0.0.1:8000/api/Blog");
  }
  getnewblog() {
    return this.http.get<blog[]>("http://127.0.0.1:8000/api/NewBlog");
  }
  getBlogsByCategories(categories: string[]): Observable<blog[]> {
    return this.http.post<blog[]>("http://127.0.0.1:8000/api/filterBlog", { categories });
  }
  updateBlog(id: number, blog: blog) {
    return this.http.put(`http://127.0.0.1:8000/api/Blog/${id}`, blog);
  }
  getBlogById(id: any) {
    return this.http.get<blog>(`http://127.0.0.1:8000/api/BlogID/${id}`);
  }
  getBlogByslug(slug: any) {
    return this.http.get<blog>(`http://127.0.0.1:8000/api/BlogSlug/${slug}`);
  }
  deleteBlog(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/Blog/${id}`);
  }
}
