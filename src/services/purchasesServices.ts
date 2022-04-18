import dayjs from 'dayjs';
import makeNewPurchase from '../repositories/purchaseRepository.js';

export default async function createNewPurchase(cardId:number, businessId:number, amount:number) {
  const time = dayjs().format();
  await makeNewPurchase(cardId, businessId, time, amount);
}
