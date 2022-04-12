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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
//libera o acesso a todos os dominios
app.use((0, cors_1.default)());
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded());
// parse application/json
app.use(body_parser_1.default.json());
app.get("/", (_req, res) => {
    res.send("🌱");
});
app.listen(port, () => {
    console.log("[⚡️] Aplicação nos endereços:");
    const enderecos = ["0.0.0.0", "localhost", ip_1.default.address()].map((endereco) => `http://${endereco}:${port}`);
    console.log(enderecos.join("\n"));
});
//# sourceMappingURL=index.js.map