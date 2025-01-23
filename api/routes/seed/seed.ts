import { Response, Request, Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import { ParcellesType } from "../../models/parcelles/parcelles";
import { ParcellesHelper } from "../../models/parcelles/helpers";

const router = Router();

router.get("/", async(req: Request, res: Response) => {

  const response = await fetch('https://data.grandlyon.com/fr/datapusher/ws/rdata/nrj_energie.nrjcad_parcelles_2020/all.json?maxfeatures=4&start=1&filename=consommations-energetiques-2020-a-parcelle-territoire-metropole-lyon')
  const data = await response.json();

  data.values.forEach(async (element: any) => {
    // console.log("element", element);
    const parcelleObject : ParcellesType = {
      id_parcelle: element.parcelle,
      adresse: element.adresses,
      insee: element.insee,
      commune: element.commune,
      iris: element.iris,
      gid: element.gid,
      coordinates: '{ "lat": "45.764043", "lng": "4.835659" }'
    }
    
    const parcelleCreated = await ParcellesHelper.createParcelle(parcelleObject);
    if(!parcelleCreated) {
      res.status(500).json({ error: "Error while creating parcelle" });
      return;
    }
    // console.log("parcelleCreated", parcelleCreated);
  })


  res.status(200).json({ message: "Hello world", data });
})

export default router;