import {JavaScriptHelperUtils} from '../javascript-helper';

const obj = {'Hello':'World'};
const object = {'Hello':'jest'};
const placeHolderForDeleteproperty = 'replace_value';
const data = 'word_to_stringify';

describe('JavaScriptHelperUtils', ()=>{
  it('testing if an object with expected value is return', () => {
    const createTempFilePath = JavaScriptHelperUtils.objectChangeDiff(obj, object, placeHolderForDeleteproperty)
    expect(createTempFilePath).toMatchObject({});
  });
  it('testing if data is stringify', () => {
    const jsonStringifyFailTolerable = JavaScriptHelperUtils.jsonStringifyFailTolerable(data)
    expect(jsonStringifyFailTolerable).toEqual(JSON.stringify('word_to_stringify'));
  });
})