import { Component } from '@angular/core';
import { product } from '../../../models/product';
import { cart } from '../../../models/cart';
import { ProductService } from '../../../apiservices/product.service';
import { CartService } from '../../../apiservices/cart.service';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { Router } from '@angular/router';
import { productdiscount } from '../../../models/productdiscount';
import { log } from 'console';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css'
})

export class ViewCartComponent {
  products: product[] = [];
  cart: any = new cart();
  carts: cart[] = [];
  productdiscount: productdiscount[] = [];
  user: any = null;
  user_id: any = null;
  quantity: any;
  TotalPriceOfCart: any;
  constructor(private productserv: ProductService, private cartserv: CartService,
    private router: Router, private Authserv: AuthApiFunctionService) {
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

    this.productserv.getproduct().subscribe((data: product[]) => {
      this.products = data;
    }, error => {
      console.error('Error fetching Cart', error);
    });
  }

  deletecart(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.cartserv.deletecart(id).subscribe(() => {
        this.carts = this.carts.filter(cart => cart.id !== id);
        window.location.reload();
      }, error => {
        console.error('Error deleting product from Cart', error);
      });
    }
  }

  onSubmit(cartId: number, productPrice: any): void {
    const cart = this.carts.find(c => c.id === cartId);

    if (cart) {
      this.productserv.getProductdiscount(cart.product_id).subscribe(
        (data: productdiscount[]) => {
          this.productdiscount = data;
          let discountedPrice = productPrice;
          const entryQuantity = cart.quantity;
          for (const discount of this.productdiscount) {
            if (entryQuantity >= discount.quantity && entryQuantity < discount.To_quantity) {
              discountedPrice = productPrice - (productPrice * discount.discount);
              break;
            }
          }
          const updatedCart = {
            id: cartId,
            user_id: cart.user_id,
            product_id: cart.product_id,
            seller_id: cart.seller_id,
            quantity: cart.quantity,
            color: cart.color,
            product_price: discountedPrice,
            total_price: cart.quantity * discountedPrice
          };
          this.cartserv.updatecart(updatedCart.id, updatedCart).subscribe(response => {
            window.location.reload();
          }, error => {
            console.error('Error updating cart', error);
          });
        },
        error => {
          console.error('Error fetching product discount', error);
        }
      );
    }
  }

  navigateToPayMethod(): void {
    this.router.navigate(['/paymethod']);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

}
