import { Component } from '@angular/core';
import { attribute } from '../../../models/attribute';
import { Router } from '@angular/router';
import { AttributeService } from '../../../apiservices/attribute.service';

@Component({
  selector: 'app-list-attribute',
  templateUrl: './list-attribute.component.html',
  styleUrl: './list-attribute.component.css'
})
export class ListAttributeComponent {
  attributes: attribute[] = [];

  constructor(private serv: AttributeService, private route: Router) {

  }
  ngOnInit(): void {
    this.serv.getattribute().subscribe((data: attribute[]) => {
      this.attributes = data;
    }, error => {
      console.error('Error fetching seller', error);
    });
  }
  addvalue(id: number): void {
    this.route.navigate(['admin/attributevalue/create', id]);
  }
  editattributes(id: number): void {
    this.route.navigate(['admin/attribute/update', id]);
  }
  deleteattributes(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.serv.deleteattribute(id).subscribe(() => {
        this.attributes = this.attributes.filter(attribute => attribute.id !== id);
      }, error => {
        console.error('Error deleting attribute', error);
      });
    }
  }
}
