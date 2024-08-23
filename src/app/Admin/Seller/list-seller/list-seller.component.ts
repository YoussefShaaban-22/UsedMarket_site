import { Component } from '@angular/core';
import { SellerService } from '../../../apiservices/seller.service';
import { Router } from '@angular/router';
import { seller } from '../../../models/seller';

@Component({
  selector: 'app-list-seller',
  templateUrl: './list-seller.component.html',
  styleUrl: './list-seller.component.css'
})
export class ListSellerComponent {
  sellers: seller[] = [];

  constructor(private serv: SellerService, private route: Router) {

  }
  ngOnInit(): void {
    this.serv.getseller().subscribe((data: seller[]) => {
      this.sellers = data;
    }, error => {
      console.error('Error fetching seller', error);
    });

  }

  editseller(id: number): void {
    this.route.navigate(['admin/seller/update', id]);
  }
  deleteseller(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.serv.deleteseller(id).subscribe(() => {
        this.sellers = this.sellers.filter(seller => seller.id !== id);
      }, error => {
        console.error('Error deleting seller', error);
      });
    }
  }
}
