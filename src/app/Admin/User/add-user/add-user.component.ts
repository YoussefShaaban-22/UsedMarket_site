import { Component } from '@angular/core';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { NavigationExtras, Router } from '@angular/router';
import { user } from '../../../models/user';
import { seller } from '../../../models/seller';
import { SellerService } from '../../../apiservices/seller.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  user_object :any= new user();
  user: any = null;
  userToken: string | null = null;
  sellers: seller[] = [];

  constructor(private serv : AuthApiFunctionService, private Sellerserv: SellerService,private router:Router){

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.user = navigation.extras.state['user'];
    }
  }
  ngOnInit(): void {
    this.Sellerserv.getseller().subscribe((data: seller[]) => {
      this.sellers = data;
    }, error => {
      console.error('Error fetching seller', error);
    });
  }

  send() {
    this.serv.registerstaff(this.user_object).subscribe(data => {
      const navigationExtras: NavigationExtras = {
        state: {
          email: this.user_object.email
        }
      };
      this.router.navigate(['admin'], navigationExtras);
    });
  }

}
