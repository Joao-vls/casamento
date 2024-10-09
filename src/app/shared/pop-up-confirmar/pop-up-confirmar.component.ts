import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CasamentoService } from '../../services/casamento.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpConfirmarComponent {
  @Input() ope:boolean=true;
  @Input() id!:number;
  @Output() fechar=new EventEmitter<boolean>();

  constructor(private casamentoAPI:CasamentoService,private router: Router){

  }
  
  buttonActive() {
    this.ope = !this.ope;
    document.body.style.overflow = 'auto';
    this.fechar.emit(this.ope)
    this.casamentoAPI.patchPagamento(this.id).subscribe({
      next:(v)=>{
        this.router.navigate([this.router.url])
        .then(() => {
          window.location.reload(); // Isso força a recarga completa da página
        });
      }
    })
  }
  tela(){
    document.body.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    window.scrollTo({
        top: 50,
        behavior: 'smooth' // faz a rolagem suavemente
      });
  }
  fecharPop(){
    this.ope = !this.ope;
    document.body.style.overflow = 'auto';
    this.fechar.emit(this.ope)
  }
}
