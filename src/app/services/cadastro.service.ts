import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormArray, AbstractControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  constructor(private fb: FormBuilder) {}

  getDynamicForm(): FormGroup {
    return this.fb.group({
      noivos: this.fb.array([]),
      padrinhos:this.fb.array([]),
      data:['',Validators.required,[this.dateValidatorMin,this.dateValidatorMax]],
      local:['',Validators.required],
      cidade:['',Validators.required],
      quantidadeConvidados:['',[Validators.required,Validators.pattern('^[0-9]*$')]],
      
    });
  }
  createDynamicInputNomes(): FormGroup {
    return this.fb.group({
      nome: ['', [Validators.required]],
    });
  }
  addDynamicInput(nome:string,form: FormGroup) {
    const dynamicInputs = form.get(nome) as FormArray;
    dynamicInputs.push(this.createDynamicInputNomes());
  }

  removeDynamicInput(form: FormGroup, index: number,alvo:string) {
    const dynamicInputs = form.get(alvo) as FormArray;
    dynamicInputs.removeAt(index);
  }

  async dateValidatorMin(control:AbstractControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    
    return selectedDate > currentDate ? null : { pastDate:true };
  }
  async dateValidatorMax(control:AbstractControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    console.log(selectedDate.getFullYear() < currentDate.getFullYear()+100);
    return selectedDate.getFullYear() < currentDate.getFullYear()+100 ? null : { pastDate: true };
  }

}
