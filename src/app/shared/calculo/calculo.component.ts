import { Component, Input, input } from '@angular/core';
import { PlanejamentoComponent } from '../../pages/planejamento/planejamento.component';
@Component({
  selector: 'app-calculo',
  standalone: true,
  imports: [],
  templateUrl: './calculo.component.html',
  styleUrl: './calculo.component.css'
})
export class CalculoComponent {
  @Input()
  name!:string[]


}
