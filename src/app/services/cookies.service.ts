import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  private readonly keyStorageName: string = 'encryptionKey';
  private readonly keyExpiryStorageName: string = 'encryptionKeyExpiry';
  private readonly keyExpiryHours: number = 2;
  private secretKey: string;

  constructor(private cookieService: CookieService) {
    this.secretKey = this.retrieveOrGenerateKey();
  }

  // Gera ou recupera a chave de criptografia, considerando a expiração
  private retrieveOrGenerateKey(): string {
    const expiry = localStorage.getItem(this.keyExpiryStorageName);
    const now = new Date();

    if (expiry && new Date(expiry) > now) {
      const key = localStorage.getItem(this.keyStorageName);
      if (key) {
        return key;
      }
    }

    // Se a chave não existe ou está expirada, gere uma nova
    const newKey = this.generateRandomKey(32);
    const expiryDate = new Date(now.getTime() + this.keyExpiryHours * 60 * 60 * 1000);
    
    localStorage.setItem(this.keyStorageName, newKey);
    localStorage.setItem(this.keyExpiryStorageName, expiryDate.toISOString());

    return newKey;
  }

  // Gera uma chave aleatória
  private generateRandomKey(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Criptografa os dados
  private encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  // Descriptografa os dados
  private decrypt(data: string): string | null {
    try {
      return CryptoJS.AES.decrypt(data, this.secretKey).toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Erro ao descriptografar o cookie', error);
      return null;
    }
  }

  // Gera um hash para o nome do cookie
  private hashCookieName(cookieName: string): string {
    return CryptoJS.SHA256(cookieName).toString();
  }

  // Define um cookie criptografado com expiração de 2 horas
  setCookie(
    cookieName: string,
    data: any,
    expirationHours: number = 2,
    path: string = '/',
    secure: boolean = true,
    sameSite: 'Lax' | 'Strict' | 'None' = 'Lax',
    domain: string = ''
  ): void {
    const serializedData = JSON.stringify(data);
    const encryptedData = this.encrypt(serializedData);
    const hashedCookieName = this.hashCookieName(cookieName);

    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expirationHours * 60 * 60 * 1000);

    this.cookieService.set(
      hashedCookieName,
      encryptedData,
      expirationDate,
      path,
      domain,
      secure,
      sameSite
    );
  }

  // Obtém e descriptografa um cookie
  getCookie(cookieName: string): any | null {
    const hashedCookieName = this.hashCookieName(cookieName);
    const encryptedData = this.cookieService.get(hashedCookieName);

    if (encryptedData) {
      const decryptedData = this.decrypt(encryptedData);
      if (decryptedData) {
        try {
          return JSON.parse(decryptedData);
        } catch (error) {
          console.error('Erro ao fazer o parse do cookie descriptografado', error);
          return null;
        }
      }
    }
    return null;
  }

  // Deleta um cookie específico
  deleteCookie(cookieName: string, path: string = '/', domain: string = ''): void {
    const hashedCookieName = this.hashCookieName(cookieName);
    this.cookieService.delete(hashedCookieName, path, domain);
  }

  // Verifica se o cookie existe
  hasCookie(cookieName: string): boolean {
    const hashedCookieName = this.hashCookieName(cookieName);
    return this.cookieService.check(hashedCookieName);
  }
}