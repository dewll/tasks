import * as iap from 'in-app-purchase';
import { mainDc } from '../containers/main-init';
import { IS_DEBUG_ENV } from '../firebase/functions-runtime/environment-constants';

export function setUpIap() {
  iap.config({
    applePassword: mainDc.runtime.config.apple.shared_secret,
    googlePublicKeyStrLive: mainDc.runtime.config.google.public_key,
    googleAccToken: mainDc.runtime.config.google.authorization,
    googleRefToken: mainDc.runtime.config.google.refresh_token,
    googleClientID: mainDc.runtime.config.google.client_id,
    googleClientSecret: mainDc.runtime.config.google.client_secret,
    test: IS_DEBUG_ENV,
    verbose: false,
  });
}
