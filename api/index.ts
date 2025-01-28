import express from 'express';

import consommations from './routes/consommations/consommations';
import parcelles from './routes/parcelles/parcelles';
import csv from './routes/seed/csvToDB';
import seed from './routes/seed/seed';
import consommations_industrielles from './routes/consommations_industrielles/consommations_industrielles';
import consommations_residentielles from './routes/consommations_residentielles/consommations_residentielles';
import consommations_tertiaires from './routes/consommations_tertiaires/consommations_tertiaires';

const router = express.Router();

router.use('/consommations', consommations);
router.use('/parcelles', parcelles);
router.use('/seed', seed);
router.use('/read-csv', csv);
router.use('/consommations_industrielles', consommations_industrielles);
router.use('/consommations_residentielles', consommations_residentielles);
router.use('/consommations_tertiaires', consommations_tertiaires );
export default router;