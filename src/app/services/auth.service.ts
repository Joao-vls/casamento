import { Injectable } from '@angular/core';
import { CookiesService } from './cookies.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey: string;

  constructor(private cookieService: CookiesService) {
    this.tokenKey = 'authTokenKey';  
  }


  setToken(token: string): void {
    this.cookieService.setCookie(this.tokenKey, token, 2);
  }
  getToken(): string | null {
    return this.cookieService.getCookie(this.tokenKey);
  }
  clearToken(): void {
    this.cookieService.deleteCookie(this.tokenKey);
  }
}