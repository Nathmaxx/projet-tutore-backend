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
exports.ConsommationsResidentiellesHelper = void 0;
// models/consommations/helpers.ts
const dbsql_1 = require("../../config/dbsql");
var ConsommationsResidentiellesHelper;
(function (ConsommationsResidentiellesHelper) {
    // insert into Parcelles(adresse,commune,iris) values ('182 avenue roger salengro', 'Villeurbanne','bah iris');
    ConsommationsResidentiellesHelper.getConsommationsResidentielles = () => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations_residentielles`;
        return yield (0, dbsql_1.executeQuery)(sql);
    });
    ConsommationsResidentiellesHelper.getConsommationResidentiellesById = (id) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations_residentielles WHERE id = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [id]);
    });
    ConsommationsResidentiellesHelper.createConsommationResidentielle = (consommation) => __awaiter(this, void 0, void 0, function* () {
        const sql = `INSERT INTO consommations_residentielles SET ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [consommation]);
    });
    ConsommationsResidentiellesHelper.updateConsommationResidentielle = (id, consommation) => __awaiter(this, void 0, void 0, function* () {
        const sql = `UPDATE consommations_residentielles SET ? WHERE id = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [consommation, id]);
    });
    // Récupérer les consommations résidentielles d'une année donnée
    ConsommationsResidentiellesHelper.getConsommationsResidentiellesByAnnee = (annee) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations_residentielles WHERE annee = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [annee]);
    });
    // Récupérer les consommations d'une année donnée dans une commune donée 
    ConsommationsResidentiellesHelper.getConsommationsResidentiellesByCommuneAndAnnee = (commune, annee) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations_residentielles WHERE annee = ? AND commune LIKE ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [annee, `%${commune}%`]);
    });
    ConsommationsResidentiellesHelper.getTotalConsoElect = () => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT SUM(r_conso_elec) as total, annee
        FROM consommations_residentielles
        group by annee`;
        return yield (0, dbsql_1.executeQuery)(sql);
    });
    ConsommationsResidentiellesHelper.getTotalConsoGaz = () => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT SUM(r_conso_gaz) as total, annee FROM consommations_residentielles group by annee`;
        return yield (0, dbsql_1.executeQuery)(sql);
    });
})(ConsommationsResidentiellesHelper || (exports.ConsommationsResidentiellesHelper = ConsommationsResidentiellesHelper = {}));
