import { type IRouter, Router } from 'express';

import { healthCheck } from '../controllers/healthCheck.controller.js';

const router: IRouter = Router();

router.get('/health', healthCheck);

export default router;
