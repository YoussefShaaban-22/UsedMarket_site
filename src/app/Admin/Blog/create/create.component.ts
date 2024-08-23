import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { blog } from '../../../models/blog';
import { BlogService } from '../../../apiservices/blog.service';
import { Router } from '@angular/router';
import { blogcategory } from '../../../models/blogcategory';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
declare const $: any; // Declare jQuery globally

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateBlogComponent implements OnInit, AfterViewInit {
  blogCategories: blogcategory[] = [];
  selectedFile!: File;
  blog: blog = {
    id: 0, name: '', blog_category_id: '', image: '', short_description: '',
    description: '', slug: '', status: '', top_blog: '',created_at:''
  };
  // blog: any = new blog();
  formErrors: any = {};
  @ViewChild('descriptionEditor') descriptionEditor!: ElementRef;

  constructor(private serv: BlogService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.serv.getblogCategory().subscribe((data: blogcategory[]) => {
      this.blogCategories = data;
    }, error => {
      console.error('Error fetching blog categories', error);
    });
  }

  ngAfterViewInit(): void {
    ($(this.descriptionEditor.nativeElement) as any).summernote({
      height: 300,
      callbacks: {
        onChange: (contents: string) => {
          this.blog.description = contents;
        }
      }
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const fileName = this.selectedFile.name;
      console.log('File Name:', fileName);
      const fileUrl = URL.createObjectURL(this.selectedFile);
      console.log('File URL:', fileUrl);

      this.upload(this.selectedFile).subscribe(url => {
        console.log(url);
        this.blog.image = url;
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

  save(): void {
    const formData = new FormData();
    formData.append('name', this.blog.name);
    formData.append('blog_category_id', this.blog.blog_category_id);
    formData.append('short_description', this.blog.short_description);
    formData.append('description', this.blog.description);
    formData.append('slug', this.blog.slug);
    formData.append('status', this.blog.status);
    formData.append('top_blog', this.blog.top_blog);

    if (this.blog.image) {
      formData.append('image', this.blog.image);
    }

    this.serv.addblog(formData).subscribe(() => {
      this.router.navigate(['/admin/blog/show']);
    }, error => {
      this.formErrors = error.error.errors;
        console.error(this.formErrors);
      console.error('Error adding blog', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
