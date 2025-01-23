import express from 'express';

import consommations from './routes/consommations/consommations';
import parcelles from './routes/parcelles/parcelles';
import seed from './routes/seed/seed';

const router = express.Router();

router.use('/consommations', consommations);
router.use('/parcelles', parcelles);
router.use('/seed', seed);

export default router;