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
      padrinhos:this.fb.array([])
    });
  }

  createDynamicInputNomes(): FormGroup {
    return this.fb.group({
      // Adicione os controles necessários aqui
      nome: ['', [Validators.required]],
    });
  }


  addDynamicInput(nome:string,form: FormGroup) {
    const dynamicInputs = form.get(nome) as FormArray;
    dynamicInputs.push(this.createDynamicInputNomes());
  }

  removeDynamicInput(form: FormGroup, index: number) {
    const dynamicInputs = form.get('noivos') as FormArray;
    dynamicInputs.removeAt(index);
  }
}
