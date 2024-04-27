import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Servicos } from '../../models/servicos';
import { ServicosService } from '../../services/servicos.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css'
})
export class ServicosComponent implements OnInit {
  ativo: boolean[] = [];
  servicos!: Servicos[];
  @Output() servicosOut= new EventEmitter<Servicos>();
  @Output() close = new EventEmitter<boolean>(); 

  constructor(private tiposServicos: ServicosService) { }


  ativar(i:number,) {
    this.ativo[i] = (this.ativo[i]) ? false : true;
  }

  addServico(i:Servicos){
    this.servicosOut.emit(i);
    this.tiposServicos.emitirBotaoClicado();
    
  }
  closeServicos() {
    this.close.emit();
  }
  ngOnInit(): void {
    this.tiposOptions();
  }
  tiposOptions() {
    this.tiposServicos.getServicos().subscribe((response: Servicos[]) => {
      this.servicos = response;
      
      //this.servicos.push(...response)
    });
  }

}
