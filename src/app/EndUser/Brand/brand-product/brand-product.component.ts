import { Component } from '@angular/core';
import { productcategory } from '../../../models/productcategory';
import { brand } from '../../../models/brand';
import { cart } from '../../../models/cart';
import { productcolor } from '../../../models/productcolor';
import { product } from '../../../models/product';
import { color } from '../../../models/color';
import { ProductcategoryService } from '../../../apiservices/productcategory.service';
import { ProductService } from '../../../apiservices/product.service';
import { CartService } from '../../../apiservices/cart.service';
import { ColorService } from '../../../apiservices/color.service';
import { BrandService } from '../../../apiservices/brand.service';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { productdiscount } from '../../../models/productdiscount';

@Component({
  selector: 'app-brand-product',
  templateUrl: './brand-product.component.html',
  styleUrl: './brand-product.component.css',
  animations: [
    trigger('expandCollapse', [
      state('expanded', style({
        maxHeight: '200px', /* Adjust as needed */
        opacity: 1
      })),
      state('collapsed', style({
        maxHeight: '0',
        opacity: 0
      })),
      transition('collapsed <=> expanded', [
        animate('0.3s ease')
      ])
    ])
  ]
})
export class BrandProductComponent {
  slug: any;
  brand_id: any;
  brand: any = new brand();
  productcategories: productcategory[] = [];
  color: color[] = [];
  productdiscount: productdiscount[] = [];
  filteredproduct: product[] = [];
  selectedColors: string[] = [];
  isCardBodyVisible = false;
  isCardcolor = false;
  isCardPriceVisible = true;
  price = 0;
  startValue: number = 0;
  endValue: number = 50000;
  quantity: number = 1;
  entries: { quantity: any; selectedColor: string }[] = [];
  cart: any = new cart();
  responseMessage: string = '';
  showModal: boolean = false;
  formErrors: any = {};
  productcolors: productcolor[] = [];
  user: any = null;
  user_id: any = null;
  page: number = 1;

  constructor(private catserv: ProductcategoryService, private productserv: ProductService,
    private brandserv: BrandService, private colorserv: ColorService, private cartserv: CartService,
    private Authserv: AuthApiFunctionService,
    private activeRoute: ActivatedRoute, private router: Router) {
    const userData = this.Authserv.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.user_id = this.user.id;
    }
  }
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.brandserv.getbrandByslug(this.slug).subscribe(
        (data: brand) => {
          this.brand = data;
          this.brand_id = this.brand.id;
        },
        error => {
          console.error('Error fetching products', error);
        }
      );
    });
    if (this.brand_id) {
      this.productserv.getProductsBybrand(this.brand_id).subscribe(
        (data: product[]) => {
          this.filteredproduct = data;
        },
        error => {
          console.error('Error fetching products', error);
        }
      );
    }
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
    this.catserv.getproductcategory().subscribe(
      (data: productcategory[]) => {
        this.productcategories = data;
      },
      error => {
        console.error('Error fetching colors', error);
      }
    );
  }
  toggleCard(): void {
    this.isCardBodyVisible = !this.isCardBodyVisible;
  }

  toggleCardColor(): void {
    this.isCardcolor = !this.isCardcolor;
  }

  toggleCardPrice(): void {
    this.isCardPriceVisible = !this.isCardPriceVisible;
  }
  loadProducts(): void {
    if (this.brand_id) {
      this.productserv.getProductsBybrand(this.brand_id).subscribe(
        (data: product[]) => {
          this.filteredproduct = data;
        },
        error => {
          console.error('Error fetching products', error);
        }
      );
    }
  }

  fetchFilteredProducts(): void {
    if (this.selectedColors.length === 0 && this.startValue === 0) {
      this.loadProducts();
    } else {
      this.productserv.getFilteredProductsBrand(this.brand_id, this.selectedColors, this.startValue, this.endValue).subscribe(
        (data: product[]) => {
          this.filteredproduct = data;
          this.page = 1;
        },
        error => {
          console.error('Error fetching filtered products', error);
        }
      );
    }
  }

  onBrandOrColorChange(): void {
    this.fetchFilteredProducts();
  }
  onColorChange(colorId: string) {
    const index = this.selectedColors.indexOf(colorId);
    if (index > -1) {
      this.selectedColors.splice(index, 1);
    } else {
      this.selectedColors.push(colorId);
    }
    console.log(this.selectedColors);

    this.onBrandOrColorChange();
  }
  onStartThumbChange() {
    this.fetchFilteredProducts();
    console.log('Start thumb value:', this.startValue);
  }

  onEndThumbChange() {
    this.fetchFilteredProducts();
    console.log('End thumb value:', this.endValue);
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
