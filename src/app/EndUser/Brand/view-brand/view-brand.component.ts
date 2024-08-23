import { Component } from '@angular/core';
import { brand } from '../../../models/brand';
import { BrandService } from '../../../apiservices/brand.service';

@Component({
  selector: 'app-view-brand',
  templateUrl: './view-brand.component.html',
  styleUrl: './view-brand.component.css'
})
export class ViewBrandComponent {
  brands: brand[] = [];

  constructor(private brandserv: BrandService) { }

  ngOnInit(): void {
    this.brandserv.getbrand().subscribe((data: brand[]) => {
      this.brands = data;
    }, error => {
      console.error('Error fetching brands', error);
    });
  }
}
