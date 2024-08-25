import { Component, ElementRef, ViewChild } from '@angular/core';
import { termsservice } from '../../../models/termsservice';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterService } from '../../../apiservices/footer.service';
import { HttpClient } from '@angular/common/http';
declare const $: any; // Declare jQuery globally

@Component({
  selector: 'app-update-terms-service',
  templateUrl: './update-terms-service.component.html',
  styleUrl: './update-terms-service.component.css'
})
export class UpdateTermsServiceComponent {
  id: any;
  termsservice: termsservice = {
    id: 0, content: ''};

    @ViewChild('descriptionEditor') descriptionEditor!: ElementRef;

    constructor(private serv: FooterService, private router: Router,
      private activeRoute: ActivatedRoute, private http: HttpClient) { }

    ngOnInit(): void {
      this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
      this.serv.gettermsserviceById(this.id).subscribe((data: termsservice) => {
        this.termsservice = data;
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
              this.termsservice.content = contents;
            }
          }
        }).summernote('code', this.termsservice.content);
      }
    }

    save(): void {
      this.serv.updatetermsservice(this.termsservice.id, this.termsservice).subscribe(() => {
        this.router.navigate(['/admin/termsservice/show']);
      }, error => {

        console.error('Error adding terms of service.', error);
      });
    }
}
