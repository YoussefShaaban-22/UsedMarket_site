import { Component } from '@angular/core';
import { shippingpolicy } from '../../../models/shippingpolicy';
import { FooterService } from '../../../apiservices/footer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-shippingpolicy',
  templateUrl: './view-shippingpolicy.component.html',
  styleUrl: './view-shippingpolicy.component.css'
})
export class ViewShippingpolicyComponent {
  shippingpolicy: shippingpolicy[] = [];
  constructor(private serv: FooterService, private router: Router) { }

  ngOnInit(): void {
    this.serv.getShippingpolicy().subscribe((data: shippingpolicy[]) => {
      this.shippingpolicy = data;
    }, error => {
      console.error('Error fetching shipping policy.', error);
    });
  }

  editshippingpolicy(id: number): void {
    this.router.navigate(['admin/shippingpolicy/update', id]);
  }
}
