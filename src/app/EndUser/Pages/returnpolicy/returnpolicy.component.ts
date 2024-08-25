import { Component } from '@angular/core';
import { returnpolicy } from '../../../models/returnpolicy';
import { FooterService } from '../../../apiservices/footer.service';

@Component({
  selector: 'app-returnpolicy',
  templateUrl: './returnpolicy.component.html',
  styleUrl: './returnpolicy.component.css'
})
export class ReturnpolicyComponent {
  returnpolicy: returnpolicy[] = [];
  constructor(private serv: FooterService) { }

  ngOnInit(): void {
    this.serv.getReturnPolicy().subscribe((data: returnpolicy[]) => {
      this.returnpolicy = data;
    }, error => {
      console.error('Error fetching return policy.', error);
    });
  }

}
