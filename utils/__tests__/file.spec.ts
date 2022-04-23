import {FileUtils} from '../file';

const newDocument = 'New Text Document.txt'
const folderPath = 'testFolder';

describe('FileUtils', () => {
  it('testing if  a new text document is created for writeStream in the temp file directory.', () => {
    const createTempFilePath = FileUtils.createTempFilePath(newDocument,folderPath)
    const createTempFile = FileUtils.createTempFile(createTempFilePath)
    const downloadTempFile = FileUtils.downloadTempFile('https://www.google.com/', createTempFilePath)
    const getFileName = FileUtils.getFileName(createTempFilePath)
    const removeTempFile = FileUtils.removeTempFile(createTempFilePath)
    const getFolderPath = FileUtils.getFolderPath(createTempFilePath)
    expect(createTempFile).toBeTruthy;
  });
  it('testing if a temp folder is created if not create new one', () => {
    const ensureFolder = FileUtils.createTempFolder(`${FileUtils.tmpFolder}/${folderPath}`)
    expect(ensureFolder).toBe(undefined);
  });
  it('testing if the folderpath exit, if it exit remove the file inside it and if it does not exit do notting', () => {
    const removeDir =  FileUtils.removeDir(`${FileUtils.tmpFolder}/${folderPath}`)
    expect(removeDir).toBeTruthy;
  });
})