import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.BASE_URL}/auth/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.BASE_URL}/auth/login`, data);
  }
}
