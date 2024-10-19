import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../shared/header/header.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { CarroselComponent } from '../../shared/carrosel/carrosel.component';
import { FooterComponent } from "../../shared/footer/footer.component";
import { CasamentoService } from '../../services/casamento.service';
import { CookiesService } from '../../services/cookies.service';
import { PlanejamentoComponent } from "../../shared/planejamento/planejamento.component";
import { Usuario } from '../../models/usuario';
import { CasamentoDetalhes } from '../../models/casamento-detalhes';
import { Locais } from '../../models/locais';
import { LocaisService } from '../../services/locais.service';
import { PopUpConfirmarComponent } from "../../shared/pop-up-confirmar/pop-up-confirmar.component";
import { FormsModule } from '@angular/forms';
import { CadastroService } from '../../services/planejamento.service';
import { ResponseGenerica } from '../../models/response';
import { ServicosComponent } from "../../shared/servicos/servicos.component";
import { Servicos } from '../../models/servicos';
@Component({
  selector: 'app-contratante',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CarroselComponent, FooterComponent, FormsModule, PlanejamentoComponent, PopUpConfirmarComponent, CommonModule, ServicosComponent],
  templateUrl: './contratante.component.html',
  styleUrl: './contratante.component.css'
})
export class ContratanteComponent {
  protected casamento!: CasamentoDetalhes[];
  protected local!:Locais;
  existe:boolean=false;
  data!:Date;
  novaQuantidadeConvidados: number = 0; 
  vServicos:number=0;
  editar:boolean[]=[false];
  popUp: boolean=false;
  locais?:Locais[];
  dtMin:string;
  contrato!:boolean;
  dtMax:string;
  id!:number;
  selecionarServico!: boolean;
  servicos!:Servicos[];

  constructor(private casamentoAPI:CasamentoService, cookies:CookiesService ,sLocais:LocaisService){
    var usuario:Usuario={
      email:cookies.getCookie('usuario').email,
      nome:cookies.getCookie('usuario').nome
    }
    sLocais.getLocais().subscribe((response: Locais[]) => {
      this.locais = response;
    });
    const currentDat = new Date();
    currentDat.setDate(currentDat.getDate() + 7);
    this.dtMin = currentDat.toISOString().split('T')[0];
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + 100);
    this.dtMax = currentDate.toISOString().split('T')[0];
    casamentoAPI.getPlanejamento(usuario.email as string).subscribe({
      next: (response: CasamentoDetalhes[]) => {
       
        if (response && response.length > 0) {
          const primeiroElemento = response[0];
          casamentoAPI.getCasamento(primeiroElemento.id as number).subscribe({
            next: (response1: ResponseGenerica) => {
              this.contrato = !response1.existe;
            },
            error(err) {
              console.error(err);
            },
          });
          this.casamento = response; 
          
          this.novaQuantidadeConvidados = primeiroElemento.quantidadeConvidados; 
          this.id = primeiroElemento.id as number;
          this.local = primeiroElemento.local as Locais;
          this.data = primeiroElemento.dia;
          this.existe = true; 
          if (primeiroElemento.servicos) {
            this.vServicos= primeiroElemento.servicos.reduce((acc, servico) => acc + servico.valor, 0) 
            this.servicos=primeiroElemento.servicos.map(ti => ti.tipoServico)
            
          }
        } else {
          console.warn('Resposta vazia ou inválida:', response);
        }
      },
      error(err) {
        console.error(err);
      },
    });
    
  
  }
  closeMenu(){
    this.selecionarServico=false;
    document.body.style.overflow = 'auto';
}
  confirmar(eve:boolean){
    return true;
  }
  editLocal(){
    if(this.editar[1] && this.casamento[0].id){
      this.casamentoAPI.patchLocal(this.casamento[0].id,this.local.id).subscribe({
        next: (response) => {
          this.casamento[0]=response;
          this.editar[1]=false
        },
        error: (err) => {
          console.error('Erro ao alterar a quantidade de convidados:', err);
        }
      });
    }else{
      this.editar[1]=true
    }
  }
  editConvidados(quantidade:number){
    if(this.editar[0] && this.casamento[0].id){
      this.casamentoAPI.patchQuantidadeConvidados(this.casamento[0].id,quantidade ).subscribe({
        next: (response) => {
          this.casamento[0]=response;
          this.editar[0]=false
        },
        error: (err) => {
          console.error('Erro ao alterar a quantidade de convidados:', err);
        }
      });
    }else{
      this.editar[0]=true
    }
  }
  editData(){
    if(this.editar[2] && this.casamento[0].id){
      this.casamentoAPI.patchData(this.casamento[0].id,this.data).subscribe({
        next: (response) => {
          this.casamento[0]=response;
          this.editar[2]=false
        },
        error: (err) => {
          console.error('Erro ao alterar a quantidade de convidados:', err);
        }
      });
    }else{
      this.editar[2]=true
    }

  }

}
