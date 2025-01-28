import { Response, Request, Router } from "express";
import { getDataFromCSV } from "../../scripts/readCSV";
import { ParcellesHelper } from "../../models/parcelles/helpers";

const router = Router();

router.get("/", async(req: Request, res: Response) => {
  
  const data = getDataFromCSV();

  console.log("data", data.length);

  data.forEach(async (row: any, index: number) => {
    // console.log(`Ligne ${"index" + 1}:`, row);
    const coordinates = `{ "lat": "${row.latitude}", "lng": "${row.longitude}" }`
    const updateCoordinates = await ParcellesHelper.updateCoordinates(row.idParcelle, coordinates);
    console.log("coordinates", coordinates);
  }); 

  res.status(200).json({ message: "Fichier CSV chargé avec succès" });
});

export default router;