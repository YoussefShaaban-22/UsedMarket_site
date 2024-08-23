import { Component, OnInit } from '@angular/core';
import { user } from '../../models/user';
import { AuthApiFunctionService } from '../../apiservices/auth-api-function.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  user_object :any= new user();
  user: any = null;
  userToken: string | null = null;
  formErrors: any = {};

  constructor(private serv : AuthApiFunctionService, private router:Router){
    this.user_object.user_type = 'customer';
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.user = navigation.extras.state['user'];
    }
  }
  ngOnInit(): void {
  }

  send() {
    this.serv.register(this.user_object).subscribe(data => {
      const navigationExtras: NavigationExtras = {
        state: {
          email: this.user_object.email
        }
      };
      this.router.navigate(['Verify'], navigationExtras);
    }, error => {
      this.formErrors = error.error.errors;

    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }

}
