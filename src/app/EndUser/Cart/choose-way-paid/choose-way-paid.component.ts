import { Component } from '@angular/core';
import { cart } from '../../../models/cart';
import { CartService } from '../../../apiservices/cart.service';
import { Router } from '@angular/router';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { OrderService } from '../../../apiservices/order.service';
import { ProductService } from '../../../apiservices/product.service';

@Component({
  selector: 'app-choose-way-paid',
  templateUrl: './choose-way-paid.component.html',
  styleUrl: './choose-way-paid.component.css'
})
export class ChooseWayPaidComponent {
  carts: cart[] = [];
  user: any = null;
  user_id: any = null;
  TotalPriceOfCart: any;

  constructor(private cartserv: CartService, private orderserv: OrderService,
    private router: Router, private Authserv: AuthApiFunctionService, private productService: ProductService) {
    const userData = this.Authserv.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.user_id = this.user.id;
    }
  }

  ngOnInit(): void {
    this.cartserv.getcartByuserId(this.user_id).subscribe((data: cart[]) => {
      this.carts = data;
      let total = 0;
      this.carts.forEach(cartItem => {
        const formattedTotalPrice = Number(cartItem.total_price).toFixed(2);
        total += Number(formattedTotalPrice);
      });
      this.TotalPriceOfCart = Number(total).toFixed(2);
    }, error => {
      console.error('Error fetching Cart', error);
    });
  }

  submitOrder(): void {
    const selectedPaymentMethod = (document.querySelector('input[name="cartOption"]:checked') as HTMLInputElement)?.value;

    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    const orderData = {
      user_id: this.user_id,
      product_id: this.carts.map(cartItem => cartItem.product_id),
      seller_id: this.carts.map(cartItem => cartItem.seller_id),
      quantity: this.carts.map(cartItem => cartItem.quantity),
      color: this.carts.map(cartItem => cartItem.color),
      product_price: this.carts.map(cartItem => cartItem.product_price),
      total_product_price: this.carts.map(cartItem => cartItem.total_price),
      total_price: this.TotalPriceOfCart,
      paid: selectedPaymentMethod === 'cash' ? 'not paid' : 'paid',
    };

    this.orderserv.addorder(orderData).subscribe(response => {
      alert(response.message);
      this.carts.forEach(cartItem => {
        this.deleteCartItem(cartItem.id);
        this.decreaseProductQuantity(cartItem.product_id, cartItem.quantity);
      });
      this.router.navigate(['/']);

    }, error => {
      console.error('Error placing order', error);
    });
  }

  deleteCartItem(id: number): void {
    this.cartserv.deletecart(id).subscribe(() => {
      console.log(`Cart item with ID ${id} deleted successfully.`);
    }, error => {
      console.error(`Error deleting cart item with ID ${id}`, error);
    });
  }

  decreaseProductQuantity(productId: number, quantity: number): void {
    this.productService.decreaseProductQuantity(productId, quantity).subscribe(() => {
      console.log(`Product with ID ${productId} quantity decreased by ${quantity}.`);
    }, error => {
      console.error(`Error decreasing quantity for product with ID ${productId}`, error);
    });
  }
}
