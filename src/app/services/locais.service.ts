import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Locais } from '../models/locais';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaisService {

  constructor(private http:HttpClient) { }
  local:string='http://localhost:8080/locais'

  getLocais():Observable<Locais[]>{
    return this.http.get<Locais[]>(this.local);
  }
  getImagensLocal(localId: number): Observable<Locais> {
    return this.http.get<Locais>(`${this.local}/${localId}`);
  }
}
