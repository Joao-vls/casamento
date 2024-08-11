import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey: string;

  constructor() {
    this.tokenKey = this.generateOrRetrieveTokenKey();
  }

  private generateOrRetrieveTokenKey(): string {
    const storedKey = localStorage.getItem('authTokenKey');
    if (storedKey) {
      return storedKey;
    } else {
      const newKey = this.generateRandomKey(32); // 32 caracteres para uma chave forte
      localStorage.setItem('authTokenKey', newKey);
      return newKey;
    }
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  generateRandomKey(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

