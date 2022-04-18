import connection from '../database.js';

export async function validIfSameTypeCard(employeeId: number, cardType:string) {
  const card = await connection.query('SELECT * FROM cards WHERE "employeeId"=$1 AND type=$2', [employeeId, cardType]);
  return card.rows[0];
}

export async function searchCompany(apiKey: string | string[]) {
  await connection.query('SELECT * FROM companies WHERE "apiKey"=$1', [apiKey]);
}

export async function createCard(cardInformation: any) {
  return connection.query(`
    INSERT INTO cards ("employeeId", number, "cardholderName", "securityCode",
      "expirationDate", password, "isVirtual", "originalCardId", "isBlocked", type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING ID
  `, Object.values(cardInformation));
}

export async function searchCardById(cardId: number) {
  const card = await connection.query('SELECT * FROM cards WHERE id=$1', [cardId]);
  return card.rows[0];
}

export async function activateCard(hashedPassword: string, cardId:number) {
  await connection.query('UPDATE cards SET password=$1 WHERE id= $2', [hashedPassword, cardId]);
}

export async function rechargeCard(cardId: number, amount:number, timestamp:string) {
  await connection.query('INSERT INTO recharges ("cardId",timestamp,amount) VALUES ($1, $2, $3)', [cardId, timestamp, amount]);
}
export async function getCardPayments(cardId: number) {
  const payments = await connection.query('SELECT * FROM payments WHERE "cardId"=$1', [cardId]);
  return payments.rows;
}

export async function getCardRecharges(cardId: number) {
  const recharges = await connection.query('SELECT * FROM recharges WHERE "cardId"=$1', [cardId]);
  return recharges.rows;
}
