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
exports.ConsommationsIndustriellesHelper = void 0;
const dbsql_1 = require("../../config/dbsql");
var ConsommationsIndustriellesHelper;
(function (ConsommationsIndustriellesHelper) {
    // Récupérer toutes les consommations industrielles
    ConsommationsIndustriellesHelper.getConsommationsIndustrielles = () => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations_industrielles`;
        return yield (0, dbsql_1.executeQuery)(sql);
    });
    // Récupérer une consommation industrielle par son ID
    ConsommationsIndustriellesHelper.getConsommationIndustrielleById = (id) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations_industrielles WHERE id_consommation_industrielle = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [id]);
    });
    // Créer une nouvelle consommation industrielle
    ConsommationsIndustriellesHelper.createConsommationIndustrielle = (consommation) => __awaiter(this, void 0, void 0, function* () {
        const sql = `INSERT INTO consommations_industrielles SET ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [consommation]);
    });
    // Mettre à jour une consommation industrielle existante
    ConsommationsIndustriellesHelper.updateConsommationIndustrielle = (id, consommation) => __awaiter(this, void 0, void 0, function* () {
        const sql = `UPDATE consommations_industrielles SET ? WHERE id_consommation_industrielle = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [consommation, id]);
    });
    // Récupérer les consommations industrielles d'une année donnée
    ConsommationsIndustriellesHelper.getConsommationsIndustriellesByAnnee = (annee) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations_industrielles WHERE annee = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [annee]);
    });
    //recuperer les consommations industrielles d'une annee dans une commune donnée
    ConsommationsIndustriellesHelper.getConsommationsIndustriellesByCommuneAndAnnee = (commune, annee) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations_industrielles WHERE annee = ? AND commune LIKE ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [annee, `%${commune}%`]);
    });
    ConsommationsIndustriellesHelper.getTotalConsoElect = () => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT SUM(i_conso_elec) as total, annee    
                FROM consommations_industrielles
                group by annee
    `;
        return yield (0, dbsql_1.executeQuery)(sql);
    });
})(ConsommationsIndustriellesHelper || (exports.ConsommationsIndustriellesHelper = ConsommationsIndustriellesHelper = {}));
