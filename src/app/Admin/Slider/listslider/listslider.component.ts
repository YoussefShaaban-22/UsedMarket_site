import { Component } from '@angular/core';
import { SliderService } from '../../../apiservices/slider.service';
import { Router } from '@angular/router';
import { slider } from '../../../models/slider';

@Component({
  selector: 'app-listslider',
  templateUrl: './listslider.component.html',
  styleUrl: './listslider.component.css'
})
export class ListsliderComponent {
  sliders: slider[] = [];

  constructor(private serv: SliderService, private route: Router) {

  }
  ngOnInit(): void {
    this.serv.getslider().subscribe((data: slider[]) => {
      this.sliders = data;
    }, error => {
      console.error('Error fetching slider', error);
    });
  }

  editslider(id: number): void {
    this.route.navigate(['admin/slider/update', id]);
  }
  deleteslider(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.serv.deleteslider(id).subscribe(() => {
        this.sliders = this.sliders.filter(slider => slider.id !== id);
      }, error => {
        console.error('Error deleting slider', error);
      });
    }
  }
}
