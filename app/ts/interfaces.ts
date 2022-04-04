export interface tipoBuscaIndez {
  tipo: "telefone" | "email"
  valor: string
}

export interface tipoRetornoErro {
  tipo: "erro"
  mensagem: string
}

export interface tipoRetornoSucesso {
  tipo: "sucesso"
  dados: any
}

export type tipoRetorno = tipoRetornoErro | tipoRetornoSucesso
