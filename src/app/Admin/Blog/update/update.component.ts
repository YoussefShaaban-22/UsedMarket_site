import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { blog } from '../../../models/blog';
import { BlogService } from '../../../apiservices/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { blogcategory } from '../../../models/blogcategory';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare const $: any; // Declare jQuery globally

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateBlogComponent implements OnInit, AfterViewInit {
  id: any;
  blogCategories: blogcategory[] = [];
  selectedFile!: File;
  blog: blog = {
    id: 0, name: '', blog_category_id: '', image: '', short_description: '',
    description: '', slug: '', status: '', top_blog: '', created_at: ''
  };
  // blog: any = new blog();
  formErrors: any = {};

  @ViewChild('descriptionEditor') descriptionEditor!: ElementRef;

  constructor(private serv: BlogService, private router: Router,
    private activeRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.serv.getBlogById(this.id).subscribe((data: blog) => {
      this.blog = data;
      this.initializeSummernote();
    }, error => {
      console.error('Error fetching blog', error);
    });
    console.log(this.blog);
    this.serv.getblogCategory().subscribe((data: blogcategory[]) => {
      this.blogCategories = data;
    }, error => {
      console.error('Error fetching blog categories', error);
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
            this.blog.description = contents;
          }
        }
      }).summernote('code', this.blog.description);
    }
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
    this.serv.updateBlog(this.blog.id, this.blog).subscribe(() => {
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
