import { prisma } from "../banco/prisma"
import { tipoBuscaIndez, tipoRetorno } from "../ts/interfaces"

export const buscarIndez = async (
  entrada?: tipoBuscaIndez | null
): Promise<tipoRetorno> => {
  const validar =
    entrada && typeof entrada == "object" && entrada.tipo && entrada.valor
      ? true
      : false

  if (!validar || !entrada) {
    return {
      tipo: "erro",
      mensagem: "Entrada inválida",
    }
  }

  const consulta = await prisma.contas.findFirst({
    where: {
      [entrada.tipo]: entrada.valor,
    },
  })
  if (consulta) {
    return {
      tipo: "sucesso",
      dados: consulta[entrada.tipo],
    }
  } else {
    return {
      tipo: "erro",
      mensagem: "Não encontrado",
    }
  }
}
