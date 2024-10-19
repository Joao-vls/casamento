import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Servicos } from '../models/servicos';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  local:string='http://localhost:8080/servicos'

  constructor(private http:HttpClient ) { }
  getServicos():Observable<Servicos[]>{
    return this.http.get<Servicos[]>(this.local);
  }

  
  
}
