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
const helpers_1 = require("../../models/consommations_industrielles/helpers");
const checkBearerToken_1 = require("../../scripts/checkBearerToken");
const router = (0, express_1.Router)();
// Route pour récupérer toutes les consommations industrielles
router.get("/", checkBearerToken_1.checkBearerToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const consommationsIndustrielles = yield helpers_1.ConsommationsIndustriellesHelper.getConsommationsIndustrielles();
    if ((consommationsIndustrielles === null || consommationsIndustrielles === void 0 ? void 0 : consommationsIndustrielles.length) === 0) {
        res.status(404).json({ error: "No consommations industrielles found" });
        return;
    }
    res.status(200).json(consommationsIndustrielles);
}));
// Route pour récupérer une consommation industrielle par son ID
router.get("/:id", checkBearerToken_1.checkBearerToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.status(412).json({ error: "Id must be provided" });
        return;
    }
    const consommationIndustrielle = yield helpers_1.ConsommationsIndustriellesHelper.getConsommationIndustrielleById(id);
    if ((consommationIndustrielle === null || consommationIndustrielle === void 0 ? void 0 : consommationIndustrielle.length) === 0) {
        res.status(404).json({ error: `No consommation industrielle found with id ${id}` });
        return;
    }
    res.status(200).json(consommationIndustrielle);
}));
//route pour récupérer les consommations industrielles d'une année donnée
router.get("/annee/:annee", checkBearerToken_1.checkBearerToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const annee = parseInt(req.params.annee, 10);
    if (!annee) {
        res.status(412).json({ error: "annee must be provided" });
        return;
    }
    const consommationsIndustrielles = yield helpers_1.ConsommationsIndustriellesHelper.getConsommationsIndustriellesByAnnee(annee);
    if (!consommationsIndustrielles || consommationsIndustrielles.length === 0) {
        res.status(404).json({ error: `No consommations industrielles found for annee ${annee}` });
        return;
    }
    res.status(200).json(consommationsIndustrielles);
}));
// Récupérer les consommations d'une année donnée dans une commune donnée
router.get("/commune/:commune/annee/:annee", checkBearerToken_1.checkBearerToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commune = req.params.commune;
    const annee = parseInt(req.params.annee, 10);
    if (!commune || !annee) {
        res.status(412).json({ error: "commune and annee must be provided" });
        return;
    }
    const consommationsIndustrielles = yield helpers_1.ConsommationsIndustriellesHelper.getConsommationsIndustriellesByCommuneAndAnnee(commune, annee);
    if (!consommationsIndustrielles || consommationsIndustrielles.length === 0) {
        res.status(404).json({ error: `No consommations industrielles found for commune ${commune} and annee ${annee}` });
        return;
    }
    res.status(200).json(consommationsIndustrielles);
}));
exports.default = router;
