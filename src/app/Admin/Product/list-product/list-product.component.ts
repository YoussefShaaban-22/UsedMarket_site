import { Component } from '@angular/core';
import { product } from '../../../models/product';
import { ProductService } from '../../../apiservices/product.service';
import { Router } from '@angular/router';
import { seller } from '../../../models/seller';
import { SellerService } from '../../../apiservices/seller.service';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { user } from '../../../models/user';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {
  products: product[] = [];
  sellers: seller[] = [];
  users: user[] = [];
  page: number = 1;
  user: any = null;
  message: string | null = null;
 
  constructor(private serv: ProductService, private servseller: SellerService,
    private userserv: AuthApiFunctionService, private router: Router) {
    const userData = this.userserv.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }

    if (this.user?.seller_id != null) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state) {
        this.message = navigation.extras.state['message'];
        setTimeout(() => {
          this.message = null;
        }, 7000);
      }
    }
  }

  ngOnInit(): void {
    this.serv.getproduct().subscribe((data: product[]) => {
      this.products = data;
    }, error => {
      console.error('Error fetching product categories', error);
    });
    this.servseller.getseller().subscribe((data: seller[]) => {
      this.sellers = data;
    }, error => {
      console.error('Error fetching product categories', error);
    });
    this.userserv.getuser().subscribe((data: user[]) => {
      this.users = data;
    }, error => {
      console.error('Error fetching product categories', error);
    });


  }
  editproduct(id: number): void {
    this.router.navigate(['admin/product/update', id]);
  }

  deleteproduct(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.serv.deleteproduct(id).subscribe(() => {
        this.products = this.products.filter(product => product.id !== id);
      }, error => {
        console.error('Error deleting product category', error);
      });
    }
  }
}
