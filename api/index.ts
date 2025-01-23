import express from 'express';

import consommations from './routes/consommations/consommations';
import parcelles from './routes/parcelles/parcelles';
import consommations_industrielles from './routes/consommations_industrielles/consommations_industrielles';

const router = express.Router();

router.use('/consommations', consommations);
router.use('/parcelles', parcelles);
router.use('/consommations_industrielles', consommations_industrielles);

export default router;