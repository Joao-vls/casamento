import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { CommonModule } from '@angular/common';
import { FormCadastroCasamentoComponent } from "../../shared/form-cadastro-casamento/form-cadastro-casamento.component";
import { CalculoComponent } from "../../shared/calculo/calculo.component";
import { ServicosComponent } from "../../shared/servicos/servicos.component";
import { Servicos } from '../../models/servicos';
import { ServicosService } from '../../services/servicos.service';

@Component({
    selector: 'app-planejamento',
    standalone: true,
    templateUrl: './planejamento.component.html',
    styleUrl: './planejamento.component.css',
    imports: [HeaderComponent, FormCadastroCasamentoComponent, CalculoComponent, ServicosComponent,CommonModule]
})
export class PlanejamentoComponent {
    valorTo:number=0
    name: Servicos[] = [];
    selecionarServico!: boolean

    constructor(private dataService: ServicosService) {
      }

    addItem(newItem: string) {
        
    }

    menuServico(){
        this.selecionarServico=true;
        document.body.style.overflow = 'hidden';
        window.scrollTo({
            top: 50,
            behavior: 'smooth' // faz a rolagem suavemente
          });

    }
    closeMenu(){
        this.selecionarServico=false;
        document.body.style.overflow = 'auto';
    }
    calcular(s:Servicos){
        this.name.push(s);
    }
    addValor(e:number){
        this.valorTo=e;
    }

}
