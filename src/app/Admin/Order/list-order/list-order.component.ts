import { Component } from '@angular/core';
import { product } from '../../../models/product';
import { order } from '../../../models/order';
import { user } from '../../../models/user';
import { ProductService } from '../../../apiservices/product.service';
import { OrderService } from '../../../apiservices/order.service';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { Router } from '@angular/router';
interface GroupedOrder {
  order_id: number;
  paid: string;
  status: string;
  total_price: number;
  products: order[];
  users: any;
}
@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css'
})
export class ListOrderComponent {
  products: product[] = [];
  orders: order[] = [];
  users: user[] = [];
  groupedOrders: any[] = [];
  user: any = null;
  user_sellerId: user[] = [];

  constructor(private productserv: ProductService, private orderserv: OrderService
    , private Authserv: AuthApiFunctionService, private router: Router) {
    const userData = this.Authserv.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.user_sellerId = this.user.seller_id

    }
  }
  ngOnInit(): void {
    this.orderserv.getorder().subscribe((data: order[]) => {
      this.orders = data;
      this.groupOrdersByOrderId();
    }, error => {
      console.error('Error fetching Cart', error);
    });

    this.productserv.getproduct().subscribe((data: product[]) => {
      this.products = data;
    }, error => {
      console.error('Error fetching Cart', error);
    });

    this.Authserv.getuser().subscribe((data: user[]) => {
      this.users = data;
    }, error => {
      console.error('Error fetching Cart', error);
    });

  }

  groupOrdersByOrderId() {
    const grouped: { [key: number]: GroupedOrder } = this.orders.reduce((acc, order) => {
      if (!acc[order.order_id]) {
        acc[order.order_id] = {
          order_id: order.order_id,
          paid: order.paid,
          status: order.status,
          total_price: order.total_price,
          products: [],
          users: order.user_id
        };
      }
      acc[order.order_id].products.push(order);
      return acc;
    }, {} as { [key: number]: GroupedOrder });

    this.groupedOrders = Object.values(grouped);
  }

  ShowOrder(id: number): void {
    this.router.navigate(['admin/Order', id]);
  }
}
