import * as employeeRepository from '../repositories/employeeRepository.js';

export async function createNewCard() {
  const result = 123;
  return result;
}

export async function validEmployee(employeesId: number, companyId: number) {
  const employee = await employeeRepository.searchCompanyEmployee(employeesId, companyId);
  if (!employee) {
    throw { message: 'Employee not found', type: 'not found' };
  }
  return employee;
}
