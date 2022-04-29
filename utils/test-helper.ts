import * as os from 'os';
import * as fs from 'fs';
import * as sinon from 'sinon';
import { Bucket } from '@google-cloud/storage';

export class TestHelper {
  /** @deprecated use jest.spyOn */
  static stubSandbox = async (func: any) => {
    const sandbox = sinon.createSandbox();
    try {
      return await func(sandbox);
    } finally {
      sandbox.restore();
    }
  };

  static uploadTestFiles = async (destination: string, name: string, bucket: Bucket) => {
    const localTestFilePath = `${os.tmpdir()}/${name}`;
    fs.writeFileSync(localTestFilePath, '');
    await bucket.upload(localTestFilePath, { destination: `${destination}/${name}` });
  };
}
