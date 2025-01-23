import { Response, Request, Router } from "express";
import { ConsommationsHelper } from "../../models/consommations/helpers";
import { checkBearerToken } from "../../scripts/checkBearerToken";

const router = Router();

router.get("/", checkBearerToken, async (req: Request, res: Response) => {
    const consommations = await ConsommationsHelper.getConsommations();
  
    if (!consommations) {
      res.status(404).json({ error: "No consommations found" });
      return;
    }
  
    res.status(200).json(consommations);
  });
  
  router.get("/:id", checkBearerToken, async (req: Request, res: Response) => {
    const id = req.params.id;
  
    if (!id) {
      res.status(412).json({ error: "Id must be provided" });
      return;
    }
  
    const consommation = await ConsommationsHelper.getConsommationById(id);
  
    if (!consommation) {
      res.status(404).json({ error: `No consommation found with id ${id}` });
      return;
    }
  
    res.status(200).json(consommation);
  });

  
  export default router;

