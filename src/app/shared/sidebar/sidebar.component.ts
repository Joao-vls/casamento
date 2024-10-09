import { Component, Input, input, OnChanges, SimpleChanges } from '@angular/core';
import { PopUpConfirmarComponent } from "../pop-up-confirmar/pop-up-confirmar.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PopUpConfirmarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnChanges {
  @Input() contratante:boolean=false;
  @Input() id!:number;
  popUp: boolean=false;
  confirmar(eve:boolean){
    this.popUp=eve;
    return true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contratante']) {
      const valorAtual = changes['contratante'].currentValue;
    }
  }

}
