import { Component } from '@angular/core';
import { socialLinks } from '../../../models/socialLinks';
import { FooterService } from '../../../apiservices/footer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-updatesocial',
  templateUrl: './updatesocial.component.html',
  styleUrl: './updatesocial.component.css'
})
export class UpdatesocialComponent {
  id: any;
  socialLink: socialLinks = {
    id: 0, name: '', link: '',status: ''
  };
  formErrors: any = {};

  constructor(private serv: FooterService, private router: Router,
    private activeRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.serv.getsocialLinksById(this.id).subscribe((data: socialLinks) => {
      this.socialLink = data;
    }, error => {
      console.error('Error fetching socialLink', error);
    });

  }

  save(): void {
    this.serv.updatesocialLinks(this.socialLink.id, this.socialLink).subscribe(() => {
      this.router.navigate(['/admin/socialMedia/show']);
    }, error => {
      this.formErrors = error.error.errors;
      console.error(error);
      console.error('Error updating social Link', error);
    });
  }
  clearError(field: string): void {
    delete this.formErrors[field];
  }
}
