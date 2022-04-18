import { Request, Response } from 'express';
import * as cardService from '../services/cardService.js';
import validApiKey from '../services/companyService.js';
import * as employeeService from '../services/employeeService.js';

export async function createCard(req:Request, res:Response) {
  const { employeeId, type } = req.body;
  await cardService.validIfSameTypeCard(employeeId, type);
  const companyId = await validApiKey(req.headers['x-api-key']);
  const employee = await employeeService.validEmployee(employeeId, companyId);
  const newCard = await cardService.createNewCard(employee, type);

  res.status(201).send(newCard);
}

export async function activateCard(req:Request, res:Response) {
  const { cardId, securityCode, cardPassword } = req.body;
  const card = await cardService.validIfCardExist(cardId);
  await cardService.validIfCardIsNotExpired(card.expirationDate);
  await cardService.validIfCardIsActive(card);
  await cardService.ValidateSecurityCode(securityCode, card.securityCode);
  await cardService.ActivateCard(cardPassword, cardId);

  res.sendStatus(200);
}
