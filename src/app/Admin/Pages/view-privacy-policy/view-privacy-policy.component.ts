import { Component } from '@angular/core';
import { privacypolicy } from '../../../models/privacypolicy';
import { FooterService } from '../../../apiservices/footer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-privacy-policy',
  templateUrl: './view-privacy-policy.component.html',
  styleUrl: './view-privacy-policy.component.css'
})
export class ViewPrivacyPolicyComponent {
  privacypolicy: privacypolicy[] = [];
  constructor(private serv: FooterService, private router: Router) { }

  ngOnInit(): void {
    this.serv.getprivacypolicy().subscribe((data: privacypolicy[]) => {
      this.privacypolicy = data;
    }, error => {
      console.error('Error fetching privacy policy.', error);
    });
  }


  editprivacypolicy(id: number): void {
    this.router.navigate(['admin/privacypolicy/update', id]);
  }
}
