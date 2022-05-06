import * as _ from 'lodash';

export const JavaScriptHelperUtils = {
  objectChangeDiff,
  jsonStringifyFailTolerable,
}

/**
 * @param obj
 * @param objToCheck
 * @param placeHolderForDeletedProperties  value in resulting object for properties that exists in objToCheck but not in obj
 * @param deepEqual perform deep equal check
 * @return object  object with all properties from obj that differ from objToCheck
 */
function objectChangeDiff(
  obj: object,
  objToCheck: object,
  placeHolderForDeletedProperties: any = undefined,
  deepEqual = true
): object {
  const merged = { ...objToCheck, ...obj };
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(merged)) {
    if (key in obj) {
      const valueToCheck = (objToCheck as any)[key];
      let isEqual = valueToCheck === value;
      if (deepEqual && !isEqual) {
        isEqual = _.isEqual(valueToCheck, value);
      }
      if (!isEqual) {
        result[key] = value;
      }
    } else {
      result[key] = placeHolderForDeletedProperties;
    }
  }
  return result;
}

export const randomInt = () => +Math.random().toString().slice(2);

function jsonStringifyFailTolerable(data: any, failText = '{error_during_serialization}') {
  try {
    return JSON.stringify(data);
  } catch (e) {
    return failText;
  }
}