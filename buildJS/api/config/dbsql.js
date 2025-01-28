"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQuery = exports.getPool = void 0;
require('dotenv').config();
const mysql2_1 = __importDefault(require("mysql2"));
let pool_instance;
const getPool = () => {
    if (!pool_instance) {
        console.log("Creating new pool");
        pool_instance = mysql2_1.default.createPool({
            connectionLimit: 50,
            connectTimeout: 10000,
            host: process.env.HOST_DB,
            user: process.env.USER_DB,
            password: process.env.PASS_DB,
            database: process.env.NAME_DB,
            port: process.env.PORT_DB ? parseInt(process.env.PORT_DB) : 3306,
        }).promise();
    }
    else {
        console.log("Using existing pool");
    }
    return pool_instance;
};
exports.getPool = getPool;
const executeQuery = (query, params) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    let attempt = 0;
    const maxAttempts = 3;
    while (attempt < maxAttempts) {
        try {
            connection = yield (0, exports.getPool)().getConnection();
            const [rows] = yield connection.query(query, params);
            connection.release();
            return rows;
        }
        catch (error) {
            if (connection)
                connection.release();
            if (error.code === 'ETIMEDOUT') {
                attempt++;
                if (attempt === maxAttempts) {
                    throw error;
                }
                console.log(`Attempt ${attempt} failed. Retrying...`);
            }
            else {
                throw error;
            }
        }
    }
});
exports.executeQuery = executeQuery;
