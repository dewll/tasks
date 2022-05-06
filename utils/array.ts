/**
 * checks if the object is in array or not
 *
 * @param {number} value
 * @param {number[]} array
 * @returns {boolean} true if the number is found, else false
 */
import { isNullOrUndefined } from './utils2';

export const ArrayUtils = {
  isInArray,
  addItemInArray,
  ascendingSort,
  descendingSort,
  getChunks,
  removeStartsWithSameValue,
  checkStartsWithSameValue,
}

function isInArray<T>(value: T, array: T[]): boolean {
  return array.indexOf(value) > -1;
}

// adds an item in array if it doesn't exist and returns resulting array
function addItemInArray<T>(value: T, array: T[]): T[] {
  const index = array.findIndex((x) => x === value);
  if (index === -1) {
    array.push(value);
  }
  return array;
}

function ascendingSort(a: number, b: number): number {
  return a - b;
}

function descendingSort(a: number, b: number): number {
  return b - a;
}

/**
 * converts {array} into small chunks of size {chunk} and returns resulting array
 *
 * @param array
 * @param chunk
 */

function getChunks<T extends Array<string>>(array: T, chunk: number): T[] {
  const result: T[] = [];
  for (let i = 0, j = array.length; i < j; i += chunk) {
    const temp: T = array.slice(i, i + chunk) as T;
    result.push(temp);
  }
  return result;
}

// remove item starts with value
function removeStartsWithSameValue(value: string, array: string[]): string[] {
  const index = array.findIndex((x) => !isNullOrUndefined(x) && x.startsWith(value));
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array.filter((x) => !isNullOrUndefined(x));
}

// check item starts with value
function checkStartsWithSameValue(value: string, array: string[]) {
  const index = array.findIndex((x) => !isNullOrUndefined(x) && x.startsWith(value));
  return index !== -1;
}