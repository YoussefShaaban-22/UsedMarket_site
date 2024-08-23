import { Component } from '@angular/core';
import { product } from '../../../models/product';
import { order } from '../../../models/order';
import { ProductService } from '../../../apiservices/product.service';
import { OrderService } from '../../../apiservices/order.service';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { refund } from '../../../models/refund';
import { RefundService } from '../../../apiservices/refund.service';
interface GroupedOrder {
  id:number;
  order_id: number;
  paid: string;
  status: string;
  total_price: number;
  products: order[];
  comment: string;
  user_required: string;
}
@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrl: './myorder.component.css'
})
export class MyorderComponent {
  products: product[] = [];
  order: any = new order();
  orders: order[] = [];
  refunds: refund[] = [];
  user: any = null;
  user_id: any = null;
  groupedOrders: any[] = [];
  refund: refund = new refund();
  refundData: { [key: number]: refund | null } = {};

  constructor(private productserv: ProductService, private orderserv: OrderService, private Authserv: AuthApiFunctionService
    , private refundserv: RefundService
  ) {
    const userData = this.Authserv.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.user_id = this.user.id;
    }
  }

  ngOnInit(): void {
    this.orderserv.getorderByuserId(this.user_id).subscribe((data: order[]) => {
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

    this.refundserv.getrefund().subscribe((data: refund[]) => {
      this.refunds = data;
      this.mapRefundsByOrderId();

    }, error => {
      console.error('Error fetching refund order', error);
    });
  }
  groupOrdersByOrderId() {
    const grouped: { [key: number]: GroupedOrder } = this.orders.reduce((acc, order) => {
      if (!acc[order.order_id]) {
        acc[order.order_id] = {
          id: order.id,
          order_id: order.order_id,
          paid: order.paid,
          status: order.status,
          total_price: order.total_price,
          products: [],
          comment: order.comment,
          user_required: order.user_required,
        };
      }
      acc[order.order_id].products.push(order);

      return acc;
    }, {} as { [key: number]: GroupedOrder });

    this.groupedOrders = Object.values(grouped);
  }

  onSubmit(orderId:any): void {
    this.groupedOrders.forEach((order) => {
      if (order.user_required.trim()) {
        this.orderserv.updateuser_required(orderId, { user_required: order.user_required })
          .subscribe(
            (response) => {
              alert(`Required for order submitted successfully!`)
              window.location.reload();
            },
            (error) => {
              console.error(`Failed to submit Required for order ${orderId}`);
            }
          );
      }
    });
  }

  addRefund(productId: any, orderId: any, sellerId: any) {

    this.refund.user_id = this.user_id;
    this.refund.product_id = productId;
    this.refund.order_id = orderId;
    this.refund.seller_id = sellerId;

    const cartData = new FormData();
    cartData.append('user_id', this.refund.user_id);
    cartData.append('product_id', this.refund.product_id);
    cartData.append('seller_id', this.refund.seller_id);
    cartData.append('order_id', this.refund.order_id);
    cartData.append('reason', this.refund.reason);


    this.refundserv.addrefund(cartData).subscribe(response => {
      alert(response.message);
      window.location.reload();
    }, error => {

      console.error(error);

    });
  }


  mapRefundsByOrderId() {
    this.refunds.forEach(refund => {
      this.refundData[refund.order_id] = refund;
    });
  }

  checkRefund(orderId: number) {
    return this.refundData[orderId] || null;
  }

}
