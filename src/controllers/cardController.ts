import { Request, Response } from 'express';
import * as cardService from '../services/cardService.js';
import validApiKey from '../services/companyService.js';
import * as employeeService from '../services/employeeService.js';

export function calculateCardBalance(cardPayments:any, cardRecharges:any) {
  let payments = 0;
  let recharges = 0;
  cardRecharges.forEach((amount: { amount: number; }) => { recharges += amount.amount; });
  cardPayments.forEach((amount: { amount: number; }) => { payments += amount.amount; });
  return recharges - payments;
}

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

export async function rechargeCard(req:Request, res:Response) {
  const { cardId } = req.params;
  const { amount } = req.body;

  await validApiKey(req.headers['x-api-key']);
  const card = await cardService.validIfCardExist(parseInt(cardId, 10));
  await cardService.validIfCardIsNotExpired(card.expirationDate);
  await cardService.rechargeCard(parseInt(cardId, 10), amount);

  res.sendStatus(200);
}

export async function getAllTransactions(req:Request, res:Response) {
  const { cardId } = req.params;
  await cardService.validIfCardExist(parseInt(cardId, 10));
  const cardPayments = await cardService.getCardPayments(parseInt(cardId, 10));
  const cardRecharges = await cardService.getCardRecharges(parseInt(cardId, 10));
  const balance = calculateCardBalance(cardPayments, cardRecharges);
  res.status(200).send({
    balance,
    transactions: cardPayments,
    recharges: cardRecharges,
  });
}
