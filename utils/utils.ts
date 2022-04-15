export const FREE_FIRST_TRIAL_DURATION = 7 * 24 * 60 * 60; // 7 days
export const STATS_CALCULATION_DAYS = 7;

export function rejectPromise(errorMessage: string): Promise<never> {
  return Promise.reject(errorMessage);
}

export function resolvePromise<T>(data: T): Promise<T> {
  return Promise.resolve(data);
}

export function isStringNullEmptyOrUndefined(string: string): boolean {
  return string === null || string === undefined || string === '';
}

export function isNullOrUndefined(o: any): boolean {
  return o === null || o === undefined;
}

export function isNotNullOrUndefined(o: any): boolean {
  return o !== null && o !== undefined;
}

export function isNumberNullOrUndefined(o: number): boolean {
  return o === null || o === undefined;
}

export function makeZeroIfNullOrUndefined(time: number): number {
  return isNumberNullOrUndefined(time) ? 0 : time;
}

export function isNullOrEmptyArray(s: any[]): boolean {
  return s === null || s === undefined || s.length === 0;
}
