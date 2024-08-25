import { Component } from '@angular/core';
import { FooterService } from '../../../apiservices/footer.service';
import { privacypolicy } from '../../../models/privacypolicy';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrl: './privacypolicy.component.css'
})
export class PrivacypolicyComponent {
  privacypolicy: privacypolicy[] = [];
  constructor(private serv: FooterService) { }

  ngOnInit(): void {
    this.serv.getprivacypolicy().subscribe((data: privacypolicy[]) => {
      this.privacypolicy = data;
    }, error => {
      console.error('Error fetching privacy policy.', error);
    });
  }
}
