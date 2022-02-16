"use strict";
/*
    Referencia https://blog.logrocket.com/typescript-with-node-js-and-express/
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ip_1 = __importDefault(require("ip"));
const { networkInterfaces } = require("os");
const app = (0, express_1.default)();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log("[⚡️] Aplicação nos endereços:");
    const enderecos = ["0.0.0.0", "localhost", ip_1.default.address()].map((endereco) => `http://${endereco}:${port}`);
    console.log(enderecos.join("\n"));
});
