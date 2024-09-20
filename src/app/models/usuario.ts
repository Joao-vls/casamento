
export interface Usuario {
    email: string;
    nome: string;
    id?:number;
    token?: string; // Opcional, para armazenar o token JWT
    casamentoSemContrato?: any;
  }
  