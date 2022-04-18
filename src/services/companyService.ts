import searchCompany from '../repositories/companyRepository.js';

export default async function validApiKey(apiKey: string | string[]) {
  if (!apiKey) {
    throw { message: 'missing API key', type: 'validation error' };
  }
  const company = await searchCompany(apiKey);
  if (!company) {
    throw { message: 'invalid API key', type: 'validation error' };
  }
  return company.id;
}
