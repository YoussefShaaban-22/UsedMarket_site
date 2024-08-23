import { Component, OnInit } from '@angular/core';
import { AuthApiFunctionService, LoginResponse } from '../../apiservices/auth-api-function.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Corrected 'styleUrl' to 'styleUrls'
})
export class LoginComponent implements OnInit {
  email: string = '';  // Changed 'any' to 'string'
  password: string = '';  // Changed 'any' to 'string'
  formErrors: any = {};
  messageError: any = {};

  constructor(private serv: AuthApiFunctionService, private router: Router) {}

  ngOnInit(): void {}

  send() {
    const loginObject = {
      email: this.email,
      password: this.password
    };

    this.serv.login(loginObject).subscribe((data: LoginResponse) => {
      this.serv.setItem('userToken', data.userToken);
      this.serv.setItem('user', JSON.stringify(data.user));
      if (data.user.user_type === 'admin' || data.user.user_type === 'editor' ||data.user.user_type === 'seo') {
        this.router.navigate(['admin'], { state: { user: data.user.name } });
      } else {
        this.router.navigate([''], { state: { user: data.user } });
      }
    }, error => {
      this.formErrors = error.error.errors || {};
      this.messageError = typeof error.error.message === 'object' ? JSON.stringify(error.error.message) : error.error.message || '';
      console.log(this.messageError);
      console.error('Login failed', error);
    });
  }

  clearError(field: string): void {
    delete this.formErrors[field];
    if (Object.keys(this.formErrors).length === 0) {
      this.messageError = '';
    }
  }
}
