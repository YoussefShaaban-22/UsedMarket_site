import { Component } from '@angular/core';
import { user } from '../../../models/user';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { SellerService } from '../../../apiservices/seller.service';
import { seller } from '../../../models/seller';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {
  users: user[] = [];
  sellers: seller[] = [];
  constructor(private serv: AuthApiFunctionService,private sellerserv: SellerService) {

  }
  ngOnInit(): void {
    this.serv.getuser().subscribe((data: user[]) => {
      this.users = data;
    }, error => {
      console.error('Error fetching seller', error);
    });

    this.sellerserv.getseller().subscribe((data: seller[]) => {
      this.sellers = data;
    }, error => {
      console.error('Error fetching seller', error);
    });
  }
}
