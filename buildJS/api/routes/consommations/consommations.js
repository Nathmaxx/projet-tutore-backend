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
const helpers_1 = require("../../models/consommations/helpers");
const checkBearerToken_1 = require("../../scripts/checkBearerToken");
const router = (0, express_1.Router)();
router.get("/", checkBearerToken_1.checkBearerToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const consommations = yield helpers_1.ConsommationsHelper.getConsommations();
    if (!consommations) {
        res.status(404).json({ error: "No consommations found" });
        return;
    }
    res.status(200).json(consommations);
}));
router.get("/:id", checkBearerToken_1.checkBearerToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.status(412).json({ error: "Id must be provided" });
        return;
    }
    const consommation = yield helpers_1.ConsommationsHelper.getConsommationById(id);
    if (!consommation) {
        res.status(404).json({ error: `No consommation found with id ${id}` });
        return;
    }
    res.status(200).json(consommation);
}));
router.get("/annee/:annee", checkBearerToken_1.checkBearerToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const annee = parseInt(req.params.annee, 10);
    if (!annee) {
        res.status(412).json({ error: "annee must be provided" });
        return;
    }
    const consommations = yield helpers_1.ConsommationsHelper.getConsommationsByannee(annee);
    if (!consommations || consommations.length === 0) {
        res.status(404).json({ error: `No consommations found for annee ${annee}` });
        return;
    }
    res.status(200).json(consommations);
}));
//route pour recuperer les consommations d'une annee donnée dans une commune donnée
router.get("/commune/:commune/annee/:annee", checkBearerToken_1.checkBearerToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commune = req.params.commune;
    const annee = parseInt(req.params.annee, 10);
    if (!commune || !annee) {
        res.status(412).json({ error: "commune and annee must be provided" });
        return;
    }
    const consommations = yield helpers_1.ConsommationsHelper.getConsommationsByAnneeAndCommune(annee, commune);
    if (!consommations || consommations.length === 0) {
        res.status(404).json({ error: `No consommations found for commune ${commune} and annee ${annee}` });
        return;
    }
    res.status(200).json(consommations);
}));
//route pour recuperer les consommations moyennes d'une annee donnée dans une commune donnée 
router.get("/moyenne/commune/:commune/annee/:annee", checkBearerToken_1.checkBearerToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commune = req.params.commune;
    const annee = parseInt(req.params.annee, 10);
    if (!commune || !annee) {
        res.status(412).json({ error: "commune and annee must be provided" });
        return;
    }
    const consommations = yield helpers_1.ConsommationsHelper.getConsommationsMoyenneByAnneeAndCommune(annee, commune);
    if (!consommations || consommations.length === 0) {
        res.status(404).json({ error: `No consommations found for commune ${commune} and annee ${annee}` });
        return;
    }
    res.status(200).json(consommations);
}));
exports.default = router;
