import { Component, ElementRef, ViewChild } from '@angular/core';
import { returnpolicy } from '../../../models/returnpolicy';
import { FooterService } from '../../../apiservices/footer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare const $: any; // Declare jQuery globally

@Component({
  selector: 'app-update-returns-policy',
  templateUrl: './update-returns-policy.component.html',
  styleUrl: './update-returns-policy.component.css'
})
export class UpdateReturnsPolicyComponent {
  id: any;
  returnpolicy: returnpolicy = {
    id: 0, content: ''};

    @ViewChild('descriptionEditor') descriptionEditor!: ElementRef;

    constructor(private serv: FooterService, private router: Router,
      private activeRoute: ActivatedRoute, private http: HttpClient) { }

    ngOnInit(): void {
      this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
      this.serv.getReturnPolicyById(this.id).subscribe((data: returnpolicy) => {
        this.returnpolicy = data;
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
              this.returnpolicy.content = contents;
            }
          }
        }).summernote('code', this.returnpolicy.content);
      }
    }

    save(): void {
      this.serv.updateReturnPolicy(this.returnpolicy.id, this.returnpolicy).subscribe(() => {
        this.router.navigate(['/admin/returnpolicy/show']);
      }, error => {

        console.error('Error adding return policy', error);
      });
    }
}
