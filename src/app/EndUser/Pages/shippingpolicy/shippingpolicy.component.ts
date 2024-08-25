import { Component } from '@angular/core';
import { FooterService } from '../../../apiservices/footer.service';
import { shippingpolicy } from '../../../models/shippingpolicy';

@Component({
  selector: 'app-shippingpolicy',
  templateUrl: './shippingpolicy.component.html',
  styleUrl: './shippingpolicy.component.css'
})
export class ShippingpolicyComponent {
  shippingpolicy: shippingpolicy[] = [];
  constructor(private serv: FooterService) { }

  ngOnInit(): void {
    this.serv.getShippingpolicy().subscribe((data: shippingpolicy[]) => {
      this.shippingpolicy = data;
    }, error => {
      console.error('Error fetching shipping policy.', error);
    });
  }
}
