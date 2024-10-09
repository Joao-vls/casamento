import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CasamentoDetalhes } from '../models/casamento-detalhes';
import { Usuario } from '../models/usuario';
import { Locais } from '../models/locais';
import { ResponseGenerica } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class CasamentoService {


  private baseUrl: string = 'http://localhost:8080/casamento/diasmarcados/';
  private planejamentoURL: string = 'http://localhost:8080/casamentos';
  private casamentoURL: string = 'http://localhost:8080/casamento';


  constructor(private http: HttpClient,) { }

  getDias(params: Date): Observable<JSON> {
    return this.http.get<JSON>(`${this.baseUrl}${params}`);
  }

  getPlanejamento(params: string): Observable<CasamentoDetalhes[]> {
    console.log(`${this.planejamentoURL}/contratante/${params}`);

    return this.http.get<CasamentoDetalhes[]>(`${this.planejamentoURL}/contratante/${params}`);
  }
  getCasamento(params: number): Observable<ResponseGenerica> {
    return this.http.get<ResponseGenerica>(`${this.casamentoURL}/verificar/${params}`);
  }
  
  postPlanejamento(casamentoSemContrato: CasamentoDetalhes): Observable<CasamentoDetalhes> {
    // Converte o objeto para JSON string
    const jsonBody = JSON.stringify(casamentoSemContrato);

    console.log(jsonBody);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Envia a string JSON no corpo do POST
    return this.http.post<CasamentoDetalhes>(`${this.planejamentoURL}/sem-contrato`, jsonBody, { headers });
  }
  patchQuantidadeConvidados(id: number, quantidadeConvidados: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${this.planejamentoURL}/sem-contrato/${id}/convidados?quantidadeConvidados=${quantidadeConvidados}`, {}, { headers });
  }
  patchLocal(id: number, localId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${this.planejamentoURL}/sem-contrato/${id}/local?localId=${localId}`, {}, { headers });
  }
  patchData(id: number, novaData: Date): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${this.planejamentoURL}/sem-contrato/${id}/data?novaData=${novaData}`, {}, { headers });
  }
  patchPagamento(id:number){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${this.planejamentoURL}/sem-contrato/${id}/confirmar-pagamento`, {}, { headers });
  }

}
