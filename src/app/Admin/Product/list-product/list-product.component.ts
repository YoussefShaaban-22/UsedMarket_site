import { Component } from '@angular/core';
import { product } from '../../../models/product';
import { ProductService } from '../../../apiservices/product.service';
import { Router } from '@angular/router';
import { seller } from '../../../models/seller';
import { SellerService } from '../../../apiservices/seller.service';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { user } from '../../../models/user';
import { refund } from '../../../models/refund';
import { order } from '../../../models/order';
import { OrderService } from '../../../apiservices/order.service';
import { RefundService } from '../../../apiservices/refund.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {
  products: product[] = [];
  sellers: seller[] = [];
  users: user[] = [];
  page: number = 1;
  user: any = null;
  message: string | null = null;
  orders: order[] = [];
  refunds: refund[] = [];

  constructor(private serv: ProductService, private servseller: SellerService,
    private userserv: AuthApiFunctionService, private router: Router,
    private orderserv: OrderService, private refundserv: RefundService) {
    const userData = this.userserv.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }

    if (this.user?.seller_id != null) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state) {
        this.message = navigation.extras.state['message'];
        setTimeout(() => {
          this.message = null;
        }, 7000);
      }
    }
  }

  ngOnInit(): void {
    this.serv.getproduct().subscribe((data: product[]) => {
      this.products = data;
    }, error => {
      console.error('Error fetching product categories', error);
    });
    this.servseller.getseller().subscribe((data: seller[]) => {
      this.sellers = data;
    }, error => {
      console.error('Error fetching product categories', error);
    });
    this.userserv.getuser().subscribe((data: user[]) => {
      this.users = data;
    }, error => {
      console.error('Error fetching product categories', error);
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
  editproduct(id: number): void {
    this.router.navigate(['admin/product/update', id]);
  }

  deleteproduct(id: number): void {
    const hasPendingOrders = this.orders.some(order => order.product_id === id && order.status !== 'Accepted');
    const hasPendingRefunds = this.refunds.some(refund => refund.product_id === id && refund.status !== 'Accepted');

    if (hasPendingOrders || hasPendingRefunds) {
      alert('Cannot delete Product: There are pending orders or refunds.');
      return; // Exit the method without deleting
    }
    if (confirm('Are you sure you want to delete this item?')) {
      this.serv.deleteproduct(id).subscribe(() => {
        this.products = this.products.filter(product => product.id !== id);
      }, error => {
        console.error('Error deleting product category', error);
      });
    }
  }
}
