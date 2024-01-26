import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FormCadastroCasamentoComponent } from "../../shared/form-cadastro-casamento/form-cadastro-casamento.component";
import { CadastroService } from '../../services/cadastro.service';

@Component({
    selector: 'app-planejamento',
    standalone: true,
    templateUrl: './planejamento.component.html',
    styleUrl: './planejamento.component.css',
    imports: [HeaderComponent, FormCadastroCasamentoComponent]
})
export class PlanejamentoComponent {

}
