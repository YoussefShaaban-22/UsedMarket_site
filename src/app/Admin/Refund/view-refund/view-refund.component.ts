import { Component } from '@angular/core';
import { product } from '../../../models/product';
import { order } from '../../../models/order';
import { user } from '../../../models/user';
import { refund } from '../../../models/refund';
import { ProductService } from '../../../apiservices/product.service';
import { OrderService } from '../../../apiservices/order.service';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { Router } from '@angular/router';
import { RefundService } from '../../../apiservices/refund.service';
import { mergeMap, switchMap } from 'rxjs';

@Component({
  selector: 'app-view-refund',
  templateUrl: './view-refund.component.html',
  styleUrl: './view-refund.component.css'
})
export class ViewRefundComponent {
  products: product[] = [];
  orders: order[] = [];
  users: user[] = [];
  refunds: refund[] = [];
  order: any = new order();
  product: any = new product();
  user: any = null;
  user_sellerId: user[] = [];

  constructor(private productserv: ProductService, private orderserv: OrderService, private refundserv: RefundService
    , private Authserv: AuthApiFunctionService, private router: Router) {
      const userData = this.Authserv.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
        this.user_sellerId = this.user.seller_id
      }
    }

  ngOnInit(): void {
    this.refundserv.getrefund().subscribe((data: refund[]) => {
      this.refunds = data;
    }, error => {
      console.error('Error fetching Cart', error);
    });

    this.productserv.getproduct().subscribe((data: product[]) => {
      this.products = data;
    }, error => {
      console.error('Error fetching product', error);
    });

    this.orderserv.getorder().subscribe((data: order[]) => {
      this.orders = data;
    }, error => {
      console.error('Error fetching order', error);
    });

    this.Authserv.getuser().subscribe((data: user[]) => {
      this.users = data;
    }, error => {
      console.error('Error fetching user', error);
    });

  }
  acceptRefund(refundId: number, orderId: number): void {

    const refundToUpdate = this.refunds.find(refund => refund.id === refundId);

    if (refundToUpdate) {
      // Update the refund status
      this.refundserv.updateaccept(refundId, { ...refundToUpdate, status: 'Accepted' }).pipe(
        switchMap(response => {
          console.log('Refund status updated successfully:', response);

          // Fetch the order details
          return this.orderserv.getorderById(orderId).pipe(
            switchMap((order: order) => {
              console.log('Order details:', order);

              // Fetch the product details based on the order's product_id
              return this.productserv.getproductById(order.product_id).pipe(
                mergeMap((product: product) => {
                  console.log('Product details:', product);

                  // Calculate the total refunded amount
                  const totalRefundedAmount = this.refunds
                    .filter(refund => refund.order_id === orderId)
                    .reduce((sum, refund) => {
                      const orderItem = this.orders.find(order => order.id === refund.order_id);
                      return sum + (orderItem ? orderItem.total_product_price : 0);
                    }, 0);

                  // Calculate new total price and quantity
                  const newTotalPrice = order.total_price - totalRefundedAmount;
                  const newTotalQuantity = order.quantity + product.quantity;

                  console.log('Total refunded amount:', totalRefundedAmount);
                  console.log('New total price:', newTotalPrice);
                  console.log('New quantity:', newTotalQuantity);

                  // Update the order total price and quantity
                  return this.orderserv.updateOrderTotalPrice(orderId, newTotalPrice, newTotalQuantity);

                })
              );

            })

          );
        })
      ).subscribe(
        () => {
          console.log('Order total price and quantity updated successfully');
          window.location.reload();
        },
        error => {
          console.error('Error updating order total price and quantity', error);
        }
      );
    }
  }

  cancelRefund(refundId: number): void {
    const refundToUpdate = this.refunds.find(refund => refund.id === refundId);

    if (refundToUpdate) {
      // Update the refund status
      this.refundserv.updatecancel(refundId, { ...refundToUpdate, status: 'Cancelled' }).subscribe(response => {
        console.log('Refund status updated successfully:', response);
        window.location.reload();

      }, error => {
        console.error('Error updating refund status', error);
      });
    }
  }
}
