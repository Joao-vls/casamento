import { Locais } from "./locais";

export interface CasamentoDetalhes {
  dia: Date;
  local: number; // ID do local
  noivos: string[];
  padrinhos?: string[];
  usuario: number; // ID do usuário
  quantidadeConvidados: number;
  valorDoLocalDiaCompra: number;
}

 