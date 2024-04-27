import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastroService } from '../../services/cadastro.service';
import { CommonModule } from '@angular/common';
import { LocaisService } from '../../services/locais.service';
import { Locais } from '../../models/locais';
import { ServicosService } from '../../services/servicos.service';


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
  localizacao!: Locais[]
  cidadeSelecionada!: string;
  cidadesRepet:string[]=[];
  locais!: Locais[];
  @Input()  valorTotal!:number;
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() newServico = new EventEmitter<boolean>();
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

  
  constructor(private formService: CadastroService, private locaisg: LocaisService,private dataService: ServicosService) {
    const currentDat = new Date();
    currentDat.setDate(currentDat.getDate() + 7);
    this.minData = currentDat.toISOString().split('T')[0];
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + 100);
    this.maxData = currentDate.toISOString().split('T')[0];
  }
  disablePadrinhos() {
    this.activePadrinhos = false;
    for (let i = this.padrinhos.length - 1; i >= 0; i--) {
      this.removeInput(i, 'padrinhos');
    }

  }
  ngOnInit() {
    this.casamento = this.formService.getDynamicForm();
    this.formService.addDynamicInput('noivos', this.casamento);
    this.formService.addDynamicInput('noivos', this.casamento);
    this.formService.addDynamicInput('padrinhos', this.casamento);
    this.formService.addDynamicInput('padrinhos', this.casamento);
    this.locaisOptions()

  }

  locaisOptions() {
    this.locaisg.getLocais().subscribe((response: Locais[]) => {
      this.locais = response;
      this.municipioExiste()
    });
  }
  selectOpitionCidade() {
    this.localizacao = this.locais.filter(loc => {
      return loc.municipio == this.cidade.value
    })
  }
  selectOpitionLocal() {
    this.NewLimit(this.local.value)
    if (this.local.value > this.quantidadeConvidados.value) {

    }
  }
  addInput(nome: string) {
    this.formService.addDynamicInput(nome, this.casamento);
  }
  NewLimit(i: number) {
    this.quantidadeConvidados.setValidators([Validators.max(i)]);
    this.quantidadeConvidados.updateValueAndValidity();

  }
  removeInput(index: number, nameInput: string) {
    if (this.casamento.value.noivos.length > 2 && nameInput == 'noivos') {
      this.formService.removeDynamicInput(this.casamento, index, nameInput);
    } if ((this.casamento.value.padrinhos.length > 2 && nameInput == 'padrinhos') || !this.activePadrinhos) {

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
      const informacoes={...this.casamento.value,valorTotal : this.valorTotal}
      console.log('Formulário válido, enviar dados...', informacoes);
    } else {
      console.log('Formulário inválido, corrija os erros.');
    }
  }

  addNewItem() {
    this.newItemEvent.emit(this.casamento.value.noivos);
  }
  activeServicos(){
    this.newServico.emit(true)
  }

  municipioExiste() {
    for (let index = 0; index < this.locais.length; index++) {
      let bo:boolean=true;
      for (let i = this.cidadesRepet.length; i >= 0; i--) {
        if(this.cidadesRepet[i]==this.locais[index].municipio){
          bo=false;
        }
      }
        if(bo){
          this.cidadesRepet.push(this.locais[index].municipio);
        }
      } 
    }

    blockExponent(e:KeyboardEvent){
      const charCode = e.key.charCodeAt(0);
      if (e.key === 'e' || e.key === 'E' || e.key==='+'|| e.key==='-'|| e.key==='¨') {
        e.preventDefault();
      }
    }
    sanitizeInput(event: any): void {
      const input = event.target;
      let value = input.value;
  
      // Remove acentos, caracteres especiais e letras do valor digitado
      value = value.replace(/[^0-9]/g, '');
  
      // Atualiza o valor do campo de entrada
      input.value = value;
    }

    
}
