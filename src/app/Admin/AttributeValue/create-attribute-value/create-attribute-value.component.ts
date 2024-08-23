import { Component, OnInit } from '@angular/core';
import { attribute } from '../../../models/attribute';
import { attributevalue } from '../../../models/attributevalue';
import { AttributeService } from '../../../apiservices/attribute.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-attribute-value',
  templateUrl: './create-attribute-value.component.html',
  styleUrl: './create-attribute-value.component.css'
})
export class CreateAttributeValueComponent implements OnInit {
  id: any;
  attribute: attribute = { id: 0, name: '' };
  attributevalue: attributevalue = { id: 0, value: '', attribute_id: '' };
  attributevalues: attributevalue[] = [];
  formErrors: any = {};

  constructor(
    private serv: AttributeService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.serv.getattributeById(this.id).subscribe(
      (data: attribute) => {
        this.attribute = data;
      },
      error => {
        console.error('Error fetching attribute', error);
      }
    );

    this.serv.getattributevalue().subscribe(
      (data: attributevalue[]) => {
        this.attributevalues = data;
      },
      error => {
        console.error('Error fetching attribute values', error);
      }
    );
  }

  save(): void {
    const formData = new FormData();
    formData.append('attribute_id', this.attribute.id);
    formData.append('value', this.attributevalue.value);
    this.serv.addattributevalue(formData).subscribe(
      () => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['admin/attributevalue/create', this.attribute.id]);
        });
      },
      error => {
        this.formErrors = error.error.errors;
        console.error(error);
        console.error('Error adding attribute value', error);
      }
    );
  }

  clearError(field: string): void {
    delete this.formErrors[field];
  }

  editattributevalue(id: number): void {

  }

  deleteattributevalue(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.serv.deleteattributevalue(id).subscribe(
        () => {
          this.attributevalues = this.attributevalues.filter(av => av.id !== id);
        },
        error => {
          console.error('Error deleting attribute value', error);
        }
      );
    }
  }
}
