import { Logger } from './logger';

const logger = new Logger('exception:');

/** @deprecated not useed anymore, should be used exact type of error */
export function throwError(reason: string): never {
  const error = new Error(reason);
  logger.logError('throwError', error);
  throw error;
}

/** @deprecated not useed anymore, should be used exact type of error */
export function throwValidationError(reason: string, errorCode: ValidationErrorCode): never {
  const error = new ClientError(reason, errorCode);
  logger.logError('throwValidationError', error, { errorCode });
  throw error;
}

// Send error for cloud functions which are called at client side
export class ClientError extends Error {
  constructor(
    message: string,
    readonly errorCode: ValidationErrorCode | InstagramAPIErrorCode = 0,
    readonly statusCode = 200
  ) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

export enum ValidationErrorCode {
  invalidProjectInviteParams = 460,
  userHasMaxProjectsCount = 461,
  invalidVerifyReceipt = 462,
  verifiedPurchaseAlreadyConnected = 463,
  noPromoSubscriptionExist = 464,
  noBonusDaysAvailable = 465,
  subscriptionIsExpired = 466,
  invalidCommandWorkerParams = 467,
}

export const UNHANDLED_ERROR_CODE = 999;

export enum InstagramAPIErrorCode {
  INVALID_AUTH_TOKEN = 190,
  INVALID_FIELD = 100,
  INVALID_PERMSISSIONS = 200,
  INVALID_PERMSISSIONS_APP = 10,
  INVALID_PERMSISSIONS_FIELD = 33, // subcode
  LIMIT_REACHED = 4,
}
