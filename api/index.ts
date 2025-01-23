import express from 'express';

import consommations from './routes/consommations/consommations';
import parcelles from './routes/parcelles/parcelles';

const router = express.Router();

router.use('/consommations', consommations);
router.use('/parcelles', parcelles);

export default router;