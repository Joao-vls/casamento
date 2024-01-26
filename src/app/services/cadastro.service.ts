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
      dynamicInputs: this.fb.array([]),
    });
  }

  getDynamicInputControl(): FormControl {
    return this.fb.control('', Validators.required);
  }

    // Adicione este método para obter a instância do controle diretamente
    getDynamicInputFormControl(): AbstractControl {
      return this.fb.control('', Validators.required);
    }
}
