import express from 'express';

import consommations from './routes/consommations/consommations';
import parcelles from './routes/parcelles/parcelles';
import consommations_industrielles from './routes/consommations_industrielles/consommations_industrielles';
import consommations_residentielles from './routes/consommations_residentielles/consommations_residentielles';

const router = express.Router();

router.use('/consommations', consommations);
router.use('/parcelles', parcelles);
router.use('/consommations_industrielles', consommations_industrielles);
router.use('/consommations_residentielles', consommations_residentielles);

export default router;