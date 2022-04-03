import { Client } from "./espocrm-api-client"

export const espoCRM = new Client(
  "https://vendas.e-licencie.com.br",
  "API_KEY",
  "95f115b33ffa820f70b1f185edefeeea" // optional, if hmac auth is used
)