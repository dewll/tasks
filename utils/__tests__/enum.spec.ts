import { EnumUtils  } from '../enum';

enum myEnum{
  Up,
  Down,
  Left,
  Right,
}
const enumValue = 1
describe(' EnumUtils ', () => {
it('testing if length of enum is greater than 0 and return the value but retun 0 if length is less than zero ', () => {
    const getEnumKeyByEnumValue =EnumUtils.getEnumKeyByEnumValue(myEnum, enumValue)
    expect(getEnumKeyByEnumValue).toBe('Down');
});
})