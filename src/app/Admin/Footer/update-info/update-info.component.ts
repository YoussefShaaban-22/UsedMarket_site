import { Component } from '@angular/core';
import { information } from '../../../models/information';
import { FooterService } from '../../../apiservices/footer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrl: './update-info.component.css'
})
export class UpdateInfoComponent {
  id: any;
  selectedFile!: File;
  // homeslider: any = new homeslider();
  information: information = {
    id: 0, logo: '', about_company: ''
  };
  formErrors: any = {};

  constructor(private serv: FooterService, private router: Router,
    private activeRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.serv.getinformationById(this.id).subscribe((data: information) => {
      this.information = data;
    }, error => {
      console.error('Error fetching blog', error);
    });

  }

  onFileChangeLogo(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      this.upload(this.selectedFile).subscribe(url => {
        this.information.logo = url;
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
    this.serv.updateinformation(this.information.id, this.information).subscribe(() => {
      this.router.navigate(['/admin/information/show']);
    }, error => {
      this.formErrors = error.error.errors;
      console.error(error);
      console.error('Error updating information', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
