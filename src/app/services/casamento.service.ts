import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasamentoService {

  
  private baseUrl: string = 'http://localhost:8080/casamento/diasmarcados/';

  constructor(private http: HttpClient) { }

  getDias(params: Date): Observable<JSON> {
    return this.http.get<JSON>(`${this.baseUrl}${params}`);
  }
  
}
 