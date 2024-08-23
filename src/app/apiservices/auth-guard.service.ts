import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userToken = localStorage.getItem('userToken');
    const userData = localStorage.getItem('user');
    if (userToken && userData) {
      const user = JSON.parse(userData);
      if (user.user_type === 'admin'  || user.user_type === 'editor' || user.user_type === 'seo') {
        return true;
      }
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
