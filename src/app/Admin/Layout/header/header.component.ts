import { Component, OnInit } from '@angular/core';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userToken: string | null = null;
  user: any = null;
  name: string | null = null;

  constructor(private serv: AuthApiFunctionService, private router: Router) {

  }

  ngOnInit(): void {
    this.userToken = this.serv.getItem('userToken');
    if (this.userToken) {
    }
    const userData = this.serv.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
        this.name = this.user.name;
      }
      this.initializeSidebarToggle();

  }

  logout() {
    this.serv.logout().subscribe(() => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('user');
      this.router.navigateByUrl('login');
    }, error => {
      console.error('Logout failed', error);
    });
  }

  private initializeSidebarToggle(): void {
    const select = (selector: string): HTMLElement | null => {
      return document.querySelector(selector);
    };

    const on = (event: string, selector: string, handler: (event: Event) => void): void => {
      const element = select(selector);
      if (element) {
        element.addEventListener(event, handler);
      }
    };

    if (select('.toggle-sidebar-btn')) {
      on('click', '.toggle-sidebar-btn', (e: Event) => {
        const body = select('body');
        if (body) {
          body.classList.toggle('toggle-sidebar');
        }
      });
    }
  }
}
