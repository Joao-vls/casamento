import { Injectable } from '@angular/core';
import { CookiesService } from './cookies.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey: string;

  constructor(private cookieService: CookiesService) {
    this.tokenKey = 'authTokenKey';  // Nome da chave para armazenar o token
  }

  // Define o token no cookie com uma duração de 2 horas
  setToken(token: string): void {
    this.cookieService.setCookie(this.tokenKey, token, 2);
  }

  // Obtém o token armazenado no cookie
  getToken(): string | null {
    return this.cookieService.getCookie(this.tokenKey);
  }

  // Remove o token do cookie
  clearToken(): void {
    this.cookieService.deleteCookie(this.tokenKey);
  }
}