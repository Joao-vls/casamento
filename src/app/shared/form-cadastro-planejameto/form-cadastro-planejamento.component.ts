import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastroService } from '../../services/planejamento.service';
import { CommonModule } from '@angular/common';
import { LocaisService } from '../../services/locais.service';
import { Locais } from '../../models/locais';
import { Router } from '@angular/router';
import { CasamentoService } from '../../services/casamento.service';
import { CasamentoDetalhes } from '../../models/casamento-detalhes';
import { AcessoService } from '../../services/acesso.service';

@Component({
  selector: 'app-form-cadastro-casamento',
  standalone: true, // Não está definido na documentação do Angular. Possível erro?
  templateUrl: './form-cadastro-planejamento.component.html',
  styleUrl: './form-cadastro-planejamento.component.css',
  imports: [ReactiveFormsModule, FormsModule, CommonModule] // Importa os módulos necessários
})
export class FormCadastroCasamentoComponent implements OnInit {
  casamento!: FormGroup; // Formulário de casamento
  activePadrinhos: boolean = true; // Define se os padrinhos estão ativos ou não
  minData: string; // Data mínima para seleção no calendário
  maxData: string; // Data máxima para seleção no calendário
  localizacao!: Locais[]; // Array de locais
  cidadeSelecionada!: string; // Cidade selecionada
  cidadesRepet: string[] = []; // Array de cidades repetidas
  locais!: Locais[]; // Array de locais
  diasDisponiveis!: JSON;
  @Input() valorTotal!: number; // Valor total do casamento recebido como entrada
  @Output() newItemEvent = new EventEmitter<string>(); // Evento para adicionar novo item
  @Output() newServico = new EventEmitter<boolean>(); // Evento para ativar serviços
  @Output() newCadastro = new EventEmitter<boolean>(); // Evento para ativar cadastro

  // Métodos getters para acessar os controles do formulário
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

