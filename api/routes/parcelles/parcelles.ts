import { Response, Request, Router } from "express";
import { ParcellesHelper } from "../../models/parcelles/helpers";
import { checkBearerToken } from "../../scripts/checkBearerToken";

const router = Router();

router.get("/annee/:annee", checkBearerToken, async(req: Request, res: Response) => {

  const annee = parseInt(req.params.annee as string, 10);

  if (!annee) {
    res.status(400).json({ error: "Annee is required" });
    return;
  }

  const parcelles = await ParcellesHelper.getParcelles(annee);

  if (!parcelles) {
    res.status(404).json({ error: "No parcelles found" });
    return;
  }

  res.status(200).json(parcelles);
})

router.get("/:id", checkBearerToken, async(req: Request, res: Response) => {

  const { id } = req.params;

  console.log("id", id);

  if(!id) {
    res.status(412).json({ error: "Id must be a number or provided" });
    return;
  }

  const parcelle = await ParcellesHelper.getParcelleById(id);

  if(parcelle?.length === 0) {
    res.status(404).json({ error: `No parcelle found with id ${id}` });
    return;
  }

  res.status(200).json(parcelle);
})


export default router;