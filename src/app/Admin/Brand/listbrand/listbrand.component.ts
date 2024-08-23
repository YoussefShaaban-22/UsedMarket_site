import { Component } from '@angular/core';
import { brand } from '../../../models/brand';
import { BrandService } from '../../../apiservices/brand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listbrand',
  templateUrl: './listbrand.component.html',
  styleUrl: './listbrand.component.css'
})
export class ListbrandComponent {
  brands: brand[] = [];

  constructor(private serv: BrandService, private route: Router) {

  }
  ngOnInit(): void {
    this.serv.getbrand().subscribe((data: brand[]) => {
      this.brands = data;
    }, error => {
      console.error('Error fetching brand', error);
    });
  }

  editbrand(id: number): void {
    this.route.navigate(['admin/brand/update', id]);
  }
  deletebrand(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.serv.deletebrand(id).subscribe(() => {
        this.brands = this.brands.filter(brand => brand.id !== id);
      }, error => {
        console.error('Error deleting brand', error);
      });
    }
  }
}
