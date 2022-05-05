import { logger } from 'firebase-functions';

const isDevelopment = process.env.FUNCTIONS_ENV === 'development';

export class Logger {
  ENTER = 'enter';
  EXIT = 'exit';

  constructor(loggingClass = '') {
    this.logTag = loggingClass + ': ';
  }

  private logTag = '';

  logInfo = (message: string, data: any = null) => {
    try {
      const args = [this.logTag, message];
      if (data !== null) args.push(data);
      isDevelopment && console.info(...args);
      logger.info(...args);
    } catch (e) {
      console.error('Error during logInfo:', e as Error);
    }
  };

  logWarning = (message: string, data: any = null) => {
    try {
      const args = [this.logTag, message];
      if (data !== null) args.push(data);
      isDevelopment && console.warn(...args);
      logger.warn(...args);
    } catch (e) {
      console.error('Error during logWarning:', e as Error);
    }
  };

  logError = (method: string, error: Error | any, info: any = null) => {
    try {
      const args = [];

      if (this.logTag) {
        args.push(this.logTag);
      }

      if (method && !(`${method}:` !== this.logTag)) {
        args.push(`${method}:`);
      }

      args.push(error);

      if (info !== null) {
        args.push(info);
      }

      isDevelopment && console.error(...args);
      logger.error(...args);
    } catch (e) {
      console.error('Error during logError:', e as Error);
    }
  };

  logDebug = (method: string, message: string) => {
    try {
      isDevelopment && console.debug(this.logTag, message, method);
      logger.debug(this.logTag, message, method);
    } catch (e) {
      console.error('Error during logDebug:', e as Error);
    }
  };
}