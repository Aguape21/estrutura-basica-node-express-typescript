import crypto from "crypto"
import httpJs from "https"
import httpsJs from "http"
import { URLSearchParams } from "url"

interface opcoesEspocrm {
  timeout?: any
  port?: number
}

export class Client {
  url: string
  apiKey: string
  secretKey: string
  options: opcoesEspocrm
  urlPath: string
  isHttps: boolean
  constructor(
    url: string,
    apiKey: string,
    secretKey: string,
    options?: opcoesEspocrm
  ) {
    this.url = url
    this.apiKey = apiKey
    this.secretKey = secretKey

    if (this.url.substring(-1) === "/") {
      this.url = this.url.substring(0, this.url.length - 1)
    }

    this.options = options || {}

    this.urlPath = "/api/v1/"
    this.isHttps = url.toLowerCase().indexOf("https") === 0
  }

  request(method: string, action: string, data: any) {
    method = method || "GET"
    method = method.toUpperCase()

    let url = this._buildUrl(action)

    let headers: { [k: string]: string | number } = {}

    if (this.apiKey && this.secretKey) {
      let string = method + " /" + action

      let b2 = crypto
        .createHmac("sha256", this.secretKey)
        .update(string)
        .digest()

      let b1 = Buffer.from(this.apiKey + ":")

      let authPart = Buffer.concat([b1, b2]).toString("base64")

      headers["X-Hmac-Authorization"] = authPart
    } else if (this.apiKey) {
      headers["X-Api-Key"] = this.apiKey
    } else {
      throw new Error("Api-Key is not set.")
    }

    let postData = ""

    if (data) {
      if (method === "GET") {
        url +=
          "?" +
          new URLSearchParams({ searchParams: JSON.stringify(data) }).toString()
      } else {
        postData = JSON.stringify(data)

        headers["Content-Type"] = "application/json"
        headers["Content-Length"] = Buffer.byteLength(postData)
      }
    }

    return new Promise(
      (
        resolve: (r: { data: string; res: httpsJs.IncomingMessage }) => void,
        reject: (e: httpsJs.IncomingMessage | { erro: string }) => void
      ) => {
        let o: {
          headers: {
            [k: string]: any
          }
          method: string
          port?: number
          timeout?: number
        } = {
          headers: headers,
          method: method,
        }

        if (this.options.port) {
          o.port = this.options.port
        }

        if (this.options.timeout) {
          o.timeout = this.options.timeout
        }

        const h = this.isHttps ? httpsJs : httpJs

        const req = h.request(url, o, (res) => {
          let data = ""

          res.on("data", (chunk) => {
            data += chunk
          })

          res.on("end", () => {
            if ((res.statusCode || 0) < 200 || (res.statusCode || 0) > 299) {
              reject(res)

              return
            }

            try {
              data = JSON.parse(data)
            } catch (e) {
              console.error(`Error: Could not parse response`)
              reject({ erro: "Error: Could not parse response" })

              return
            }

            const saida = { data, res }

            resolve(saida)
          })
        })

        req.on("error", (e) => {
          console.error(`Error: ${e.message}`)
          reject({ erro: e.message })
        })

        if (data && method !== "GET") {
          req.write(postData)
        }

        req.end()
      }
    )
  }

  _buildUrl(action: string) {
    return this.url + this.urlPath + action
  }
}

if (module && module.exports) {
  module.exports = Client
}
