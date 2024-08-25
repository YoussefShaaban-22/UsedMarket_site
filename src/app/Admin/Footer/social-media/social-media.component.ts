import { Component } from '@angular/core';
import { socialLinks } from '../../../models/socialLinks';
import { FooterService } from '../../../apiservices/footer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.css'
})
export class SocialMediaComponent {
  socialLinks: socialLinks[] = [];
  constructor(private serv: FooterService, private route: Router) {

  }
  ngOnInit(): void {
    this.serv.getsocialLinks().subscribe((data: socialLinks[]) => {
      this.socialLinks = data;
    }, error => {
      console.error('Error fetching social Links', error);
    });
  }

  editsocial(id: number): void {
    this.route.navigate(['admin/socialMedia/update', id]);
  }
}
