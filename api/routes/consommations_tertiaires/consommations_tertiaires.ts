import { Response, Request, Router } from "express";
import { ConsommationsTertiairesHelper } from "../../models/consommations_tertiaires/helpers";
import { checkBearerToken } from "../../scripts/checkBearerToken";

const router = Router();

router.get("/", checkBearerToken, async(req: Request, res: Response) => {

  const parcelles = await ConsommationsTertiairesHelper.getConsommationsTertiaires();

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

  const parcelle = await ConsommationsTertiairesHelper.getConsommationTertiairesById(id);

  if(parcelle?.length === 0) {
    res.status(404).json({ error: `No parcelle found with id ${id}` });
    return;
  }

  res.status(200).json(parcelle);
})

//route pour récupérer les consommations tertiaires d'une année donnée
router.get("/annee/:annee", checkBearerToken, async(req: Request, res: Response) => {

  const annee = parseInt(req.params.annee, 10);

  if(!annee) {
    res.status(412).json({ error: "annee must be provided" });
    return;
  }

  const parcelles = await ConsommationsTertiairesHelper.getConsommationsTertiairesByAnnee(annee);

  if(!parcelles || parcelles.length === 0) {
    res.status(404).json({ error: `No parcelles found for annee ${annee}` });
    return;
  }

  res.status(200).json(parcelles);
})
// Récupérer les consommations d'une année donnée dans une commune donée 
router.get("/commune/:commune/annee/:annee", checkBearerToken, async(req: Request, res: Response) => {

  const commune = req.params.commune;
  const annee = parseInt(req.params.annee, 10);

  if(!commune || !annee) {
    res.status(412).json({ error: "commune and annee must be provided" });
    return;
  }

  const parcelles = await ConsommationsTertiairesHelper.getConsommationsTertiairesByCommuneAndAnnee(commune, annee);

  if(!parcelles || parcelles.length === 0) {
    res.status(404).json({ error: `No parcelles found for commune ${commune} and annee ${annee}` });
    return;
  }

  res.status(200).json(parcelles);
})
export default router;