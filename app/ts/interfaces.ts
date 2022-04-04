export interface tipoBuscaIndez {
  tipo: "telefone" | "email"
  valor: string
}

export interface tipoRetornoErro {
  tipo: 500|400
  mensagem: string
}

export interface tipoRetornoSucesso {
  tipo: 200
  dados: any
}

export type tipoRetorno = tipoRetornoErro | tipoRetornoSucesso
