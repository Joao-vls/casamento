import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesServices {

  constructor(private cookieService:CookieService) { }

  setCookie(usuario:Object) {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1); 
    this.cookieService.set('username',usuario.toString() , expireDate, '/', '', true, 'Lax');
  }

  getCookie(){
    return this.cookieService.getAll();
  }

  deleteCookie() {
    this.cookieService.delete('username');
  }
}
