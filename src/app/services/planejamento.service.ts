import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  constructor(private fb: FormBuilder) {}

  // Retorna um grupo de formulário dinâmico com controles para vários detalhes do casamento
  getDynamicForm(): FormGroup<{
    noivos: FormArray<FormGroup>;
    padrinhos: FormArray<FormGroup>;
    data: FormControl<Date | null>;
    local: FormControl<string | null>;
    cidade: FormControl<string | null>;
    quantidadeConvidados: FormControl<number | null>;
  }> {
    return this.fb.group({
      noivos: this.fb.array<FormGroup>([]), // Array para detalhes dos noivos
      padrinhos: this.fb.array<FormGroup>([]), // Array para detalhes dos padrinhos
      data: this.fb.control<Date | null>(null, [Validators.required, this.dateValidatorMin, this.dateValidatorMax]), // Controle de data com validadores
      local: this.fb.control<string | null>(null, Validators.required), // Controle de local
      cidade: this.fb.control<string | null>(null, Validators.required), // Controle de cidade
      quantidadeConvidados: this.fb.control<number | null>(null, [Validators.required, Validators.pattern('^[0-9]*$')]), // Controle de número de convidados
    });
  }

  // Cria um grupo de formulário dinâmico para nomes
  createDynamicInputNomes(): FormGroup<{
    nome: FormControl<string | null>;
  }> {
    return this.fb.group({
      nome: this.fb.control<string | null>(null, [Validators.required, Validators.pattern(`^[a-zA-ZÀ-úçÇ ]*$`)]), // Controle de nome com validadores
    });
  }

  // Adiciona um campo de entrada dinâmico para nomes no array de formulários especificado
  addDynamicInput(nome: string, form: FormGroup) {
    const dynamicInputs = form.get(nome) as FormArray; // Obtém o array de formulários pelo nome
    dynamicInputs.push(this.createDynamicInputNomes()); // Adiciona um novo grupo de formulário de entrada dinâmica
  }

  // Remove um campo de entrada dinâmico do array de formulários especificado no índice fornecido
  removeDynamicInput(form: FormGroup, index: number, alvo: string) {
    const dynamicInputs = form.get(alvo) as FormArray; // Obtém o array de formulários pelo nome
    dynamicInputs.removeAt(index); // Remove o grupo de formulários no índice especificado
  }

  // Validador para verificar se a data selecionada é pelo menos 6 dias após a data atual
  dateValidatorMin(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 6);

    return selectedDate > currentDate ? null : { pastDate: true }; // Retorna null se válido, caso contrário retorna um objeto de erro
  }

  // Validador para verificar se a data selecionada é menos de 100 anos no futuro
  dateValidatorMax(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    return selectedDate.getFullYear() < currentDate.getFullYear() + 100 ? null : { dateFuture: true }; // Retorna null se válido, caso contrário retorna um objeto de erro
  }
}
