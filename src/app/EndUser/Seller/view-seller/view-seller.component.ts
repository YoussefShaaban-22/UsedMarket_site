import { Component } from '@angular/core';
import { seller } from '../../../models/seller';
import { SellerService } from '../../../apiservices/seller.service';

@Component({
  selector: 'app-view-seller',
  templateUrl: './view-seller.component.html',
  styleUrl: './view-seller.component.css'
})
export class ViewSellerComponent {
  sellers: seller[] = [];

  constructor(private sellerserv: SellerService) { }

  ngOnInit(): void {
    this.sellerserv.getseller().subscribe((data: seller[]) => {
      this.sellers = data;
    }, error => {
      console.error('Error fetching sellers', error);
    });
  }
  
}
