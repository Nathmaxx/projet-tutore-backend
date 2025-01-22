import express from 'express';

import parcelles from './routes/parcelles/parcelles';

const router = express.Router();

router.use('/parcelles', parcelles);

export default router;