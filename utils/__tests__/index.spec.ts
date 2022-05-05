import { Logger } from '../logger/index';

const logger = new Logger();
const message = 'Message to display';
const data = 'Data to display';
const method = 'method to  be called'

describe('Logger', () => {
  it('testing if info message is logged', async () => {
    const logInfo = logger.logInfo(message, data)
    expect(logInfo).toBe(undefined)
  });
  it('testing if warning message is logged', async () => {
    const logWarning = logger.logWarning(message, data)
    expect(logWarning).toBe(undefined)
  });
  it('testing if error message is logged', async () => {
    const logError = logger.logError(method, message, data)
    expect(logError).toBe(undefined)
  });
  it('testing if debug message is logged', async () => {
    const logDebug = logger.logDebug(method, message)
    expect(logDebug).toBe(undefined)
  });
});