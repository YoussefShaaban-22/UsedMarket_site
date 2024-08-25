import { Component } from '@angular/core';
import { termsservice } from '../../../models/termsservice';
import { FooterService } from '../../../apiservices/footer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-terms-service',
  templateUrl: './view-terms-service.component.html',
  styleUrl: './view-terms-service.component.css'
})
export class ViewTermsServiceComponent {
  termsservice: termsservice[] = [];
  constructor(private serv: FooterService, private router: Router) { }

  ngOnInit(): void {
    this.serv.gettermsservice().subscribe((data: termsservice[]) => {
      this.termsservice = data;
    }, error => {
      console.error('Error fetching terms service.', error);
    });
  }

  edittermsservice(id: number): void {
    this.router.navigate(['admin/termsservice/update', id]);
  }
}
