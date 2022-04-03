import { Client } from "./espocrm-api-client"

const client = new Client(
  "https://your-espocrm-site",
  "API_KEY",
  "SECRET_KEY" // optional, if hmac auth is used
)

// POST example

let payload = {
  name: "some name",
}

client
  .request("POST", "Account", payload)
  .then((response) => {
    // success
    console.log(response)
  })
  .catch((response) => {
    // error
    console.log(response.statusCode, response.statusMessage)
  })

// GET example

let params = {
  maxSize: 5,
  where: [
    {
      type: "equals",
      attribute: "type",
      value: "Customer",
    },
  ],
  select: ["id", "name"],
}

client
  .request("GET", "Account", params)
  .then((response) => {
    console.log(response)
  })
  .catch((response) => {
    // error
    console.log(response.statusCode, response.statusMessage)
  })
