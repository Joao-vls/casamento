import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CasamentoDetalhes } from '../models/casamento-detalhes';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class CasamentoService {

  
  private baseUrl: string = 'http://localhost:8080/casamento/diasmarcados/';
  private planejamentoURL:string= 'http://localhost:8080/casamentos';

  constructor(private http: HttpClient) { }

  getDias(params: Date): Observable<JSON> {
    return this.http.get<JSON>(`${this.baseUrl}${params}`);
  }

  getPlanejamento(params:String):Observable<CasamentoDetalhes[]>{
    console.log(`${this.planejamentoURL}/contratante/${params}`);
    
    return this.http.get<CasamentoDetalhes[]>(`${this.planejamentoURL}/contratante/${params}`);
  }
  postPlanejamento(casamentoSemContrato: CasamentoDetalhes): Observable<CasamentoDetalhes> {
    // Converte o objeto para JSON string
    const jsonBody = JSON.stringify(casamentoSemContrato);
    
    console.log(jsonBody);
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    // Envia a string JSON no corpo do POST
    return this.http.post<CasamentoDetalhes>(`${this.planejamentoURL}/sem-contrato`, jsonBody, { headers });
}

  
}
 