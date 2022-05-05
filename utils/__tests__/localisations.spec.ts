import { LocalisationsUtils } from '../localisations';

const language = 'English';
const path = 'Folder';
const string = 'string_to_return';
const number = 5;

describe('LocalisationsUtils', () => {
  it('testing if localize string is gotting.', async () => {
    const mockFunctionToBeCalled = () => {};
    const getLocalisedString = jest.fn(LocalisationsUtils.getLocalisedString(mockFunctionToBeCalled,language,path));
    expect(getLocalisedString).toHaveBeenCalled
  });
  it('testing if  a string is return.', () => {
    const getStringFromNumericString = LocalisationsUtils.getStringFromNumericString(string, number)
    expect(getStringFromNumericString).toBe('string_to_return');
  });
})