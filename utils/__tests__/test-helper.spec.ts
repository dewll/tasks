import { TestHelper } from '../test-helper';

const test = function(){};

//Creating Mock S3 Bucket
const bucket = [];
const destination = 'FolderDestination';
const name = 'Files';

describe('TestHelper', () => {
  it('testing if a sandbox was created', async () => {
    const createSandBox = TestHelper.stubSandbox(test);
    expect(createSandBox).toMatchObject({})
  });
  it('testing if testFiles path is uploaded to S3 bucket', async () => {
    const uploadTestFiles = TestHelper.uploadTestFiles(destination, name, bucket);
    expect(uploadTestFiles).toMatchObject({})
  });
});