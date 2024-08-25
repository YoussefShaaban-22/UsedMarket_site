import { Component } from '@angular/core';
import { information } from '../../../models/information';
import { FooterService } from '../../../apiservices/footer.service';
import { Router } from '@angular/router';
import { socialLinks } from '../../../models/socialLinks';
import { productcategory } from '../../../models/productcategory';
import { ProductcategoryService } from '../../../apiservices/productcategory.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  informations: information[] = [];
  socialLinks: socialLinks[] = [];
  productcategories: productcategory[] = [];

  constructor(private serv: FooterService, private Productcategoryserv: ProductcategoryService) {

  }
  ngOnInit(): void {
    this.serv.getinformation().subscribe((data: information[]) => {
      this.informations = data;
    }, error => {
      console.error('Error fetching information', error);
    });

    this.serv.getsocialLinks().subscribe((data: socialLinks[]) => {
      this.socialLinks = data;
    }, error => {
      console.error('Error fetching social Links', error);
    });

    this.Productcategoryserv.getproductcategory().subscribe((data: productcategory[]) => {
      this.productcategories = data;
    }, error => {
      console.error('Error fetching product categories', error);
    });
  }
}
