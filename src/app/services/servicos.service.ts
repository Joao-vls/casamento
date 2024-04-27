import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicos } from '../models/servicos';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  local:string='http://localhost:8080/servicos'

  constructor(private http:HttpClient) { }
  getServicos():Observable<Servicos[]>{
    return this.http.get<Servicos[]>(this.local);
  }
  private botaoClicadoSource = new Subject<void>();
  botaoClicado$ = this.botaoClicadoSource.asObservable();

  emitirBotaoClicado() {
    this.botaoClicadoSource.next();
  }
}