  constructor(private formService: CadastroService, private acesso: AcessoService, private locaisg: LocaisService, private router: Router, private casamentoService: CasamentoService) {
    // Inicializa a data mínima e máxima para seleção no calendário
    const currentDat = new Date();
    currentDat.setDate(currentDat.getDate() + 7);
    this.minData = currentDat.toISOString().split('T')[0];
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + 100);
    this.maxData = currentDate.toISOString().split('T')[0];
  }

  // Desativa os padrinhos e remove os inputs dinâmicos de padrinhos
  disablePadrinhos() {
    this.activePadrinhos = false;
    for (let i = this.padrinhos.length - 1; i >= 0; i--) {
      this.removeInput(i, 'padrinhos');
    }
  }

  ngOnInit() {
    // Inicializa o formulário de casamento e adiciona inputs dinâmicos para noivos e padrinhos
    this.casamento = this.formService.getDynamicForm();
    this.formService.addDynamicInput('noivos', this.casamento);
    this.formService.addDynamicInput('noivos', this.casamento);
    this.formService.addDynamicInput('padrinhos', this.casamento);
    this.formService.addDynamicInput('padrinhos', this.casamento);
    this.locaisOptions(); // Carrega as opções de locais
  }

  // Carrega as opções de locais
  locaisOptions() {
    this.locaisg.getLocais().subscribe((response: Locais[]) => {
      this.locais = response;
      this.municipioExiste();
    });
  }

  // Seleciona a opção de cidade
  selectOpitionCidade() {
    this.localizacao = this.locais.filter(loc => {

      return loc.municipio == this.cidade.value;
    });
    console.log(this.localizacao);

  }

  // Seleciona a opção de local e ajusta o limite de convidados
  selectOpitionLocal() {
    const localId = this.local.value; // Obtém o ID do local selecionado
    const localSelecionado = this.locais.find(loc => { console.log(loc.id); return loc.id == localId }); // Busca o local selecionado   
    if (localSelecionado) {
      console.log('Local selecionado:', localSelecionado);
      this.NewLimit(localSelecionado.quantidadeMaxPessoas); // Atualiza o limite de convidados
    }
  }

  // Adiciona um novo input dinâmico
  addInput(nome: string) {
    this.formService.addDynamicInput(nome, this.casamento);
  }

  // Atualiza o limite de convidados com base no local selecionado
  NewLimit(i: number) {
    this.quantidadeConvidados.setValidators([Validators.max(i)]);
    this.quantidadeConvidados.updateValueAndValidity();
  }

  // Remove um input dinâmico
  removeInput(index: number, nameInput: string) {
    if (this.casamento.value.noivos.length > 2 && nameInput == 'noivos') {
      this.formService.removeDynamicInput(this.casamento, index, nameInput);
    } if ((this.casamento.value.padrinhos.length > 2 && nameInput == 'padrinhos') || !this.activePadrinhos) {
      this.formService.removeDynamicInput(this.casamento, index, nameInput);
    }
  }

  // Obtém o FormControl
  getFormControl(formControl: AbstractControl, controlName: string): FormControl {
    if (formControl instanceof FormGroup) {
      const control = formControl.get(controlName);
      return control ? control as FormControl : new FormControl();
    }
    return new FormControl();
  }
  getUsuarioId(): Promise<number | undefined> {
    return new Promise((resolve, reject) => {
      this.acesso.getId().subscribe({
        next: (v) => {
          if (v.id !== undefined) {
            resolve(v.id);
          } else {
            reject('ID não encontrado');
          }
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }
  // Manipula o envio do formulário
  onSubmit() {
    //  this.casamentoService.getDias(this.casamento.value.data).subscribe((response: JSON) => {
    //   this.diasDisponiveis = response;
    //   console.log(this.diasDisponiveis);
    // })
    if (this.casamento.valid) {
      const locs: Locais | undefined = this.locais.find(loc => {
        return loc.id == this.local.value;
      });
      if (!locs) {
        console.error('Local não encontrado');
        return;
      }
      this.getUsuarioId().then(id => {
        console.log(this.casamento.value.padrinhos);
        if (id !== undefined) {
          
          var nomesArray = this.casamento.value.padrinhos.map((padrinho: { nome: String; }) => padrinho.nome);
          const nomesStringp = nomesArray;
          nomesArray = this.casamento.value.noivos.map((noivos: { nome: String; }) => noivos.nome);
          const nomesStringn = nomesArray;
          
          console.log(nomesStringn);
          
          const informacoes: CasamentoDetalhes = {
            noivos: nomesStringn, // Certifique-se de que isso é um array de strings
            padrinhos: nomesStringp, // Certifique-se de que isso é um array de strings
            dia: this.casamento.value.data, // Data no formato correto
            local: locs.id,
            usuario: id,
            quantidadeConvidados: this.casamento.value.quantidadeConvidados,
            valorDoLocalDiaCompra: locs.valor
          };

          console.log(informacoes);

          // Agora, você pode usar 'informacoes' para fazer a requisição
          this.casamentoService.postPlanejamento(informacoes).subscribe({
            next: (v) => {
              const currentUrl = this.router.url;
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentUrl]);
              });
            },
            error: (err) => {
              console.error('Erro ao enviar o planejamento', err);
            }
          });
        } else {
          console.error('Usuário não encontrado');
        }
      }).catch(error => {
        console.error('Erro ao obter ID do usuário:', error);
      });
    } else {
      console.log('Formulário inválido, corrija os erros.');
    }

  }

  // Adiciona um novo item
  addNewItem() {
    this.newItemEvent.emit(this.casamento.value.noivos);
  }

  // Ativa serviços
  activeServicos() {
    this.newServico.emit(true);
  }
  activeCadastro() {
    this.newCadastro.emit(true);
  }

  // Verifica se o município já existe
  municipioExiste() {
    for (let index = 0; index < this.locais.length; index++) {
      let bo: boolean = true;
      for (let i = this.cidadesRepet.length; i >= 0; i--) {
        if (this.cidadesRepet[i] == this.locais[index].municipio) {
          bo = false;
        }
      }
      if (bo) {
        this.cidadesRepet.push(this.locais[index].municipio);
      }
    }
  }

  // Bloqueia a digitação de caracteres inválidos
  blockExponent(e: KeyboardEvent) {
    const charCode = e.key.charCodeAt(0);
    if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-' || e.key === '¨') {
      e.preventDefault();
    }
  }

  // Remove caracteres inválidos de um campo de entrada
  sanitizeInput(event: any): void {
    const input = event.target;
    let value = input.value;

    // Remove acentos, caracteres especiais e letras do valor digitado
    value = value.replace(/[^0-9]/g, '');

    // Atualiza o valor do campo de entrada
    input.value = value;
  }

  // Redireciona para a página de cadastro
  // redirectCadastro(){
  //   this.router.navigate(['/cadastro']);
  // }  
}
