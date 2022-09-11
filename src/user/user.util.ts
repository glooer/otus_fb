import { createHash } from 'node:crypto'
import { isEmptyValues } from 'src/utils';

export const encryptPassword = (password: string) => {
  if (isEmptyValues(password)) {
    return null;
  }

  return createHash('md5').update(password).digest("hex");
}

export const checkPassword = (password: string, hash: string) => {
  return encryptPassword(password) === hash;
}