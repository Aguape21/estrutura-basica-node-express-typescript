/*
    Referencia https://blog.logrocket.com/typescript-with-node-js-and-express/
*/

import express from "express"
import ip from "ip"

const app = express()
const port = 3000

app.get("/", (_req, res) => {
  res.send("Olá mundo!")
})

app.listen(port, () => {
  console.log("[⚡️] Aplicação nos endereços:")
  const enderecos = ["0.0.0.0", "localhost", ip.address()].map(
    (endereco) => `http://${endereco}:${port}`
  )
  console.log(enderecos.join("\n"))
})
