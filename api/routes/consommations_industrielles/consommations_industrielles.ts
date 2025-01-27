import { Response, Request, Router } from "express";
import { ConsommationsIndustriellesHelper } from "../../models/consommations_industrielles/helpers";
import { checkBearerToken } from "../../scripts/checkBearerToken";

const router = Router();

// Route pour récupérer toutes les consommations industrielles
router.get("/", checkBearerToken, async (req: Request, res: Response) => {
  const consommationsIndustrielles = await ConsommationsIndustriellesHelper.getConsommationsIndustrielles();

  if (consommationsIndustrielles?.length === 0) {
    res.status(404).json({ error: "No consommations industrielles found" });
    return;
  }

  res.status(200).json(consommationsIndustrielles);
});

// Route pour récupérer une consommation industrielle par son ID
router.get("/:id", checkBearerToken, async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    res.status(412).json({ error: "Id must be provided" });
    return;
  }

  const consommationIndustrielle = await ConsommationsIndustriellesHelper.getConsommationIndustrielleById(id);

  if (consommationIndustrielle?.length === 0) {
    res.status(404).json({ error: `No consommation industrielle found with id ${id}` });
    return;
  }

  res.status(200).json(consommationIndustrielle);
});

//route pour récupérer les consommations industrielles d'une année donnée
router.get("/annee/:annee", checkBearerToken, async (req: Request, res: Response) => {
  const annee = parseInt(req.params.annee, 10);

  if (!annee) {
    res.status(412).json({ error: "annee must be provided" });
    return;
  }

  const consommationsIndustrielles = await ConsommationsIndustriellesHelper.getConsommationsIndustriellesByAnnee(annee);

  if (!consommationsIndustrielles || consommationsIndustrielles.length === 0) {
    res.status(404).json({ error: `No consommations industrielles found for annee ${annee}` });
    return;
  }

  res.status(200).json(consommationsIndustrielles);
});

// Récupérer les consommations d'une année donnée dans une commune donnée
router.get("/commune/:commune/annee/:annee", checkBearerToken, async (req: Request, res: Response) => {
  const commune = req.params.commune;
  const annee = parseInt(req.params.annee, 10);

  if (!commune || !annee) {
    res.status(412).json({ error: "commune and annee must be provided" });
    return;
  }

  const consommationsIndustrielles = await ConsommationsIndustriellesHelper.getConsommationsIndustriellesByCommuneAndAnnee(commune, annee);

  if (!consommationsIndustrielles || consommationsIndustrielles.length === 0) {
    res.status(404).json({ error: `No consommations industrielles found for commune ${commune} and annee ${annee}` });
    return;
  }

  res.status(200).json(consommationsIndustrielles);
});

export default router;
