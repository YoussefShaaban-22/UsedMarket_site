import { Component } from '@angular/core';
import { information } from '../../../models/information';
import { Router } from '@angular/router';
import { FooterService } from '../../../apiservices/footer.service';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrl: './view-info.component.css'
})
export class ViewInfoComponent {
  informations: information[] = [];
  constructor(private serv: FooterService, private route: Router) {

  }
  ngOnInit(): void {
    this.serv.getinformation().subscribe((data: information[]) => {
      this.informations = data;
    }, error => {
      console.error('Error fetching information', error);
    });
  }

  editinformation(id: number): void {
    this.route.navigate(['admin/information/update', id]);
  }
}
