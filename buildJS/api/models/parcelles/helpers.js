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
exports.ParcellesHelper = void 0;
const dbsql_1 = require("../../config/dbsql");
var ParcellesHelper;
(function (ParcellesHelper) {
    // insert into parcelles(id_parcelle, adresse,commune,iris) values ("1", '182 avenue roger salengro', 'Villeurbanne','bah iris');
    ParcellesHelper.getParcelles = () => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM parcelles`;
        return yield (0, dbsql_1.executeQuery)(sql);
    });
    ParcellesHelper.getParcelleById = (id) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM parcelles WHERE id_parcelle = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [id]);
    });
    ParcellesHelper.createParcelle = (parcelle) => __awaiter(this, void 0, void 0, function* () {
        const sql = `INSERT IGNORE INTO parcelles SET ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [parcelle]);
    });
    ParcellesHelper.updateParcelle = (id, parcelle) => __awaiter(this, void 0, void 0, function* () {
        const sql = `UPDATE parcelles SET ? WHERE id_parcelle = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [parcelle, id]);
    });
    ParcellesHelper.updateCoordinates = (id, coordinates) => __awaiter(this, void 0, void 0, function* () {
        const sql = `UPDATE parcelles SET coordinates = ? WHERE id_parcelle = ?`;
        const result = yield (0, dbsql_1.executeQuery)(sql, [coordinates, id]);
        return result.affectedRows > 0;
    });
})(ParcellesHelper || (exports.ParcellesHelper = ParcellesHelper = {}));
