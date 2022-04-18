import express from 'express';
import { createCard } from '../controllers/cardController.js';
import newCardSchema from '../schemas/newCardSchema.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';

const cardRouter = express.Router();
cardRouter.post('/create-card', validateSchemaMiddleware(newCardSchema), createCard);

export default cardRouter;
