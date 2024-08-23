import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { user } from '../../models/user';
import { AuthApiFunctionService } from '../../apiservices/auth-api-function.service';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent implements OnInit {
  email: string | null = null;
  user_object: any = new user();
  verification_code: any = '';
  code: any = '';
  formErrors: any = {};

  constructor(private serv: AuthApiFunctionService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.email = navigation.extras.state['email'];
    }
  }

  ngOnInit(): void {
    this.serv.getUserByEmail(this.email).subscribe((data: user) => {
      this.user_object = data;
      this.code = this.user_object.verification_code;
      const emailParams = {
        to_email: this.email,
        to_name: this.user_object.name,
        message: this.user_object.verification_code
      };
      emailjs
        .send('service_uud1ent', 'template_o6ccfzf', emailParams, 'XlCmI9lqluzMIcuJp')
        .then(
          (response: EmailJSResponseStatus) => {
          },
          (error: EmailJSResponseStatus) => {
          }
        );
    }, error => {
      console.error('Error fetching user data', error);
    });
  }

  send() {
    const verifyObject = {
      email: this.email,
      verification_code: this.verification_code
    };

    this.serv.verify(verifyObject).subscribe(data => {
      this.router.navigateByUrl('login');
    }, error => {
      this.formErrors = error.error.errors;
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
