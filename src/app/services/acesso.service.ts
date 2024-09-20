import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {
  private apiUrl = 'http://localhost:8080/acesso/users';

  constructor(private http: HttpClient) { }

  createUser(user: { nome: string, email: string, senha: string }): Observable<Usuario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Usuario>(this.apiUrl, user, { headers });
  }
  getId():Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiUrl}/me`);
  }
}
