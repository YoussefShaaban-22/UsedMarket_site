import { Component } from '@angular/core';
import { homeslider } from '../../../models/homeslider';
import { SliderService } from '../../../apiservices/slider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-home-slider',
  templateUrl: './list-home-slider.component.html',
  styleUrl: './list-home-slider.component.css'
})
export class ListHomeSliderComponent {
  homesliders: homeslider[] = [];
  constructor(private serv: SliderService, private route: Router) {

  }
  ngOnInit(): void {
    this.serv.gethomeslider().subscribe((data: homeslider[]) => {
      this.homesliders = data;
    }, error => {
      console.error('Error fetching homeslider', error);
    });
  }

  edithomeslider(id: number): void {
    this.route.navigate(['admin/homeslider/update', id]);
  }
  deletehomeslider(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.serv.deletehomeslider(id).subscribe(() => {
        this.homesliders = this.homesliders.filter(homeslider => homeslider.id !== id);
      }, error => {
        console.error('Error deleting homeslider', error);
      });
    }
  }
}
