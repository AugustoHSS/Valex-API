import connection from '../database.js';

export default async function
makeNewPurchase(cardId: number, businessId:number, timestamp:string, amount:number) {
  await connection.query(`INSERT INTO payments
   ("cardId","businessId",timestamp,amount)
    VALUES ($1, $2, $3,$4)`, [cardId, businessId, timestamp, amount]);
}
