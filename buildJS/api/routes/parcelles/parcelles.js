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
const checkBearerToken_1 = require("../../scripts/checkBearerToken");
const router = (0, express_1.Router)();
router.get("/annee/:annee", checkBearerToken_1.checkBearerToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const annee = parseInt(req.params.annee, 10);
    if (!annee) {
        res.status(400).json({ error: "Annee is required" });
        return;
    }
    const parcelles = yield helpers_1.ParcellesHelper.getParcelles(annee);
    if (!parcelles) {
        res.status(404).json({ error: "No parcelles found" });
        return;
    }
    res.status(200).json(parcelles);
}));
router.get("/:id", checkBearerToken_1.checkBearerToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("id", id);
    if (!id) {
        res.status(412).json({ error: "Id must be a number or provided" });
        return;
    }
    const parcelle = yield helpers_1.ParcellesHelper.getParcelleById(id);
    if ((parcelle === null || parcelle === void 0 ? void 0 : parcelle.length) === 0) {
        res.status(404).json({ error: `No parcelle found with id ${id}` });
        return;
    }
    res.status(200).json(parcelle);
}));
exports.default = router;
