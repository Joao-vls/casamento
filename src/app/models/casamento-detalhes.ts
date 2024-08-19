export interface CasamentoDetalhes {
    noivos: Noivo[];
    padrinhos?: Padrinho[];
    data: Date; 
    local: string;
    cidade: string;
    quantidadeConvidados: number;
  }
  
  export interface Noivo {
    nome: string;
  }
  
  export interface Padrinho {
    nome: string;
   
  }
  