"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const api_1 = __importDefault(require("./api"));
const dbsql_1 = require("./api/config/dbsql");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API PTUT is responding', code: 200 });
});
app.use('/ptut/api/v1', api_1.default);
const server = (0, http_1.createServer)(app);
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    //updatePrices();
    console.log(`Server running at http://localhost:${PORT}`);
});
process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
        (0, dbsql_1.getPool)().end();
        process.exit(0);
    });
});
