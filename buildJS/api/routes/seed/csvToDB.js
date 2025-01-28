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
const readCSV_1 = require("../../scripts/readCSV");
const helpers_1 = require("../../models/parcelles/helpers");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (0, readCSV_1.getDataFromCSV)();
    console.log("data", data.length);
    data.forEach((row, index) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(`Ligne ${"index" + 1}:`, row);
        const coordinates = `{ "lat": "${row.latitude}", "lng": "${row.longitude}" }`;
        const updateCoordinates = yield helpers_1.ParcellesHelper.updateCoordinates(row.idParcelle, coordinates);
        console.log("coordinates", coordinates);
    }));
    res.status(200).json({ message: "Fichier CSV chargé avec succès" });
}));
exports.default = router;
