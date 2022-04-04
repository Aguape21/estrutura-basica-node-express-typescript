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
      tipo: 500,
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
      tipo: 200,
      dados: consulta[entrada.tipo],
    }
  } else {
    return {
      tipo: 400,
      mensagem: "Não encontrado",
    }
  }
}
