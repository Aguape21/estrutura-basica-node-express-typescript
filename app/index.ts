/*
    Referencia https://blog.logrocket.com/typescript-with-node-js-and-express/
*/

import express from "express"
import ip from "ip"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()
const port = 3000

//libera o acesso a todos os dominios
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.get("/", (_req, res) => {
  res.send("🌱")
})

app.listen(port, () => {
  console.log("[⚡️] Aplicação nos endereços:")
  const enderecos = ["0.0.0.0", "localhost", ip.address()].map(
    (endereco) => `http://${endereco}:${port}`
  )
  console.log(enderecos.join("\n"))
})
