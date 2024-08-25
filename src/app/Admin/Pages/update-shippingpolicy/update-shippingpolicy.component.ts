import { Component, ElementRef, ViewChild } from '@angular/core';
import { shippingpolicy } from '../../../models/shippingpolicy';
import { FooterService } from '../../../apiservices/footer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare const $: any; // Declare jQuery globally

@Component({
  selector: 'app-update-shippingpolicy',
  templateUrl: './update-shippingpolicy.component.html',
  styleUrl: './update-shippingpolicy.component.css'
})
export class UpdateShippingpolicyComponent {
  id: any;
  shippingpolicy: shippingpolicy = {
    id: 0, content: ''};

    @ViewChild('descriptionEditor') descriptionEditor!: ElementRef;

    constructor(private serv: FooterService, private router: Router,
      private activeRoute: ActivatedRoute, private http: HttpClient) { }

    ngOnInit(): void {
      this.id = +this.activeRoute.snapshot.paramMap.get('id')!;
      this.serv.getShippingpolicyById(this.id).subscribe((data: shippingpolicy) => {
        this.shippingpolicy = data;
        this.initializeSummernote();
      }, error => {
        console.error('Error fetching shippingpolicy', error);
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
              this.shippingpolicy.content = contents;
            }
          }
        }).summernote('code', this.shippingpolicy.content);
      }
    }

    save(): void {
      this.serv.updateShippingpolicy(this.shippingpolicy.id, this.shippingpolicy).subscribe(() => {
        this.router.navigate(['/admin/shippingpolicy/show']);
      }, error => {

        console.error('Error adding terms of service.', error);
      });
    }
}
