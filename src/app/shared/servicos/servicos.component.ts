import { Component, EventEmitter, Input, input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Servicos } from '../../models/servicos';
import { ServicosService } from '../../services/servicos.service';
import { CommonModule } from '@angular/common';
import { CasamentoService } from '../../services/casamento.service';
import { CookiesService } from '../../services/cookies.service';
import { AcessoService } from '../../services/acesso.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css'
})
export class ServicosComponent implements OnInit,OnChanges {
  ativo: boolean[] = [];
  servicos!: Servicos[];
  @Input() servicosSele: Servicos[]=[];
  servicosEscolhidos: Servicos[]=[];
  valor:number=0
  @Input() id!:number;
  @Input() tel:boolean=false;
  @Output() close = new EventEmitter<boolean>(); 
  adicionados: boolean[]=[];

  constructor(private tiposServicos: ServicosService,private casamento:CasamentoService) { 

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tel){
    this.tela()
    }
  }
  tela(){
    document.body.style.overflow = 'hidden';
    window.scrollTo({
        top: 50,
        behavior: 'smooth' 
      });
      this.servicosSele.forEach(element => { 
        this.addServico(element,element.id-1);
      });
      
  }
  ativar(i:number) {
    this.ativo[i] = (this.ativo[i]) ? false : true;
  }

  addServico(i:Servicos,i2:number){
    this.adicionados[i2] = true;
   this.servicosEscolhidos.push(i);
    this.valor=this.servicosEscolhidos.reduce((acc, servico) => acc + servico.valor, 0)    
  }
  closeServicos() {
    this.close.emit();
  }
  ngOnInit(): void {
    this.tiposOptions();
  }
  tiposOptions() {
    this.tiposServicos.getServicos().subscribe((response: Servicos[]) => {
      this.servicos = response;
    });
  }
  removerServico(i:number,index: number) {
    this.adicionados[index] = false;
    this.servicosEscolhidos = this.servicosEscolhidos.filter(servico => servico.id != i);
      
    this.valor=this.servicosEscolhidos.reduce((acc, servico) => acc + servico.valor, 0)
  }
  patchServicos(){
    let nu:number[]= this.servicosEscolhidos.map(ob => ob.id);
    
    this.casamento.adicionarServicos(this.id,nu).subscribe(
      {
        next(){
          window.location.reload();
        }
      }
    )

    this.closeServicos()

  }
}
