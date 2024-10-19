import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Servicos } from '../../models/servicos';
import { ServicosService } from '../../services/servicos.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-calculo',
  standalone: true,
  imports: [],
  templateUrl: './calculo.component.html',
  styleUrl: './calculo.component.css'
})
export class CalculoComponent {
  @Input()
  name!: Servicos[]
  @Output() valorTotal = new EventEmitter <number>();
  numero: number = 0;
  

  constructor(private eventService: ServicosService){
    
  }


  somaValores() {
    this.numero=0
    for (let index = 0; index < this.name.length; index++) {
      this.numero += this.name[index].valor;
    }
    this.valorTotal.emit(this.numero);
  }

  removerValor(i:number) {
    
   
  }

}
