import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastroService } from '../../services/cadastro.service';
import { CommonModule } from '@angular/common';
import { LocaisService } from '../../services/locais.service';
import { Locais } from '../../models/locais';


@Component({
  selector: 'app-form-cadastro-casamento',
  standalone: true,
  templateUrl: './form-cadastro-casamento.component.html',
  styleUrl: './form-cadastro-casamento.component.css',
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})


export class FormCadastroCasamentoComponent implements OnInit {

  casamento!: FormGroup;
  activePadrinhos: boolean = true;
  minData: string;
  maxData: string;
  localizacao!:Locais[]
  cidadeSelecionada!:string;
  locais!:Locais[];
  @Output() newItemEvent = new EventEmitter<string>();

  get noivos() {
    return this.casamento.get('noivos') as FormArray;
  }
  get padrinhos() {
    return this.casamento.get('padrinhos') as FormArray;
  }
  get data() {
    return this.casamento.get('data') as FormControl;
  }
  get local() {
    return this.casamento.get('local') as FormControl;
  }
  get quantidadeConvidados() {
    return this.casamento.get('quantidadeConvidados') as FormControl;
  }

  get cidade() {
    return this.casamento.get('cidade') as FormControl;
  }


  constructor(private formService: CadastroService, private locaisg: LocaisService) {
    this.minData = new Date().toISOString().split('T')[0];
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + 100);
    this.maxData = currentDate.toISOString().split('T')[0];
  }
  disablePadrinhos() {
    this.activePadrinhos = false;
  }
  ngOnInit() {
    this.casamento = this.formService.getDynamicForm();
    this.locaisOptions()
    this.formService.addDynamicInput('noivos', this.casamento);
    this.formService.addDynamicInput('noivos', this.casamento);
    this.formService.addDynamicInput('padrinhos', this.casamento);
    this.formService.addDynamicInput('padrinhos', this.casamento);
  }

  locaisOptions() {
    this.locaisg.getLocais().subscribe((response:Locais[]) => {
      this.locais=response; 
    });
  }
  selectOpitionCidade(){
    this.localizacao = this.locais.filter(loc=>{
      return loc.municipio==this.cidade.value
    })
  }
  selectOpitionLocal(){
    if(this.local.value>this.quantidadeConvidados.value){
      
      
    }
  }
  addInput(nome: string) {
    this.formService.addDynamicInput(nome, this.casamento);
  }
  NewLimit(){
    this.quantidadeConvidados.setValidators([Validators.max(200)]);
    this.quantidadeConvidados.updateValueAndValidity();
    console.log(this.quantidadeConvidados.value);
    
  }
  removeInput(index: number, nameInput: string) {
    if (this.casamento.value.noivos.length > 2 && nameInput == 'noivos') {
      this.formService.removeDynamicInput(this.casamento, index, nameInput);
    } if (this.casamento.value.padrinhos.length > 2 && nameInput == 'padrinhos') {
      this.formService.removeDynamicInput(this.casamento, index, nameInput);
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
      //console.log(this.casamento.value, this.data.errors,"<>",this.quantidadeConvidados.errors);

      console.log('Formulário inválido, corrija os erros.');
    }
  }

  addNewItem() {
    this.newItemEvent.emit(this.casamento.value.noivos);
  }



}
