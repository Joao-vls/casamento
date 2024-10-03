import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {
  @Input() ope:boolean=true;
  @Output() fechar=new EventEmitter<boolean>();
  
  buttonActive() {
    this.ope = !this.ope;
    document.body.style.overflow = 'auto';
    this.fechar.emit(this.ope)
  }
  tela(){
    document.body.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    window.scrollTo({
        top: 50,
        behavior: 'smooth' // faz a rolagem suavemente
      });
  }
}
