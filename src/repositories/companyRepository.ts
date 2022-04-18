import connection from '../database.js';

export default async function searchCompany(apiKey: string | string[]) {
  const company = await connection.query('SELECT * FROM companies WHERE "apiKey"=$1', [apiKey]);
  return company.rows[0];
}
