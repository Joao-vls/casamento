import { Locais } from "./locais";
import { Servicos } from "./servicos";

export interface CasamentoDetalhes {
  id?:number;
  dia: Date;
  local: number | Locais;
  noivos: string[];
  padrinhos?: string[];
  usuario: number;
  quantidadeConvidados: number;
  servicos?:TipoServico[]
  valorDoLocalDiaCompra: number;
}
export interface TipoServico{
id:number;
tipoServico:Servicos
valor:number;
}
 