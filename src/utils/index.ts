
import { plainToInstance } from 'class-transformer';
import { camelCase } from 'lodash';

export const isEmptyValues = (value: any) =>
  value === undefined
  || value === null
  || value === NaN
  || ((typeof value === 'object') && Object.keys(value).length === 0)
  || ((typeof value === 'string') && value.trim().length === 0);

export const camelcaseKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(v => camelcaseKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelcaseKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

export const plainToInstanceKeysMap: typeof plainToInstance =
  (cls, plain, options) => {
    if (Array.isArray(plain)) {
      return plain.map(item => plainToInstance(cls, camelcaseKeys(item), options))
    }

    return plainToInstance(cls, camelcaseKeys(plain), options);
  };