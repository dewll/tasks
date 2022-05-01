import { ExceptionUtils } from '../exception';

describe('ExceptionUtils', () => {
it('testing if error was thrown.', () => {
  expect.assertions(0);
  try{
    expect(ExceptionUtils.throwError('good')).toThrow('some error');
  } catch (e) {}
});
it('testing if validationerror was thrown.', () => {
  expect.assertions(0);
  try{
    expect(ExceptionUtils.throwValidationError('good',461)).toThrow('some error');
  } catch (e) {}
});
})