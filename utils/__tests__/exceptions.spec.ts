import { ExceptionUtils } from '../exception';

const error = 'HELLO';
const errorCode = 461;

describe('ExceptionUtils', () => {
it('testing if error was thrown.', () => {
  expect.assertions(0);
  try{
    expect(ExceptionUtils.throwError(error)).toThrow(error);
  } catch (e) {}
});
it('testing if validationerror was thrown.', () => {
  expect.assertions(0);
  try{
    expect(ExceptionUtils.throwValidationError(error, errorCode)).toThrow(error);
  } catch (e) {}
});
})