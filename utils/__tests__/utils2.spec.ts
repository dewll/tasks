import { UtilsUtils } from '../utils2';

const errormessage = 'HELLO'
const string = null;
const number =  5;
const array = []


describe('UtilsUtils', () => {
  it('testing if errormessage was rejected was return.', async () => {
    await expect(UtilsUtils.rejectPromise(errormessage)).rejects.toMatch('HELLO');
  });
  it('testing if errormessage was resolve.', async () => {
    await expect(UtilsUtils.resolvePromise(errormessage)).resolves.toMatch('HELLO');
  });
  it( 'testing if string is Null, Empty or Undefined', () => {
    const isStringNullEmptyOrUndefined = UtilsUtils.isStringNullEmptyOrUndefined(string)
    expect(isStringNullEmptyOrUndefined).toBe(true);
  });
  it( 'testing if string is Null, Empty or Undefined', () => {
    const isNullOrUndefined = UtilsUtils.isNullOrUndefined(string)
    expect(isNullOrUndefined).toBe(true);
  });
it( 'testing if string is not Null, Undefined', () => {
    const isNotNullOrUndefined = UtilsUtils.isNotNullOrUndefined(string)
    expect(isNotNullOrUndefined).toBe(false);
  });
it( 'testing if number is Null, Undefined', () => {
    const isNumberNullOrUndefined = UtilsUtils.isNumberNullOrUndefined(number)
    expect(isNumberNullOrUndefined).toBe(false);
  });
it( 'testing if zero is return when number in null or undefined', () => {
    const makeZeroIfNullOrUndefined = UtilsUtils.makeZeroIfNullOrUndefined(number)
    expect(makeZeroIfNullOrUndefined).toBe(5);
  });
it( 'testing if array is null or empty', () => {
    const isNullOrEmptyArray = UtilsUtils.isNullOrEmptyArray(array)
    expect(isNullOrEmptyArray).toBe(true);
  });
})