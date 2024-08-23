import { Component } from '@angular/core';
import { slider } from '../../../models/slider';
import { SliderService } from '../../../apiservices/slider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-updateslider',
  templateUrl: './updateslider.component.html',
  styleUrl: './updateslider.component.css'
})
export class UpdatesliderComponent {
  id: any;
  selectedFile!: File;
  slider: slider = { id: 0, image: '' };
  formErrors: any = {};
  constructor(private serv: SliderService, private router: Router,
    private activeRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.serv.getsliderById(this.id).subscribe((data: slider) => {
      this.slider = data;
    }, error => {
      console.error('Error fetching blog', error);
    });

  }

  onFileChangeLogo(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const fileName = this.selectedFile.name;
      const fileUrl = URL.createObjectURL(this.selectedFile);

      this.upload(this.selectedFile).subscribe(url => {
        console.log('image:', url);
        this.slider.image = url;
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
    this.serv.updateslider(this.slider.id, this.slider).subscribe(() => {
      this.router.navigate(['/admin/slider/show']);
    }, error => {
      this.formErrors = error.error.errors;
      console.error(error);
      console.error('Error updating slider', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }

}
