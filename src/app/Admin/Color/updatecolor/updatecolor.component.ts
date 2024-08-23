import { Component } from '@angular/core';
import { ColorService } from '../../../apiservices/color.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { color } from '../../../models/color';

@Component({
  selector: 'app-updatecolor',
  templateUrl: './updatecolor.component.html',
  styleUrl: './updatecolor.component.css'
})
export class UpdatecolorComponent {
  id: any;

  selectedFile!: File;
  color: color = {
    id: 0, name: '', code: ''
  };

  formErrors: any = {};
  constructor(private serv: ColorService, private router: Router,
    private activeRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.serv.getcolorById(this.id).subscribe((data: color) => {
      this.color = data;

    }, error => {
      console.error('Error fetching blog', error);
    });

  }

  save(): void {
    this.serv.updatecolor(this.color.id, this.color).subscribe(() => {
      this.router.navigate(['/admin/color/show']);
    }, error => {
      this.formErrors = error.error.errors;
      console.error(error);
      console.error('Error updating color', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
