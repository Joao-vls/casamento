import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-cadastro-casamento',
  standalone: true,
  templateUrl: './form-cadastro-casamento.component.html',
  styleUrl: './form-cadastro-casamento.component.css',
  imports: [ReactiveFormsModule, FormsModule]
})
export class FormCadastroCasamentoComponent {

  casamentoGroup!: FormGroup;
  mainForm!: FormGroup;
  inputsNoivos: string[] = ['', ''];

  constructor(private fb: FormBuilder, private renderer: Renderer2, private elem: ElementRef) { }

  ngOnInit() {
    this.casamentoGroup = this.fb.group({});
  }

  submit() {
    console.log(this.casamentoGroup.get('noivos')?.value)
  }
  criarNovoInput() {
    let tam = this.inputsNoivos.length;
    for (let index = 0; index < this.inputsNoivos.length; index++) {
      if (this.inputsNoivos[index].length == 0) {
        console.log(this.inputsNoivos);
        tam -= 1;
      }
    }
    if (tam == this.inputsNoivos.length) {
      this.inputsNoivos.push('');
    }
  }
}
