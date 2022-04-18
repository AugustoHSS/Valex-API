import express from 'express';
import {
  createCard, activateCard, getAllTransactions, rechargeCard,
} from '../controllers/cardController.js';
import newCardSchema from '../schemas/newCardSchema.js';
import activateCardSchema from '../schemas/activateCardSchema.js';
import rechargeCardSchema from '../schemas/rechargeCardSchema.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';

const cardRouter = express.Router();
cardRouter.post('/create-card', validateSchemaMiddleware(newCardSchema), createCard);
cardRouter.put('/activate-card', validateSchemaMiddleware(activateCardSchema), activateCard);
cardRouter.get('/transactions/:cardId', getAllTransactions);
cardRouter.post('/card/:cardId/recharge', validateSchemaMiddleware(rechargeCardSchema), rechargeCard);
export default cardRouter;
