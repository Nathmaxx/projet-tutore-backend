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
const express_1 = require("express");
const helpers_1 = require("../../models/parcelles/helpers");
const helpers_2 = require("../../models/consommations/helpers");
const helpers_3 = require("../../models/consommations_industrielles/helpers");
const helpers_4 = require("../../models/consommations_residentielles/helpers");
const helpers_5 = require("../../models/consommations_tertiaires/helpers");
const helpers_6 = require("../../models/logement_details/helpers");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const annee = 2020;
    const filteredCommune = ["Lyon 1er Arrondissement", "Lyon 2e Arrondissement", "Lyon 3e Arrondissement", "Lyon 4e Arrondissement", "Lyon 5e Arrondissement", "Lyon 6e Arrondissement", "Lyon 7e Arrondissement", "Lyon 8e Arrondissement", "Lyon 9e Arrondissement"];
    const response = yield fetch(`https://data.grandlyon.com/fr/datapusher/ws/rdata/nrj_energie.nrjcad_parcelles_${annee}/all.json?maxfeatures=-1&start=1&filename=consommations-energetiques-${annee}-a-parcelle-territoire-metropole-lyon`);
    const data = yield response.json();
    const Lyon1erArrondissement = data.values
        .filter((element) => element.commune === "Lyon 1er Arrondissement")
        .slice(0, 300);
    const Lyon2erArrondissement = data.values
        .filter((element) => element.commune === "Lyon 2e Arrondissement")
        .slice(0, 300);
    const Lyon3erArrondissement = data.values
        .filter((element) => element.commune === "Lyon 3e Arrondissement")
        .slice(0, 300);
    const Lyon4erArrondissement = data.values
        .filter((element) => element.commune === "Lyon 4e Arrondissement")
        .slice(0, 300);
    const Lyon5erArrondissement = data.values
        .filter((element) => element.commune === "Lyon 5e Arrondissement")
        .slice(0, 300);
    const Lyon6erArrondissement = data.values
        .filter((element) => element.commune === "Lyon 6e Arrondissement")
        .slice(0, 300);
    const Lyon7erArrondissement = data.values
        .filter((element) => element.commune === "Lyon 7e Arrondissement")
        .slice(0, 300);
    const Lyon8erArrondissement = data.values
        .filter((element) => element.commune === "Lyon 8e Arrondissement")
        .slice(0, 300);
    const Lyon9erArrondissement = data.values
        .filter((element) => element.commune === "Lyon 9e Arrondissement")
        .slice(0, 300);
    const LyonArrondissment = Lyon1erArrondissement.concat(Lyon2erArrondissement, Lyon3erArrondissement, Lyon4erArrondissement, Lyon5erArrondissement, Lyon6erArrondissement, Lyon7erArrondissement, Lyon8erArrondissement, Lyon9erArrondissement);
    LyonArrondissment
        .filter((element) => filteredCommune.includes(element.commune))
        .forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log("element", element);
        const parcelleObject = {
            id_parcelle: element.parcelle,
            adresse: element.adresses,
            insee: element.insee,
            commune: element.commune,
            iris: element.iris,
            gid: element.gid,
            coordinates: '{ "lat": null, "lng": null }'
        };
        const parcelleCreated = yield helpers_1.ParcellesHelper.createParcelle(parcelleObject);
        if (!parcelleCreated) {
            res.status(500).json({ error: "Error while creating parcelle" });
            return;
        }
        const longementObject = {
            id_parcelle: element.parcelle,
            nb_adr_theorique_parcelle: element.nb_adr_theorique_parcelle,
            majic_annee_logement_ancien: element.majic_annee_logement_ancien,
            majic_annee_logement_recent: element.majic_annee_logement_recent,
            majic_nb_logement_parcelle: element.majic_nb_logement_parcelle,
            majic_surf_habitable_parcelle: element.majic_surf_habitable_parcelle,
            annee: annee
        };
        const logementCreated = yield helpers_6.LogementDetailsHelper.createLogementDetails(longementObject);
        if (!logementCreated) {
            res.status(500).json({ error: "Error while creating logement" });
            return;
        }
        const consommationObject = {
            id_parcelle: element.parcelle,
            conso_elec: element.conso_elec,
            conso_gaz: element.conso_gaz,
            conso_rcu: element.conso_rcu,
            mwh_ef: element.mwh_ef,
            mwh_ep: element.mwh_ep,
            pdl_elec: element.pdl_elec,
            pdl_gaz: element.pdl_gaz,
            nb_adresses_livrees: element.nb_adresses_livrees,
            annee: annee
        };
        const consommationCreated = yield helpers_2.ConsommationsHelper.createConsommation(consommationObject);
        if (!consommationCreated) {
            res.status(500).json({ error: "Error while creating consommation" });
            return;
        }
        const consommationIndustrielleObject = {
            id_parcelle: element.parcelle,
            i_conso_elec: element.i_conso_elec,
            i_conso_gaz: element.i_conso_gaz,
            i_conso_rcu: element.i_conso_rcu,
            i_mwh_ef: element.i_mwh_ef,
            i_mwh_ep: element.i_mwh_ep,
            i_pdl_elec: element.i_pdl_elec,
            i_pdl_gaz: element.i_pdl_gaz,
            annee: annee
        };
        const consommationIndustrielleCreated = yield helpers_3.ConsommationsIndustriellesHelper.createConsommationIndustrielle(consommationIndustrielleObject);
        if (!consommationIndustrielleCreated) {
            res.status(500).json({ error: "Error while creating consommation industrielle" });
            return;
        }
        const consommationResidentielleObject = {
            id_parcelle: element.parcelle,
            r_conso_elec: element.r_conso_elec,
            r_conso_gaz: element.r_conso_gaz,
            r_conso_rcu: element.r_conso_rcu,
            r_mwh_ef: element.r_mwh_ef,
            r_mwh_ep: element.r_mwh_ep,
            r_pdl_elec: element.r_pdl_elec,
            r_pdl_gaz: element.r_pdl_gaz,
            r_kwhef_m2: element.r_kwhef_m2,
            r_kwhep_m2: element.r_kwhep_m2,
            r_surface_m2: element.r_surface_m2,
            annee: annee
        };
        const consommationResidentielleCreated = yield helpers_4.ConsommationsResidentiellesHelper.createConsommationResidentielle(consommationResidentielleObject);
        if (!consommationResidentielleCreated) {
            res.status(500).json({ error: "Error while creating consommation residentielle" });
            return;
        }
        const ConsommationsTertiairesType = {
            id_parcelle: element.parcelle,
            t_conso_elec: element.conso_elec,
            t_conso_gaz: element.conso_gaz,
            t_conso_rcu: element.conso_rcu,
            t_mwh_ef: element.mwh_ef,
            t_mwh_ep: element.mwh_ep,
            t_pdl_elec: element.pdl_elec,
            t_pdl_gaz: element.pdl_gaz,
            annee: annee
        };
        const consommationTertiaireCreated = yield helpers_5.ConsommationsTertiairesHelper.createConsommationTertiaires(ConsommationsTertiairesType);
        if (!consommationTertiaireCreated) {
            res.status(500).json({ error: "Error while creating consommation tertiaire" });
            return;
        }
        // console.log("parcelleCreated", parcelleCreated);
    }));
    res.status(200).json({ message: "Hello world", LyonArrondissment: LyonArrondissment.length });
}));
exports.default = router;
