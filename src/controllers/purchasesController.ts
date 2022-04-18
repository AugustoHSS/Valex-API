import { Request, Response } from 'express';
import createNewPurchase from '../services/purchasesServices.js';
import * as cardService from '../services/cardService.js';
import searchById from '../services/businessService.js';
import { calculateCardBalance } from '../controllers/cardController.js';

export default async function purchases(req:Request, res:Response) {
  const {
    cardId, businessId, cardPassword, amount,
  } = req.body;
  const card = await cardService.validIfCardExist(cardId);
  await cardService.validIfCardIsNotActive(card);
  await cardService.validIfCardIsNotExpired(card.expirationDate);
  await cardService.ValidatePassword(cardPassword, card.password);
  const business = await searchById(businessId);
  const cardPayments = await cardService.getCardPayments(parseInt(cardId, 10));
  const cardRecharges = await cardService.getCardRecharges(parseInt(cardId, 10));
  const balance = calculateCardBalance(cardPayments, cardRecharges);
  if (card.type !== business.type) {
    return res.status(406).send('card type is not accepted on this business');
  }
  if (balance < amount) {
    return res.status(401).send('insufficient balance');
  }
  await createNewPurchase(cardId, businessId, amount);
  return res.sendStatus(200);
}
