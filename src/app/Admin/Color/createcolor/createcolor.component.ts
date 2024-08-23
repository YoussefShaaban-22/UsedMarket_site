import { Component } from '@angular/core';
import { color } from '../../../models/color';
import { ColorService } from '../../../apiservices/color.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-createcolor',
  templateUrl: './createcolor.component.html',
  styleUrl: './createcolor.component.css'
})
export class CreatecolorComponent {
  color: color = {
    id: 0, name: '', code: ''
  };
  formErrors: any = {};
  constructor(private serv: ColorService, private router: Router, private http: HttpClient) { }

  save(): void {
    const formData = new FormData();
    formData.append('name', this.color.name);
    formData.append('code', this.color.code);

    this.serv.addcolor(formData).subscribe(() => {
      this.router.navigate(['/admin/color/show']);
    }, error => {
      this.formErrors = error.error.errors;
      console.error(error);
      console.error('Error adding blog', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
