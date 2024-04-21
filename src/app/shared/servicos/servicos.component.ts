import { Component } from '@angular/core';
import { Servicos } from './servicos';
@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css'
})
export class ServicosComponent {
  ativo:boolean[]=[]
  ativar(){
    this.ativo[0]=true;
  }
  desativar(){
    this.ativo[0]=false;
  }
}
