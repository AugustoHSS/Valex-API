import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { hashValue } from '../utils/hash.js';
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
  await cardRepository.createCard(cardInformation);
  cardInformation.securityCode = securityCode;
  return cardInformation;
}
