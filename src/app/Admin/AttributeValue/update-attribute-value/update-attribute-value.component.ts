import { Component } from '@angular/core';
import { AttributeService } from '../../../apiservices/attribute.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { attributevalue } from '../../../models/attributevalue';

@Component({
  selector: 'app-update-attribute-value',
  templateUrl: './update-attribute-value.component.html',
  styleUrl: './update-attribute-value.component.css'
})
export class UpdateAttributeValueComponent {
  id: any;
  attributevalue: attributevalue = {
    id: 0, attribute_id: '', value: ''
  };
  formErrors: any = {};

  constructor(private serv: AttributeService, private router: Router,
    private activeRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.serv.getattributeByIdvalue(this.id).subscribe((data: attributevalue) => {
      this.attributevalue = data;

    }, error => {
      console.error('Error fetching attribute', error);
    });

  }

  save(): void {
    this.serv.updateattributevalue(this.attributevalue.id, this.attributevalue).subscribe(() => {
      this.router.navigate(['/admin/attributevalue/create', this.attributevalue.attribute_id]);
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
