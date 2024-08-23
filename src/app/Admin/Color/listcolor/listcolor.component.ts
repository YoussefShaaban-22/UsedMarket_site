import { Component } from '@angular/core';
import { color } from '../../../models/color';
import { ColorService } from '../../../apiservices/color.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listcolor',
  templateUrl: './listcolor.component.html',
  styleUrl: './listcolor.component.css'
})
export class ListcolorComponent {
  colors: color[] = [];

  constructor(private serv: ColorService, private route: Router) {

  }
  ngOnInit(): void {
    this.serv.getcolor().subscribe((data: color[]) => {
      this.colors = data;
    }, error => {
      console.error('Error fetching seller', error);
    });
  }

  editcolors(id: number): void {
    this.route.navigate(['admin/color/update', id]);
  }
  deletecolors(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.serv.deletecolor(id).subscribe(() => {
        this.colors = this.colors.filter(color => color.id !== id);
      }, error => {
        console.error('Error deleting colors', error);
      });
    }
  }
}
