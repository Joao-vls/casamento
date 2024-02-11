import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastroService } from '../../services/cadastro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-cadastro-casamento',
  standalone: true,
  templateUrl: './form-cadastro-casamento.component.html',
  styleUrl: './form-cadastro-casamento.component.css',
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export class FormCadastroCasamentoComponent implements OnInit {
  casamento!: FormGroup;

  get noivos() {
    return this.casamento.get('noivos') as FormArray;
  }
  get padrinhos() {
    return this.casamento.get('padrinhos') as FormArray;
  }

  constructor(private formService: CadastroService) { }

  ngOnInit() {
    this.casamento = this.formService.getDynamicForm();
    this.formService.addDynamicInput('noivos', this.casamento);
    this.formService.addDynamicInput('noivos', this.casamento);
    this.formService.addDynamicInput('padrinhos', this.casamento);
    this.formService.addDynamicInput('padrinhos', this.casamento);
  }

  addInput(nome: string) {
    this.formService.addDynamicInput(nome, this.casamento);
  }

  removeInput(index: number) {
    if (this.casamento.value.noivos.length) {
      this.formService.removeDynamicInput(this.casamento, index);
    }
  }

  getFormControl(formControl: AbstractControl, controlName: string): FormControl {
    if (formControl instanceof FormGroup) {
      const control = formControl.get(controlName);
      return control ? control as FormControl : new FormControl();
    }
    return new FormControl();
  }

  onSubmit() {
    // Lógica para manipular o envio do formulário
    if (this.casamento.valid) {
      console.log('Formulário válido, enviar dados...', this.casamento.value);
    } else {
      console.log(this.casamento.value);
      
      console.log('Formulário inválido, corrija os erros.');
    }
  }
}
