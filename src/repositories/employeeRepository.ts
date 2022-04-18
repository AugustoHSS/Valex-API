import connection from '../database.js';

export async function test() {
  const result = await connection.query('SELECT * FROM employees');
  return result.rows;
}

export async function searchCompanyEmployee(employeeId: number, companyId: number) {
  const employee = await connection.query('SELECT * FROM employees WHERE "companyId"=$1 AND id=$2', [companyId, employeeId]);
  return employee.rows[0];
}
