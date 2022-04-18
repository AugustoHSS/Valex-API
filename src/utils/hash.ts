import bcrypt from 'bcrypt';

export function hashValue(valueToHash: string) {
  const hashedValue = bcrypt.hashSync(valueToHash, 10);

  return hashedValue;
}

export function compareHashValue(valueToCompareHash: string, hashedValue: string) {
  const result = bcrypt.compareSync(valueToCompareHash, hashedValue);

  return result;
}
