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
  
  router.get("/annee/:annee", checkBearerToken, async (req: Request, res: Response) => {
    const annee = parseInt(req.params.annee, 10);

    if (!annee) {
      res.status(412).json({ error: "annee must be provided" });
      return;
    }

    const consommations = await ConsommationsHelper.getConsommationsByannee(annee);

    if (!consommations || consommations.length === 0) {
      res.status(404).json({ error: `No consommations found for annee ${annee}` });
      return;
    }

    res.status(200).json(consommations);
  });

  //route pour recuperer les consommations d'une annee donnée dans une commune donnée
  router.get("/commune/:commune/annee/:annee", checkBearerToken, async (req: Request, res: Response) => {
    const commune = req.params.commune;
    const annee = parseInt(req.params.annee, 10);

    if (!commune || !annee) {
      res.status(412).json({ error: "commune and annee must be provided" });
      return;
    }

    const consommations = await ConsommationsHelper.getConsommationsByAnneeAndCommune(annee, commune);

    if (!consommations || consommations.length === 0) {
      res.status(404).json({ error: `No consommations found for commune ${commune} and annee ${annee}` });
      return;
    }

    res.status(200).json(consommations);
  });
  
  export default router;

