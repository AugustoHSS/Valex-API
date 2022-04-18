import connection from '../database.js';

export default async function searchBusinessById(businessId: number) {
  const business = await connection.query('SELECT * FROM businesses WHERE id=$1', [businessId]);
  return business.rows[0];
}
