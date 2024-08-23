import { Component } from '@angular/core';
import { seller } from '../../../models/seller';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../../../apiservices/seller.service';
import { ProductService } from '../../../apiservices/product.service';
import { product } from '../../../models/product';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { color } from '../../../models/color';
import { ColorService } from '../../../apiservices/color.service';
import { productcolor } from '../../../models/productcolor';
import { cart } from '../../../models/cart';
import { CartService } from '../../../apiservices/cart.service';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { productdiscount } from '../../../models/productdiscount';


@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrl: './seller-product.component.css'
})

export class SellerProductComponent {

  user: any = null;
  user_id: any = null;
  seller: any = new seller();
  slug: any;
  products: product[] = [];
  productcolors: productcolor[] = [];
  safeUrl: SafeResourceUrl | null = null;
  quantity: number = 1;
  entries: { quantity: any; selectedColor: string }[] = [];
  color: color[] = [];
  productdiscount: productdiscount[] = [];
  cart: any = new cart();
  responseMessage: string = '';
  showModal: boolean = false;
  formErrors: any = {};
  page: number = 1;

  constructor(private productserv: ProductService, private sellerserv: SellerService, private sanitizer: DomSanitizer,
    private activeRoute: ActivatedRoute, private router: Router,
    private cartserv: CartService, private colorserv: ColorService, private Authserv: AuthApiFunctionService) {

    const userData = this.Authserv.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.user_id = this.user.id;
    }
  }

  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.sellerserv.getsellerByslug(this.slug).subscribe(
        (data: any) => {
          this.seller = data;
          if (this.seller.map) {
            const iframeSrcMatch = this.seller.map.match(/src="([^"]+)"/);
            if (iframeSrcMatch && iframeSrcMatch[1]) {
              this.safeUrl = this.sanitizeUrl(iframeSrcMatch[1]);
            } else {
              console.error('No src attribute found in iframe:', this.seller.map);
            }
          }
        },
        error => {
          console.error('Error fetching product', error);
        }
      );
    });

    this.productserv.getproduct().subscribe(
      (data: product[]) => {
        this.products = data;
      },
      error => {
        console.error('Error fetching product categories', error);
      }
    );

    this.productserv.getproductcolor().subscribe(
      (data: productcolor[]) => {
        this.productcolors = data;
      },
      error => {
        console.error('Error fetching product categories', error);
      }
    );

    this.colorserv.getcolor().subscribe(
      (data: color[]) => {
        this.color = data;
      },
      error => {
        console.error('Error fetching colors', error);
      }
    );


  }


  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  addEntry(): void {
    this.entries.push({ quantity: 1, selectedColor: '' });
  }

  removeEntry(index: number): void {
    if (this.entries.length > 1) {
      this.entries.splice(index, 1);
    }
  }

  increaseQuantityCart(i: any): void {

    this.entries[i].quantity++;

  }

  decreaseQuantityCart(i: any): void {
    if (this.entries[i].quantity > 1) {
      this.entries[i].quantity--;
    }
  }

  onSubmit(productId: any, productPrice: any, sellerId: any) {
    this.productserv.getProductdiscount(productId).subscribe(
      (data: productdiscount[]) => {
        this.productdiscount = data;

        this.entries.forEach(entry => {
          let discountedPrice = productPrice;
          const entryQuantity = entry.quantity;
          for (const discount of this.productdiscount) {
            if (entryQuantity >= discount.quantity && entryQuantity < discount.To_quantity) {
              discountedPrice = productPrice - (productPrice * discount.discount);
              break;
            }
          }

          this.cart.user_id = this.user_id;
          this.cart.product_id = productId;
          this.cart.seller_id = sellerId;
          this.cart.quantity = entry.quantity;
          this.cart.color = entry.selectedColor;
          this.cart.product_price = discountedPrice.toString();
          this.cart.total_price = (entry.quantity * parseFloat(this.cart.product_price)).toString();

          const cartData = new FormData();
          cartData.append('user_id', this.cart.user_id);
          cartData.append('product_id', this.cart.product_id);
          cartData.append('quantity', this.cart.quantity.toString());
          cartData.append('color', this.cart.color);
          cartData.append('product_price', this.cart.product_price);
          cartData.append('total_price', this.cart.total_price);

          this.cartserv.addcart(cartData).subscribe(response => {
            alert(response.message);
            window.location.href = '/Mycart';
          }, error => {
            this.formErrors = error.error.errors;
            console.error(error);
          });
        });
      },
      error => {
        console.error('Error fetching product discount', error);
      }
    );
  }

  clearError(field: string): void {
    delete this.formErrors[field];
  }

}
