import express from 'express';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';
import purchaseSchema from '../schemas/purchaseSchema.js';
import purchases from '../controllers/purchasesController.js';

const purchasesRouter = express.Router();
purchasesRouter.post('/payments', validateSchemaMiddleware(purchaseSchema), purchases);

export default purchasesRouter;
