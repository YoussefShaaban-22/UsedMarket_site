import { Component } from '@angular/core';
import { attribute } from '../../../models/attribute';
import { AttributeService } from '../../../apiservices/attribute.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-attribute',
  templateUrl: './create-attribute.component.html',
  styleUrl: './create-attribute.component.css'
})
export class CreateAttributeComponent {
  attribute: attribute = {
    id: 0, name: ''};
    formErrors: any = {};

  constructor(private serv: AttributeService, private router: Router, private http: HttpClient) { }

  save(): void {
    const formData = new FormData();
    formData.append('name', this.attribute.name);

    this.serv.addattribute(formData).subscribe(() => {
      this.router.navigate(['/admin/attribute/show']);
    }, error => {
      this.formErrors = error.error.errors;
        console.error(error);
      console.error('Error adding attribute', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
