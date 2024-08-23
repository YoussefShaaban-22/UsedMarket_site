import { Component } from '@angular/core';
import { attribute } from '../../../models/attribute';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AttributeService } from '../../../apiservices/attribute.service';

@Component({
  selector: 'app-update-attribute',
  templateUrl: './update-attribute.component.html',
  styleUrl: './update-attribute.component.css'
})
export class UpdateAttributeComponent {
  id: any;
  attribute: attribute = {
    id: 0, name: ''
  };
  formErrors: any = {};


  constructor(private serv: AttributeService, private router: Router,
    private activeRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.serv.getattributeById(this.id).subscribe((data: attribute) => {
      this.attribute = data;

    }, error => {
      console.error('Error fetching attribute', error);
    });

  }

  save(): void {
    this.serv.updateattribute(this.attribute.id, this.attribute).subscribe(() => {
      this.router.navigate(['/admin/attribute/show']);
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
