import { Response, Request, Router } from "express";
import { ConsommationsResidentiellesHelper } from "../../models/consommations_residentielles/helpers";
import { checkBearerToken } from "../../scripts/checkBearerToken";

const router = Router();

router.get("/", checkBearerToken, async(req: Request, res: Response) => {

  const parcelles = await ConsommationsResidentiellesHelper.getConsommationsResidentielles();

  if(parcelles?.length === 0) {
    res.status(404).json({ error: "No parcelles found" });
    return;
  }

  res.status(200).json(parcelles);
})

router.get("/:id", checkBearerToken, async(req: Request, res: Response) => {

  const id = parseInt(req.params.id);

  if(!id) {
    res.status(412).json({ error: "Id must be a number or provided" });
    return;
  }

  const parcelle = await ConsommationsResidentiellesHelper.getConsommationResidentiellesById(id);

  if(parcelle?.length === 0) {
    res.status(404).json({ error: `No parcelle found with id ${id}` });
    return;
  }

  res.status(200).json(parcelle);
})

export default router;