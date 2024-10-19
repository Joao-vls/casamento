import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  constructor(private fb: FormBuilder) {}

  getDynamicForm(): FormGroup<{
    noivos: FormArray<FormGroup>;
    padrinhos: FormArray<FormGroup>;
    data: FormControl<Date | null>;
    local: FormControl<string | null>;
    cidade: FormControl<string | null>;
    quantidadeConvidados: FormControl<number | null>;
  }> {
    return this.fb.group({
      noivos: this.fb.array<FormGroup>([]), 
      padrinhos: this.fb.array<FormGroup>([]), 
      data: this.fb.control<Date | null>(null, [Validators.required, this.dateValidatorMin, this.dateValidatorMax]), 
      local: this.fb.control<string | null>(null, Validators.required), 
      cidade: this.fb.control<string | null>(null, Validators.required), 
      quantidadeConvidados: this.fb.control<number | null>(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    });
  }

  createDynamicInputNomes(): FormGroup<{
    nome: FormControl<string | null>;
  }> {
    return this.fb.group({
      nome: this.fb.control<string | null>(null, [Validators.required, Validators.pattern(`^[a-zA-ZÀ-úçÇ ]*$`)]), 
    });
  }

  addDynamicInput(nome: string, form: FormGroup) {
    const dynamicInputs = form.get(nome) as FormArray; 
    dynamicInputs.push(this.createDynamicInputNomes()); 
  }

  removeDynamicInput(form: FormGroup, index: number, alvo: string) {
    const dynamicInputs = form.get(alvo) as FormArray; 
    dynamicInputs.removeAt(index);
  }

  dateValidatorMin(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 6);

    return selectedDate > currentDate ? null : { pastDate: true }; 
  }

  dateValidatorMax(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    return selectedDate.getFullYear() < currentDate.getFullYear() + 100 ? null : { dateFuture: true };
  }
}
