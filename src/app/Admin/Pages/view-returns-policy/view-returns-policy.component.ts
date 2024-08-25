import { Component } from '@angular/core';
import { returnpolicy } from '../../../models/returnpolicy';
import { FooterService } from '../../../apiservices/footer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-returns-policy',
  templateUrl: './view-returns-policy.component.html',
  styleUrl: './view-returns-policy.component.css'
})
export class ViewReturnsPolicyComponent {
  returnpolicy: returnpolicy[] = [];
  constructor(private serv: FooterService, private router: Router) { }

  ngOnInit(): void {
    this.serv.getReturnPolicy().subscribe((data: returnpolicy[]) => {
      this.returnpolicy = data;
    }, error => {
      console.error('Error fetching return policy.', error);
    });
  }

  editreturnpolicy(id: number): void {
    this.router.navigate(['admin/returnpolicy/update', id]);
  }
}
