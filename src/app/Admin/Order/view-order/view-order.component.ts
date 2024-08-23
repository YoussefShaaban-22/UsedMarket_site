import { Component } from '@angular/core';
import { order } from '../../../models/order';
import { ProductService } from '../../../apiservices/product.service';
import { OrderService } from '../../../apiservices/order.service';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { SellerService } from '../../../apiservices/seller.service';
import { product } from '../../../models/product';
import { user } from '../../../models/user';
import { ActivatedRoute } from '@angular/router';
import { seller } from '../../../models/seller';
import { FormGroup } from '@angular/forms';
import { RefundService } from '../../../apiservices/refund.service';
import { refund } from '../../../models/refund';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
interface GroupedOrder {
  order_id: number;
  paid: string;
  status: string;
  total_price: number;
  products: order[];
  users: any;
  comment: any;
  user_required: any;
  created_at: any;
  updated_at: any;
}
@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css'
})
export class ViewOrderComponent {
  id: any;
  orders: order[] = [];
  products: product[] = [];
  refunds: refund[] = [];
  users: user[] = [];
  user_sellerId: user[] = [];
  sellers: seller[] = [];
  groupedOrders: any[] = [];
  commentForm!: FormGroup;
  user: any = null;

  constructor(private productserv: ProductService, private orderserv: OrderService, private activeRoute: ActivatedRoute,
    private Authserv: AuthApiFunctionService, private sellerserv: SellerService, private refundserv: RefundService) {
    const userData = this.Authserv.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.user_sellerId = this.user.seller_id
    }
  }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.orderserv.getorderId(this.id).subscribe((data: order[]) => {
      this.orders = data;
      this.groupOrdersByOrderId();
    }, error => {
      console.error('Error fetching Order', error);
    });

    this.productserv.getproduct().subscribe((data: product[]) => {
      this.products = data;
    }, error => {
      console.error('Error fetching Product', error);
    });

    this.sellerserv.getseller().subscribe((data: seller[]) => {
      this.sellers = data;
    }, error => {
      console.error('Error fetching Seller', error);
    });

    this.Authserv.getuser().subscribe((data: user[]) => {
      this.users = data;
    }, error => {
      console.error('Error fetching User', error);
    });

    this.refundserv.getrefund().subscribe((data: refund[]) => {
      this.refunds = data;
    }, error => {
      console.error('Error fetching User', error);
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
          users: order.user_id,
          comment: order.comment,
          user_required: order.user_required,
          created_at: order.created_at,
          updated_at: order.updated_at,
        };
      }
      acc[order.order_id].products.push(order);
      return acc;
    }, {} as { [key: number]: GroupedOrder });

    this.groupedOrders = Object.values(grouped);

  }

  onSubmit(): void {
    this.groupedOrders.forEach((order) => {
      if (order.comment.trim()) {
        this.orderserv.updatecomment(this.id, { comment: order.comment })
          .subscribe(
            (response) => {
              alert(`Comment for order submitted successfully!`)
            },
            (error) => {
              console.error(`Failed to submit comment for order ${order.id}`);
            }
          );
      }
    });
  }

  onAccept(): void {
    this.orderserv.updateaccept(this.id, { status: 'Accepted' })
      .subscribe(
        (response) => {
          alert(`Order accepted successfully!`);
          window.location.reload();
        },
        (error) => {
          alert(`Failed to accept order.`);
        }
      );
  }

  onCancel(): void {
    this.orderserv.updatecancel(this.id, { status: 'Cancelled' })
      .subscribe(
        (response) => {
          alert(`Order cancelled successfully!`);
          window.location.reload();
        },
        (error) => {
          alert(`Failed to cancel order.`);
        }
      );
  }

  onPaid(): void {
    this.orderserv.updatepaid(this.id, { paid: 'paid' })
      .subscribe(
        (response) => {
          alert(`Order marked as paid successfully!`);
          window.location.reload();
        },
        (error) => {
          alert(`Failed to mark order as paid.`);
        }
      );
  }

  hasRefundsForItem(itemId: number): boolean {
    return this.refunds.some(refund => refund.order_id === itemId);
  }

  getRefundsForItem(itemId: number) {
    return this.refunds.filter(refund => refund.order_id === itemId);
  }

  downloadReceipt(orderId: any) {
    const data = document.querySelector('.pdf') as HTMLElement;
    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`Receipt_of_Order_${orderId}.pdf`);
      });
    }
  }

  calculateTotal(order: any): number {
    let total = 0;
    for (let item of order.products) {
        const refundsForItem = this.getRefundsForItem(item.id);
        const hasAcceptedRefund = refundsForItem.some(refund => refund.status === 'Accepted');
        if (!hasAcceptedRefund) {
            for (let product of this.products) {
                if (product.id == item.product_id && product.seller_id == this.user_sellerId) {
                    if (item.total_product_price) {
                        total += parseFloat(item.total_product_price);
                    }
                }
            }
        }
    }
    return total;
}

}
