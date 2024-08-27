import { Component } from '@angular/core';
import { ProductcategoryService } from '../../../apiservices/productcategory.service';
import { ProductService } from '../../../apiservices/product.service';
import { ColorService } from '../../../apiservices/color.service';
import { BrandService } from '../../../apiservices/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../../../models/product';
import { productcategory } from '../../../models/productcategory';
import { brand } from '../../../models/brand';
import { color } from '../../../models/color';
import { SellerService } from '../../../apiservices/seller.service';
import { seller } from '../../../models/seller';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { CartService } from '../../../apiservices/cart.service';
import { cart } from '../../../models/cart';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { InquiryService } from '../../../apiservices/inquiry.service';
import { inquiry } from '../../../models/inquiry';
import { NgForm } from '@angular/forms';
import { FeedbackService } from '../../../apiservices/feedback.service';
import { feedback } from '../../../models/feedback';
import { user } from '../../../models/user';
import { ChatService } from '../../../apiservices/chat.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {
  slug: any;
  product: any = new product();
  user: any = null;
  user_id: any = null;
  user_email: any = null;
  user_phone: any = null;
  user_name: any = null;
  user_seller_id: any = null;
  seller_id: any = null;
  category_id: any;
  productcategories: productcategory[] = [];
  products: product[] = [];
  brand: brand[] = [];
  color: color[] = [];
  users: user[] = [];
  feedbacks: feedback[] = [];
  newFeedback: feedback = new feedback();
  seller: any = new seller();
  selectedColor: string = '';
  colorSelections: Array<{ quantity: number, colorId: number }> = [];
  image: string[] = [];
  tags: string[] = [];
  quantity: number = 1;
  entries: { quantity: any; selectedColor: string }[] = [];
  cart: any = new cart();
  responseMessage: string = '';
  showModal: boolean = false;
  formErrors: any = {};
  inquiry: inquiry = new inquiry();

  constructor(private catserv: ProductcategoryService, private productserv: ProductService,
    private brandserv: BrandService, private sellerserv: SellerService, private colorserv: ColorService,
    private cartserv: CartService, private inquiryserv: InquiryService, private feedbackserv: FeedbackService,
    private activeRoute: ActivatedRoute, private router: Router, private Authserv: AuthApiFunctionService,
    private chatService: ChatService) {
    const userData = this.Authserv.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.user_id = this.user.id;
      this.user_email = this.user.email;
      this.user_phone = this.user.phone;
      this.user_name = this.user.name;
      this.user_seller_id=this.user.seller_id;
    }
  }

  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.productserv.getproductByslug(this.slug).subscribe(
        (data: any) => {
          this.product = data;

          if (Array.isArray(this.product.Product.image)) {
            this.image = this.product.Product.image;
          } else {
            console.error('Product image is not an array');
          }

          if (Array.isArray(this.product.Product.tags)) {
            this.tags = this.product.Product.tags;
          } else {
            console.error('Product image is not an array');
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

    this.catserv.getproductcategory().subscribe(
      (data: productcategory[]) => {
        this.productcategories = data;
      },
      error => {
        console.error('Error fetching product categories', error);
      }
    );

    this.brandserv.getbrand().subscribe(
      (data: brand[]) => {
        this.brand = data;
      },
      error => {
        console.error('Error fetching brands', error);
      }
    );

    this.Authserv.getuser().subscribe(
      (data: user[]) => {
        this.users = data;
      },
      error => {
        console.error('Error fetching brands', error);
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
    this.sellerserv.getsellerById(this.product.Product.seller_id).subscribe(
      (data: seller) => {
        this.seller = data;
      },
      error => {
      }
    );

    this.feedbackserv.getFeedbackByProduct(this.product.Product.id).subscribe(
      (data: feedback[]) => {
        this.feedbacks = data;
      },
      error => {
      }
    );
    this.addEntry();

  }

  initiateChat(userId: number): void {
    this.chatService.getOrCreateChat(userId, this.user_id).subscribe(chat => {
      this.router.navigate(['/chat'], { queryParams: { chatId: chat.id } });
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
  increaseQuantity(): void {
    if (this.quantity < this.product.Product.quantity) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  increaseQuantityCart(i: any): void {
    if (this.entries[i].quantity < this.product.Product.quantity) {
      this.entries[i].quantity++;
    }
  }

  decreaseQuantityCart(i: any): void {
    if (this.entries[i].quantity > 1) {
      this.entries[i].quantity--;
    }
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
      modules: [Navigation, Pagination, Autoplay]
    });
  }

  onSubmit() {
    this.entries.forEach(entry => {
      this.cart.user_id = this.user_id;
      this.cart.product_id = this.product.Product.id;
      this.cart.seller_id = this.product.Product.seller_id;
      this.cart.quantity = entry.quantity;
      this.cart.color = entry.selectedColor;
      this.cart.product_price = this.product.Product.price;

      // Apply discount based on quantity
      if (Array.isArray(this.product.Product_discount)) {
        const entryQuantity = this.cart.quantity;
        for (const discount of this.product.Product_discount) {
          if (entryQuantity >= discount.quantity && entryQuantity < discount.To_quantity) {
            this.cart.product_price = this.product.Product.price - (this.product.Product.price * discount.discount);
            break;
          }
        }
      } else {
        console.error('Product discounts are not an array');
      }
      console.log(this.cart.product_price)
      this.cart.total_price = (entry.quantity * this.product.Product.price).toString();

      const cartData = new FormData();
      cartData.append('user_id', this.cart.user_id);
      cartData.append('product_id', this.cart.product_id);
      cartData.append('seller_id', this.cart.seller_id);
      cartData.append('quantity', this.cart.quantity);
      cartData.append('color', this.cart.color);
      cartData.append('product_price', this.cart.product_price);
      cartData.append('total_price', this.cart.total_price);

      this.cartserv.addcart(cartData).subscribe(response => {
        alert(response.message);
        window.location.reload();
      }, error => {
        this.formErrors = error.error.errors;
        console.error(error);

      });
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }

  onSubmitInquiry() {

    this.inquiry.user_email = this.user_email;
    this.inquiry.product_name = this.product.Product.name;
    this.inquiry.user_phone = this.user_phone;

    const inquiryData = new FormData();
    inquiryData.append('user_email', this.inquiry.user_email);
    inquiryData.append('product_name', this.inquiry.product_name);
    inquiryData.append('user_phone', this.inquiry.user_phone);
    inquiryData.append('inquiry', this.inquiry.inquiry);
    if (this.product.Product.seller_id!=null) {
      inquiryData.append('seller_id', this.product.Product.seller_id);
    }
    this.inquiryserv.addinquiry(inquiryData).subscribe(response => {
      alert('Inquiry sent successfully');
      window.location.reload();
    }, error => {
      this.formErrors = error.error.errors;
      console.error(error);

    });
  }

  onSubmitFeedback() {
    this.newFeedback.user_id = this.user_id;
    this.newFeedback.user_name = this.user_name;
    this.newFeedback.product_id = this.product.Product.id;

    const feedbackData = new FormData();
    feedbackData.append('user_id', this.newFeedback.user_id);
    feedbackData.append('user_name', this.newFeedback.user_name);
    feedbackData.append('product_id', this.newFeedback.product_id);
    feedbackData.append('feedback', this.newFeedback.feedback);
    feedbackData.append('rating', this.newFeedback.rating);

    this.feedbackserv.addfeedback(feedbackData).subscribe(response => {
      alert(response.message);
      window.location.reload();
    }, error => {
      this.formErrors = error.error.errors;
      console.error(error);

    });
  }
}
