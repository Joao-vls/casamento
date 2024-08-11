import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-contratante',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './contratante.component.html',
  styleUrl: './contratante.component.css'
})
export class ContratanteComponent {

}
