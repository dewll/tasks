export const EnumUtils = {getEnumKeyByEnumValue}

function getEnumKeyByEnumValue(myEnum: any, enumValue: any) {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue);
  console.log(keys)
  return keys.length > 0 ? keys[0] : null;
}
