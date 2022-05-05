import { CommonUtils } from '../validators/common';

const obj = {'name':'TypeScript', 'age': 2021}

describe('CommonUtils', ()=>{
  it('testing if all the key has a value', () => {
    const validateObjectOnEmptyKeys = CommonUtils.validateObjectOnEmptyKeys(obj)
    expect(validateObjectOnEmptyKeys).toBe(undefined);
  });
})