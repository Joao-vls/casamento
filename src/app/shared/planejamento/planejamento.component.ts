import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { FormCadastroCasamentoComponent } from "../form-cadastro-planejameto/form-cadastro-planejamento.component";
import { CalculoComponent } from "../calculo/calculo.component";
import { ServicosComponent } from "../servicos/servicos.component";
import { Servicos } from '../../models/servicos';
import { ServicosService } from '../../services/servicos.service';
import { CadastroComponent } from "../form-cadastro-usuario/cadastro.component";

@Component({
    selector: 'app-planejamento',
    standalone: true,
    templateUrl: './planejamento.component.html',
    styleUrl: './planejamento.component.css',
    imports: [HeaderComponent, FormCadastroCasamentoComponent, CalculoComponent, ServicosComponent, CommonModule, CadastroComponent]
})
export class PlanejamentoComponent {

    valorTo:number=0
    name: Servicos[] = [];
    selecionarServico!: boolean
    cadastrarUsuario!: boolean
    cadastro!:boolean

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
    menuCadastro(){
        this.cadastro=true;
        document.body.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        window.scrollTo({
            top: 50,
            behavior: 'smooth' // faz a rolagem suavemente
          });
    }
    closeCadastro() {
        this.cadastro=false;
        document.body.style.overflow = 'auto';
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
