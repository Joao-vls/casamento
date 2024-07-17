
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  @Output() close = new EventEmitter<boolean>(); 
  isActive:boolean=true;
  buttonActive(){
    this.isActive = !this.isActive;
  }
  closeCadastro() {
    this.close.emit();
  }
}
