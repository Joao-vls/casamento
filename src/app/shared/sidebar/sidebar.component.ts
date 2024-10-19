import { Component, Input, input, OnChanges, SimpleChanges } from '@angular/core';
import { PopUpConfirmarComponent } from "../pop-up-confirmar/pop-up-confirmar.component";
import { CasamentoService } from '../../services/casamento.service';
import { PopUpConviteComponent } from "../pop-up-convite/pop-up-convite.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PopUpConfirmarComponent, PopUpConviteComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() contratante:boolean=false;
  @Input() id!:number;
  popUp: boolean[]=[];


  confirmar(eve:boolean,i:number){
    this.popUp[i]=eve;
    return true;
  }


  constructor(private casamento:CasamentoService){}
  
  // downloadPdf() {
  //   this.casamento.getCasamentoPdf().subscribe((response: Blob) => {
  //     const blob = new Blob([response], { type: 'application/pdf' });
  //     const url = window.URL.createObjectURL(blob);
  //     window.open(url); // Abre o PDF em uma nova aba
  //   }, error => {
  //     console.error('Erro ao baixar PDF', error);
  //   });
  // }

}
