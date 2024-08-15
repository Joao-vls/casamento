
export interface Usuario {
    email: string;
    nome: string;
    senha?: string; // Opcional, pois pode não ser necessário em todas as operações
    token?: string; // Opcional, para armazenar o token JWT
    casamentoSemContrato?: any; // Se você precisar incluir informações adicionais
  }
  