import {ArrayUtils} from '../array';

const value = 1;
const array = [1,2,3,4];
const item = 5;
const number1 = 5;
const number2 = 3;
const arrayToChunk = ['1','2'];
const chunkNumber = 1;
const stringInArray = ['a','b','k'];
const stringToRemove = 'k';
const stringToCheck = 'i';

describe('ArrayUtils', ()=>{
it('testing if  value is in array', () => {
    const isInArray = ArrayUtils.isInArray(value,array);
    expect(isInArray).toBe(true);
});
it('testing if  Item is added to  array', () => {
    const addItemInArray = ArrayUtils.addItemInArray(item,array);
    expect(addItemInArray).toEqual([1,2,3,4,5,]);
});
it('testing if  return value is 2', () => {
    const ascendingSort = ArrayUtils.ascendingSort(number1,number2);
    expect(ascendingSort).toEqual(2);
});
it('testing if  return value is -2', () => {
    const descendingSort = ArrayUtils.descendingSort(number1,number2);
    expect(descendingSort).toEqual(-2);
});
it('testing if array is chunked ', () => {
    const getChunks = ArrayUtils.getChunks(arrayToChunk, chunkNumber);
    expect(getChunks).toEqual([["1"],["2"]]);
});
it('testing if k is removed from stringIAarray', () => {
    const removeStartsWithSameValue = ArrayUtils.removeStartsWithSameValue(stringToRemove, stringInArray);
    expect(removeStartsWithSameValue).toEqual(['a','b']);
});
it("testing if stringInArray start with 'i' ", () => {
    const checkStartsWithSameValue = ArrayUtils.checkStartsWithSameValue(stringToCheck, stringInArray);
    expect(checkStartsWithSameValue).toBe(false);
});
})