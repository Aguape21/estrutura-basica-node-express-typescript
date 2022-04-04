import { Express } from "express"
import { buscarIndez } from "./consultas/buscarIndez"

export const adicionarRotas = (app: Express) => {
  app.post("/buscar_indez", (req, res) => {
    buscarIndez(req.body).then((retorno) => {
      res.status(retorno.tipo == "erro" ? 500 : 200).json(retorno)
    })
  })
}
