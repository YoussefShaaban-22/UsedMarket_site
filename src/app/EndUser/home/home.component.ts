import { Component, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { slider } from '../../models/slider';
import { SliderService } from '../../apiservices/slider.service';
import { Router } from '@angular/router';
import { ProductcategoryService } from '../../apiservices/productcategory.service';
import { productcategory } from '../../models/productcategory';
import { homeslider } from '../../models/homeslider';
import { seller } from '../../models/seller';
import { product } from '../../models/product';
import { ProductService } from '../../apiservices/product.service';
import { blog } from '../../models/blog';
import { BlogService } from '../../apiservices/blog.service';
import { blogcategory } from '../../models/blogcategory';
import { brand } from '../../models/brand';
import { SellerService } from '../../apiservices/seller.service';
import { BrandService } from '../../apiservices/brand.service';
import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import { color } from '../../models/color';
import { cart } from '../../models/cart';
import { ColorService } from '../../apiservices/color.service';
import { CartService } from '../../apiservices/cart.service';
import { AuthApiFunctionService } from '../../apiservices/auth-api-function.service';
import { productcolor } from '../../models/productcolor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  sliders: slider[] = [];
  firstImage: slider | undefined;
  category: productcategory[] = [];
  homesliders: homeslider[] = [];
  feature_products: product[] = [];
  Newproducts: product[] = [];
  blogs: blog[] = [];
  blogcategories: blogcategory[] = [];
  sellers: seller[] = [];
  brands: brand[] = [];
  isBrowser: boolean;
  quantity: number = 1;
  entries: { quantity: any; selectedColor: string }[] = [];
  color: color[] = [];
  cart: any = new cart();
  responseMessage: string = '';
  showModal: boolean = false;
  formErrors: any = {};
  user: any = null;
  user_id: any = null;
  productcolors: productcolor[] = [];

  constructor(private Sliderserv: SliderService, private categoryserv: ProductcategoryService,
    private Productserv: ProductService, private blogserv: BlogService, private sellerserv: SellerService,
    private cartserv: CartService, private colorserv: ColorService,private Authserv: AuthApiFunctionService,
    private brandserv: BrandService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const userData = this.Authserv.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.user_id = this.user.id;
    }
  }

  ngOnInit(): void {
    this.Sliderserv.getslider().subscribe((data: slider[]) => {
      this.sliders = data;
      this.firstImage = this.sliders[0];
    }, error => {
      console.error('Error fetching slider', error);
    });

    this.categoryserv.getproductcategory().subscribe((data: productcategory[]) => {
      this.category = data;
    }, error => {
      console.error('Error fetching category', error);
    });

    this.Sliderserv.gethomeslider().subscribe((data: homeslider[]) => {
      this.homesliders = data;
    }, error => {
      console.error('Error fetching homeslider', error);
    });

    this.Productserv.getproduct().subscribe((data: product[]) => {
      this.feature_products = data;
    }, error => {
      console.error('Error fetching products', error);
    });

    this.Productserv.getNewproduct().subscribe((data: product[]) => {
      this.Newproducts = data;
    }, error => {
      console.error('Error fetching products', error);
    });

    this.blogserv.getblog().subscribe((data: blog[]) => {
      this.blogs = data;
    }, error => {
      console.error('Error fetching products', error);
    });

    this.blogserv.getblogCategory().subscribe((data: blogcategory[]) => {
      this.blogcategories = data;
    }, error => {
      console.error('Error fetching products', error);
    });

    this.sellerserv.getseller().subscribe((data: seller[]) => {
      this.sellers = data;
    }, error => {
      console.error('Error fetching sellers', error);
    });

    this.brandserv.getbrand().subscribe((data: brand[]) => {
      this.brands = data;
    }, error => {
      console.error('Error fetching brands', error);
    });

    this.Productserv.getproductcolor().subscribe(
      (data: productcolor[]) => {
        this.productcolors = data;
      },
      error => {
        console.error('Error fetching product categories', error);
      }
    );
  }
  ngAfterViewInit(): void {
    this.initSwiper();
  }

  initSwiper(): void {

    const swiper = new Swiper('.clients-slider', {
      speed: 400,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        575: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      },
      modules: [Navigation, Pagination, Autoplay] // Include Swiper modules
    });
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

  onSubmit(productId: any , productPrice:any) {

    this.entries.forEach(entry => {
      this.cart.user_id = this.user_id;
      this.cart.product_id = productId;
      this.cart.quantity = entry.quantity;
      this.cart.color = entry.selectedColor;
      this.cart.product_price = productPrice;
      this.cart.total_price = (entry.quantity * parseFloat(this.cart.product_price)).toString();

      const cartData = new FormData();
      cartData.append('user_id', this.cart.user_id);
      cartData.append('product_id', this.cart.product_id);
      cartData.append('quantity', this.cart.quantity);
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
  }

  clearError(field: string): void {
    delete this.formErrors[field];
  }
}




