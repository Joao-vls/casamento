import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { CarroselComponent } from '../../shared/carrosel/carrosel.component';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-contratante',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CarroselComponent, FooterComponent],
  templateUrl: './contratante.component.html',
  styleUrl: './contratante.component.css'
})
export class ContratanteComponent {
casamento: boolean=true;

}
