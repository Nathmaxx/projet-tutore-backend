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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogementDetailsHelper = void 0;
// models/consommations/helpers.ts
const dbsql_1 = require("../../config/dbsql");
var LogementDetailsHelper;
(function (LogementDetailsHelper) {
    // insert into Parcelles(adresse,commune,iris) values ('182 avenue roger salengro', 'Villeurbanne','bah iris');
    LogementDetailsHelper.getConsommationsTertiaires = () => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM logement_details`;
        return yield (0, dbsql_1.executeQuery)(sql);
    });
    LogementDetailsHelper.getLogementDetailsById = (id) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM logement_details WHERE id = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [id]);
    });
    LogementDetailsHelper.createLogementDetails = (consommation) => __awaiter(this, void 0, void 0, function* () {
        const sql = `INSERT INTO logement_details SET ?`;
        const result = yield (0, dbsql_1.executeQuery)(sql, [consommation]);
        return result.affectedRows > 0;
    });
    LogementDetailsHelper.updateLogementDetails = (id, consommation) => __awaiter(this, void 0, void 0, function* () {
        const sql = `UPDATE logement_details SET ? WHERE id = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [consommation, id]);
    });
})(LogementDetailsHelper || (exports.LogementDetailsHelper = LogementDetailsHelper = {}));
