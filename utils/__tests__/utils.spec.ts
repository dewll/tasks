import { objectChangeDiff } from '../javascript-helper';

describe('Util', () => {
  it('object change diff deep', () => {
    const DEL = '<DEL>';

    const obj = {
      new: 1,
      sameShallow: 2,
      sameDeep: [3, 4],
      changed: [5, 6],
    };

    const objToCheck = {
      sameShallow: 2,
      sameDeep: [3, 4],
      changed: [5, 7],
      deleted: 8,
    };

    const diff = objectChangeDiff(obj, objToCheck, DEL);

    expect(diff).toEqual({
      new: 1,
      changed: [5, 6],
      deleted: DEL,
    });
  });

  it('object change diff shallow', () => {
    const DEL = '<DEL>';

    const obj = {
      new: 1,
      sameShallow: 2,
      sameDeep: [3, 4],
      changed: [5, 6],
    };

    const objToCheck = {
      sameShallow: 2,
      sameDeep: [3, 4],
      changed: [5, 7],
      deleted: 8,
    };

    const diff = objectChangeDiff(obj, objToCheck, DEL, false);

    expect(diff).toEqual({
      new: 1,
      sameDeep: [3, 4],
      changed: [5, 6],
      deleted: DEL,
    });
  });
});
