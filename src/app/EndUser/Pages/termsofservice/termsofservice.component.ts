import { Component } from '@angular/core';
import { FooterService } from '../../../apiservices/footer.service';
import { termsservice } from '../../../models/termsservice';

@Component({
  selector: 'app-termsofservice',
  templateUrl: './termsofservice.component.html',
  styleUrl: './termsofservice.component.css'
})
export class TermsofserviceComponent {
  termsservice: termsservice[] = [];
  constructor(private serv: FooterService) { }

  ngOnInit(): void {
    this.serv.gettermsservice().subscribe((data: termsservice[]) => {
      this.termsservice = data;
    }, error => {
      console.error('Error fetching terms service.', error);
    });
  }
}
