import { Router } from 'express';
import cardRouter from './cardRouter.js';
import purchasesRouter from './purchasesRouter.js';

const router = Router();
router.use(cardRouter);
router.use(purchasesRouter);
export default router;
