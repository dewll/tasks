import { asFunction, asValue, createContainer } from 'awilix';

describe('awilix', () => {
  it('no premature call', () => {
    const container = createContainer();

    let valToSet = undefined;

    container.register({
      valSet: asFunction(({ val }) => {
        valToSet = val;
        return 43;
      }),
      throwsError: asFunction(() => {
        throw new Error('throwsError');
      }),
      val: asValue(42),
    });

    expect(valToSet).toEqual(undefined);
    expect(container.cradle.valSet).toEqual(43);
    expect(valToSet).toEqual(42);
    expect(() => container.cradle.throwsError).toThrow();
  });
});
