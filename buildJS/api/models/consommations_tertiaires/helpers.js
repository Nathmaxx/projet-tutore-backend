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
exports.ConsommationsTertiairesHelper = void 0;
// models/consommations/helpers.ts
const dbsql_1 = require("../../config/dbsql");
var ConsommationsTertiairesHelper;
(function (ConsommationsTertiairesHelper) {
    // insert into Parcelles(adresse,commune,iris) values ('182 avenue roger salengro', 'Villeurbanne','bah iris');
    ConsommationsTertiairesHelper.getConsommationsTertiaires = () => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations_tertiaires`;
        return yield (0, dbsql_1.executeQuery)(sql);
    });
    ConsommationsTertiairesHelper.getConsommationTertiairesById = (id) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations_tertiaires WHERE id = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [id]);
    });
    ConsommationsTertiairesHelper.createConsommationTertiaires = (consommation) => __awaiter(this, void 0, void 0, function* () {
        const sql = `INSERT INTO consommations_tertiaires SET ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [consommation]);
    });
    ConsommationsTertiairesHelper.updateConsommationTertiaires = (id, consommation) => __awaiter(this, void 0, void 0, function* () {
        const sql = `UPDATE consommations_tertiaires SET ? WHERE id = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [consommation, id]);
    });
    // Récupérer les consommations tertiaires d'une année donnée
    ConsommationsTertiairesHelper.getConsommationsTertiairesByAnnee = (annee) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations_tertiaires WHERE annee = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [annee]);
    });
    // Récupérer les consommations d'une année donnée dans une commune donée
    ConsommationsTertiairesHelper.getConsommationsTertiairesByCommuneAndAnnee = (commune, annee) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations_tertiaires WHERE annee = ? AND commune LIKE ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [annee, `%${commune}%`]);
    });
    ConsommationsTertiairesHelper.getTotalConsoElect = () => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT SUM(t_conso_elec) as total, annee FROM consommations_tertiaires group by annee`;
        return yield (0, dbsql_1.executeQuery)(sql);
    });
    ConsommationsTertiairesHelper.getTotalConsoGaz = () => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT SUM(t_conso_gaz) as total, annee FROM consommations_tertiaires group by annee`;
        return yield (0, dbsql_1.executeQuery)(sql);
    });
})(ConsommationsTertiairesHelper || (exports.ConsommationsTertiairesHelper = ConsommationsTertiairesHelper = {}));
