import { Component } from '@angular/core';
import { SellerService } from '../../../apiservices/seller.service';
import { Router } from '@angular/router';
import { seller } from '../../../models/seller';
import { order } from '../../../models/order';
import { refund } from '../../../models/refund';
import { OrderService } from '../../../apiservices/order.service';
import { RefundService } from '../../../apiservices/refund.service';

@Component({
  selector: 'app-list-seller',
  templateUrl: './list-seller.component.html',
  styleUrl: './list-seller.component.css'
})
export class ListSellerComponent {
  sellers: seller[] = [];
  orders: order[] = [];
  refunds: refund[] = [];

  constructor(private serv: SellerService, private route: Router, private orderserv: OrderService, private refundserv: RefundService) {

  }
  ngOnInit(): void {
    this.serv.getseller().subscribe((data: seller[]) => {
      this.sellers = data;
    }, error => {
      console.error('Error fetching seller', error);
    });

    this.orderserv.getorder().subscribe((data: order[]) => {
      this.orders = data;
    }, error => {
      console.error('Error fetching Cart', error);
    });

    this.refundserv.getrefund().subscribe((data: refund[]) => {
      this.refunds = data;
    }, error => {
      console.error('Error fetching Cart', error);
    });

  }

  editseller(id: number): void {
    this.route.navigate(['admin/seller/update', id]);
  }
  deleteseller(id: number): void {
    const hasPendingOrders = this.orders.some(order => order.seller_id === id && order.status !== 'Accepted');
    const hasPendingRefunds = this.refunds.some(refund => refund.seller_id === id && refund.status !== 'Accepted');

    if (hasPendingOrders || hasPendingRefunds) {
      alert('Cannot delete seller: There are pending orders or refunds.');
      return; // Exit the method without deleting
    }
    if (confirm('Are you sure you want to delete this item?')) {
      this.serv.deleteseller(id).subscribe(() => {
        this.sellers = this.sellers.filter(seller => seller.id !== id);
      }, error => {
        console.error('Error deleting seller', error);
      });
    }
  }
}
