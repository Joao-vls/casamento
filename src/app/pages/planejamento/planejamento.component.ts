import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FormCadastroCasamentoComponent } from "../../shared/form-cadastro-casamento/form-cadastro-casamento.component";
import { CalculoComponent } from "../../shared/calculo/calculo.component";
import { ServicosComponent } from "../../shared/servicos/servicos.component";

@Component({
    selector: 'app-planejamento',
    standalone: true,
    templateUrl: './planejamento.component.html',
    styleUrl: './planejamento.component.css',
    imports: [HeaderComponent, FormCadastroCasamentoComponent, CalculoComponent, ServicosComponent]
})
export class PlanejamentoComponent {
    name:string[]=[];
    addItem(newItem: string) {
        console.log(newItem,12);

        this.name.push(newItem);
        console.log(this.name);
        
      }

}
