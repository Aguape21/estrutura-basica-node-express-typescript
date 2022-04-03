"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.espoCRM = void 0;
const espocrm_api_client_1 = require("./espocrm-api-client");
exports.espoCRM = new espocrm_api_client_1.Client("https://your-espocrm-site", "API_KEY", "SECRET_KEY" // optional, if hmac auth is used
);
