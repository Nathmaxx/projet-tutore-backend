"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromCSV = getDataFromCSV;
function getDataFromCSV() {
    const XLSX = require('xlsx');
    // Chemin du fichier CSV
    const filePath = "scraping/conso-elec-geocoded.csv";
    // Charger le fichier CSV
    const workbook = XLSX.readFile(filePath, { type: "file", raw: true });
    // Récupérer la première feuille de calcul
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    // Convertir la feuille en JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    return jsonData;
}
