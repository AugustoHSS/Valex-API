import express from 'express';
import { createCard, activateCard } from '../controllers/cardController.js';
import newCardSchema from '../schemas/newCardSchema.js';
import activateCardSchema from '../schemas/activateCardSchema.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';

const cardRouter = express.Router();
cardRouter.post('/create-card', validateSchemaMiddleware(newCardSchema), createCard);
cardRouter.put('/activate-card', validateSchemaMiddleware(activateCardSchema), activateCard);
export default cardRouter;
