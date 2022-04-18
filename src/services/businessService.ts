import searchBusinessById from '../repositories/businessRepository.js';

export default async function searchById(businessId:number) {
  const business = await searchBusinessById(businessId);
  if (!business) {
    throw { message: 'business not found', type: 'not found' };
  }
  return business;
}
