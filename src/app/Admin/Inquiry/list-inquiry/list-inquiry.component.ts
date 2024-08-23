import { Component } from '@angular/core';
import { inquiry } from '../../../models/inquiry';
import { InquiryService } from '../../../apiservices/inquiry.service';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { SellerService } from '../../../apiservices/seller.service';
import { seller } from '../../../models/seller';

@Component({
  selector: 'app-list-inquiry',
  templateUrl: './list-inquiry.component.html',
  styleUrl: './list-inquiry.component.css'
})
export class ListInquiryComponent {
  inquiries: inquiry[] = [];
  sellers: seller[] = [];
  user: any = null;

  constructor(private serv: InquiryService,private userserv: AuthApiFunctionService,private sellerserv: SellerService) {

  }
  ngOnInit(): void {
    this.serv.getinquiry().subscribe((data: inquiry[]) => {
      this.inquiries = data;
    }, error => {
      console.error('Error fetching homeslider', error);
    });

    this.sellerserv.getseller().subscribe((data: seller[]) => {
      this.sellers = data;
    }, error => {
      console.error('Error fetching seller', error);
    });

    const userData = this.userserv.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }
}
