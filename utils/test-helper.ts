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

// Original method to upload to google-cloud  S3 Bucket
//   static uploadTestFiles = async (destination: string, name: string, bucket: Bucket) => {
//     const localTestFilePath = `${os.tmpdir()}/${name}`;
//     fs.writeFileSync(localTestFilePath, '');
//     await bucket.upload(localTestFilePath, { destination: `${destination}/${name}` });
//   };
// } 
 
// Creating a mock S3 bucket method
  static uploadTestFiles = async (destination: string, name: string, bucket) => {
    const localTestFilePath = `${os.tmpdir()}/${name}`;
    fs.writeFileSync(localTestFilePath, '');
    bucket.push(localTestFilePath, { destination: `${destination}/${name}` });
  };
} 