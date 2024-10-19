import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CasamentoService } from '../../services/casamento.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pop-up-convite',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pop-up-convite.component.html',
  styleUrl: './pop-up-convite.component.css'
})
export class PopUpConviteComponent implements OnChanges {
  @Input() ope:boolean=true;
  @Output() fechar=new EventEmitter<boolean>();
  telab:boolean=true;
  nomeConvidado: string = ''; 
  constructor(private casamentoAPI:CasamentoService,private router: Router){
    
  }
  ngOnChanges(): void {
    if (this.ope) {
      this.tela()  
    }
  }
  buttonActive() {
    this.ope = !this.ope;
    document.body.style.overflow = 'auto';
    this.fechar.emit(this.ope)
  }
  tela(){ 
    document.body.style.overflow = 'hidden';
    window.scrollTo({
        top: 50,
        behavior: 'smooth' 
      });
  }
  fecharPop(){
    this.ope = !this.ope;
    document.body.style.overflow = 'auto';
    this.fechar.emit(this.ope)
  }
  downloadPdf() {
    let nome:string=this.nomeConvidado;
    this.casamentoAPI.getCasamentoPdf(nome ).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url); 
    }, error => {
      console.error('Erro ao baixar PDF', error);
    });
  }
}
