import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../models/user';


export interface LoginResponse {
  user: {
    user_type: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  userToken: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthApiFunctionService {

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getItem(key: string): any {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    } else {
      console.error('localStorage is not available');
      return null;
    }
  }

  setItem(key: string, value: any): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    } else {
      console.error('localStorage is not available');
    }
  }
  constructor(private http: HttpClient) { }

  getuser() {
    return this.http.get<user[]>("http://127.0.0.1:8000/api/User")
  }
  getUserByEmail(email: any) {
    return this.http.get<user>(`http://127.0.0.1:8000/api/UserByEmail/${email}`)
  }

  register(object: any) {
    return this.http.post("http://127.0.0.1:8000/api/register", object)
  }
  registerstaff(object: any) {
    return this.http.post("http://127.0.0.1:8000/api/registerstaff", object)
  }
  verify(object: any) {
    return this.http.post("http://127.0.0.1:8000/api/verify", object)
  }

  login(object: any) {
    return this.http.post<LoginResponse>("http://127.0.0.1:8000/api/login", object)
  }
  private getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }

  logout() {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://127.0.0.1:8000/api/logout', {}, { headers });
  }
}
