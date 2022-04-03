"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.espoCRM = void 0;
const espocrm_api_client_1 = require("./espocrm-api-client");
exports.espoCRM = new espocrm_api_client_1.Client("https://vendas.e-licencie.com.br", "API_KEY", "95f115b33ffa820f70b1f185edefeeea" // optional, if hmac auth is used
);
//# sourceMappingURL=espoCrm.js.map