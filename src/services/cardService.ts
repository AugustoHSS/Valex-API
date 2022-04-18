import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { hashValue, compareHashValue } from '../utils/hash.js';
import * as cardRepository from '../repositories/cardRepository.js';

function generateHolderName(fullName:string) {
  const middleName:string[] = [];
  const fullNameArray = fullName.split(' ');
  const firstName = fullNameArray[0];
  const lastName = fullNameArray[fullNameArray.length - 1];
  fullNameArray.forEach((name, i) => {
    if (name.length >= 3 && i !== 0 && i !== fullNameArray.length - 1) {
      middleName.push(name.slice(0, 1));
    }
  });
  const holderName = [firstName, ...middleName, lastName].join(' ').toUpperCase();
  return holderName;
}

export async function validIfSameTypeCard(employeeId: number, cardType:string) {
  const card = await cardRepository.validIfSameTypeCard(employeeId, cardType);
  if (card) {
    throw { message: 'employee already have this card type', type: 'duplicate value' };
  }
}

export async function createNewCard(employee: any, cardType: string) {
  const { id, fullName } = employee;
  const cardholderName = generateHolderName(fullName);
  const securityCode = faker.finance.creditCardCVV();
  const cardInformation = {
    employeeId: id,
    number: faker.finance.creditCardNumber('[51-55]##-####-####-###L'),
    cardholderName,
    securityCode: hashValue(securityCode),
    expirationDate: dayjs().add(5, 'year').format('MM/YYYY'),
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type: cardType,
  };
  const cardId = await cardRepository.createCard(cardInformation);
  cardInformation.securityCode = securityCode;
  return { id: cardId.rows[0].id, ...cardInformation };
}

export async function validIfCardExist(cardId:number) {
  const card = await cardRepository.searchCardById(cardId);
  if (!card) {
    throw { message: 'card not found', type: 'not found' };
  }
  return card;
}

export async function validIfCardIsNotExpired(expirationDate:string) {
  if ((dayjs().format('MM/YYYY') > expirationDate)) {
    throw { message: 'card expired', type: 'declined' };
  }
}

export async function validIfCardIsActive(card:any) {
  console.log(card.password);
  if (card.password) {
    throw { message: 'card already active', type: 'declined' };
  }
}

export async function ValidateSecurityCode(securityCode:string, hashedSecurityCode:string) {
  if (!compareHashValue(securityCode, hashedSecurityCode)) {
    throw { message: 'security code invalid', type: 'declined' };
  }
}

export async function ActivateCard(newPassword:string, cardId:number) {
  const hashedPassword = hashValue(newPassword);
  await cardRepository.activateCard(hashedPassword, cardId);
}

export async function rechargeCard(cardId:number, amount:number) {
  const time = dayjs().format();
  await cardRepository.rechargeCard(cardId, amount, time);
}

export async function getCardPayments(cardId: number) {
  return cardRepository.getCardPayments(cardId);
}

export async function getCardRecharges(cardId: number) {
  return cardRepository.getCardRecharges(cardId);
}
