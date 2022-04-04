import { Express } from "express"
import { buscarIndez } from "./consultas/buscarIndez"

export enum listaRotas {
  INDEX = "/",
  buscarIndez = "/buscar_indez",
}

export const adicionarRotas = (app: Express) => {
  app.post(listaRotas.buscarIndez, (req, res) => {
    buscarIndez(req.body).then((retorno) => {
      res.status(retorno.tipo).json(retorno)
    })
  })
}
