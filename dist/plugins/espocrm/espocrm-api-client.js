"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const crypto_1 = __importDefault(require("crypto"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const url_1 = require("url");
class Client {
    constructor(url, apiKey, secretKey, options) {
        this.url = url;
        this.apiKey = apiKey;
        this.secretKey = secretKey;
        if (this.url.substring(-1) === "/") {
            this.url = this.url.substring(0, this.url.length - 1);
        }
        this.options = options || {};
        this.urlPath = "/api/v1/";
        this.isHttps = url.toLowerCase().indexOf("https") === 0;
    }
    request(method, action, data) {
        method = method || "GET";
        method = method.toUpperCase();
        let url = this._buildUrl(action);
        let headers = {};
        if (this.apiKey && this.secretKey) {
            let string = method + " /" + action;
            let b2 = crypto_1.default
                .createHmac("sha256", this.secretKey)
                .update(string)
                .digest();
            let b1 = Buffer.from(this.apiKey + ":");
            let authPart = Buffer.concat([b1, b2]).toString("base64");
            headers["X-Hmac-Authorization"] = authPart;
        }
        else if (this.apiKey) {
            headers["X-Api-Key"] = this.apiKey;
        }
        else {
            throw new Error("Api-Key is not set.");
        }
        let postData = "";
        if (data) {
            if (method === "GET") {
                url +=
                    "?" +
                        new url_1.URLSearchParams({ searchParams: JSON.stringify(data) }).toString();
            }
            else {
                postData = JSON.stringify(data);
                headers["Content-Type"] = "application/json";
                headers["Content-Length"] = Buffer.byteLength(postData);
            }
        }
        return new Promise((resolve, reject) => {
            let o = {
                headers: headers,
                method: method,
            };
            if (this.options.port) {
                o.port = this.options.port;
            }
            if (this.options.timeout) {
                o.timeout = this.options.timeout;
            }
            const h = this.isHttps ? http_1.default : https_1.default;
            const req = h.request(url, o, (res) => {
                let data = "";
                res.on("data", (chunk) => {
                    data += chunk;
                });
                res.on("end", () => {
                    if ((res.statusCode || 0) < 200 || (res.statusCode || 0) > 299) {
                        reject(res);
                        return;
                    }
                    try {
                        data = JSON.parse(data);
                    }
                    catch (e) {
                        console.error(`Error: Could not parse response`);
                        reject({ erro: "Error: Could not parse response" });
                        return;
                    }
                    const saida = { data, res };
                    resolve(saida);
                });
            });
            req.on("error", (e) => {
                console.error(`Error: ${e.message}`);
                reject({ erro: e.message });
            });
            if (data && method !== "GET") {
                req.write(postData);
            }
            req.end();
        });
    }
    _buildUrl(action) {
        return this.url + this.urlPath + action;
    }
}
exports.Client = Client;
if (module && module.exports) {
    module.exports = Client;
}
