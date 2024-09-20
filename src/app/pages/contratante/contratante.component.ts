import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { CarroselComponent } from '../../shared/carrosel/carrosel.component';
import { FooterComponent } from "../../shared/footer/footer.component";
import { CasamentoService } from '../../services/casamento.service';
import { CookiesService } from '../../services/cookies.service';
import { PlanejamentoComponent } from "../../shared/planejamento/planejamento.component";
import { Usuario } from '../../models/usuario';
import { CasamentoDetalhes } from '../../models/casamento-detalhes';

@Component({
  selector: 'app-contratante',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CarroselComponent, FooterComponent, PlanejamentoComponent],
  templateUrl: './contratante.component.html',
  styleUrl: './contratante.component.css'
})
export class ContratanteComponent {
  casamento!: CasamentoDetalhes[];
  constructor(casamentoAPI:CasamentoService, cookies:CookiesService){
    var usuario:Usuario={
      email:cookies.getCookie('usuario').email,
      nome:cookies.getCookie('usuario').nome
    }
     casamentoAPI.getPlanejamento(usuario.email).subscribe((response: CasamentoDetalhes[]) => {
      this.casamento=response;
      console.log(this.casamento);
       
    });
  }


}
