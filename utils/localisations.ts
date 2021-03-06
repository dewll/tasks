import * as admin from 'firebase-admin';
import { Language } from '../../routes/legacy/bloc/models/languages';
//import { getLocalisedStringRef } from '../../routes/legacy/bloc/core/rtdb/rtdb';
import { isNumberNullOrUndefined, isStringNullEmptyOrUndefined } from './utils2';

const localeMap = new Map<string, string>();

export const LocalisationsUtils = {
  getLocalisedString,
  getStringFromNumericString
}
/** @deprecated */
async function getLocalisedString(
  rtdb: admin.database.Database,
  language: Language,
  localePath: string
): Promise<string> {
  const fullLocalePath = `${language}/${localePath}`;
  const localeValue = localeMap.get(fullLocalePath);
  if (localeValue) {
    return Promise.resolve(localeValue);
  }

  const snap = await getLocalisedStringRef(rtdb, language, localePath).once('value');
  localeMap.set(fullLocalePath, snap.val());
  return snap.val();
}

/** @deprecated */
function getStringFromNumericString(string: string, number: number) {
  return isNumberNullOrUndefined(number) ? string : string.replace('%d', `${number}`);
}
