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
exports.ConsommationsHelper = void 0;
exports.formatEnergyData = formatEnergyData;
// models/consommations/helpers.ts
const dbsql_1 = require("../../config/dbsql");
var ConsommationsHelper;
(function (ConsommationsHelper) {
    // insert into Parcelles(adresse,commune,iris) values ('182 avenue roger salengro', 'Villeurbanne','bah iris');
    ConsommationsHelper.getConsommations = () => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations`;
        const result = yield (0, dbsql_1.executeQuery)(sql);
        return result.affectedRows > 0;
    });
    ConsommationsHelper.getConsommationById = (id) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations WHERE id = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [id]);
    });
    ConsommationsHelper.createConsommation = (consommation) => __awaiter(this, void 0, void 0, function* () {
        const sql = `INSERT INTO consommations SET ?`;
        const result = yield (0, dbsql_1.executeQuery)(sql, [consommation]);
        return result.affectedRows > 0;
    });
    ConsommationsHelper.updateConsommation = (id, consommation) => __awaiter(this, void 0, void 0, function* () {
        const sql = `UPDATE consommations SET ? WHERE id = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [consommation, id]);
    });
    ConsommationsHelper.getConsommationsByannee = (annee) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations WHERE annee = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [annee]);
    });
    // Récupérer les consommations d'une année donnée dans une commune donnée
    ConsommationsHelper.getConsommationsByAnneeAndCommune = (annee, commune) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM consommations WHERE annee = ? AND commune LIKE ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [annee, `%${commune}%`]);
    });
    //recuperer les consommations moyennes d'une annee donnée dans une commune donnée 
    ConsommationsHelper.getConsommationsMoyenneByAnneeAndCommune = (annee, commune) => __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT AVG(conso_elec) as conso_elec, AVG(conso_gaz) as conso_gaz, AVG(conso_rcu) as conso_rcu, AVG(mwh_ef) as mwh_ef, AVG(mwh_ep) as mwh_ep, AVG(pdl_elec) as pdl_elec, AVG(pdl_gaz) as pdl_gaz, AVG(nb_adresses_livrees) as nb_adresses_livrees FROM consommations WHERE annee = ? AND commune = ?`;
        return yield (0, dbsql_1.executeQuery)(sql, [annee, commune]);
    });
    ConsommationsHelper.getConsoElecGazCommune = () => __awaiter(this, void 0, void 0, function* () {
        const sql = `
            SELECT 
                p.commune,
                c.annee,
                SUM(c.conso_elec) AS total_conso_elec,
                SUM(c.conso_gaz) AS total_conso_gaz
            FROM 
                consommations c
            JOIN 
                parcelles p ON c.id_parcelle = p.id_parcelle
            GROUP BY 
                p.commune, c.annee
            ORDER BY 
                p.commune, c.annee`;
        return yield (0, dbsql_1.executeQuery)(sql);
    });
    ConsommationsHelper.getTotalConsoGazByYear = () => __awaiter(this, void 0, void 0, function* () {
        const sql = `
            SELECT 
                c.annee,
                SUM(c.conso_gaz) AS total_conso_gaz,
                SUM(c.conso_elec) AS total_conso_elec
            FROM 
                consommations c
            GROUP BY 
                c.annee
            ORDER BY 
                c.annee`;
        return yield (0, dbsql_1.executeQuery)(sql);
    });
    ConsommationsHelper.consoSurfacce = () => __awaiter(this, void 0, void 0, function* () {
        const sql = `
        SELECT 
          c.annee,
          SUM(c.conso_elec) AS total_conso_elec,
          SUM(c.conso_gaz) AS total_conso_gaz,
          SUM(ld.majic_surf_habitable_parcelle) AS total_majic_surf_habitable_parcelle,
          SUM(ld.majic_nb_logement_parcelle) AS total_majic_nb_logement_parcelle
        FROM 
            consommations c
        JOIN 
            logement_details ld ON c.id_parcelle = ld.id_parcelle
        GROUP BY 
            c.annee
        ORDER BY 
            c.annee;`;
        return yield (0, dbsql_1.executeQuery)(sql);
    });
})(ConsommationsHelper || (exports.ConsommationsHelper = ConsommationsHelper = {}));
function formatEnergyData(data) {
    // Trier les communes dans l'ordre croissant
    const sortedCommunes = [...new Set(data.map(item => item.commune))].sort();
    return data.reduce((acc, item) => {
        if (!acc[item.annee]) {
            acc[item.annee] = { total_conso_elec: [], total_conso_gaz: [] };
        }
        // Trouver l'index de la commune pour l'insérer dans le bon ordre
        const communeIndex = sortedCommunes.indexOf(item.commune);
        acc[item.annee].total_conso_elec[communeIndex] = item.total_conso_elec;
        acc[item.annee].total_conso_gaz[communeIndex] = item.total_conso_gaz;
        acc.labels = sortedCommunes;
        return acc;
    }, {});
}
