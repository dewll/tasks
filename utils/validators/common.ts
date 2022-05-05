import { throwError } from '../exception';

export const CommonUtils = {validateObjectOnEmptyKeys}

function validateObjectOnEmptyKeys<T extends object>(obj: T) {
  Object.keys(obj).forEach((key) => {
    if (!(obj as any)[key]) {
      throwError(`${key} is missing`);
    }
  });
}