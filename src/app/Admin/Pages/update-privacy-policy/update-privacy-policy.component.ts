import { Component, ElementRef, ViewChild } from '@angular/core';
import { privacypolicy } from '../../../models/privacypolicy';
import { FooterService } from '../../../apiservices/footer.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
declare const $: any; // Declare jQuery globally

@Component({
  selector: 'app-update-privacy-policy',
  templateUrl: './update-privacy-policy.component.html',
  styleUrl: './update-privacy-policy.component.css'
})
export class UpdatePrivacyPolicyComponent {
  id: any;
  privacypolicy: privacypolicy = {
    id: 0, content: ''};

    @ViewChild('descriptionEditor') descriptionEditor!: ElementRef;

    constructor(private serv: FooterService, private router: Router,
      private activeRoute: ActivatedRoute, private http: HttpClient) { }

    ngOnInit(): void {
      this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
      this.serv.getprivacypolicyById(this.id).subscribe((data: privacypolicy) => {
        this.privacypolicy = data;
        this.initializeSummernote();
      }, error => {
        console.error('Error fetching blog', error);
      });

    }

    ngAfterViewInit(): void {
      this.initializeSummernote();
    }

    initializeSummernote(): void {
      if (this.descriptionEditor) {
        ($(this.descriptionEditor.nativeElement) as any).summernote({
          height: 300,
          callbacks: {
            onChange: (contents: string) => {
              this.privacypolicy.content = contents;
            }
          }
        }).summernote('code', this.privacypolicy.content);
      }
    }

    save(): void {
      this.serv.updateprivacypolicy(this.privacypolicy.id, this.privacypolicy).subscribe(() => {
        this.router.navigate(['/admin/privacypolicy/show']);
      }, error => {

        console.error('Error adding privacy policy', error);
      });
    }
}
