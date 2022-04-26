import { FileUtils } from '../file';

const fileName = 'content.txt'
const newDocument = 'New Text Document.txt'
const folderPath = 'testFolder';


describe('FileUtils', () => {
  it('testing if  a new text document is created for writeStream in the temp file directory.', () => {
    const createTempFilePath = FileUtils.createTempFilePath(newDocument,folderPath)
    const createTempFile = FileUtils.createTempFile(createTempFilePath)
    expect(createTempFile).toBeTruthy;
  });
  it( 'testing if a file is downloaded and written to New Text Document', () => {
    const downloadTempFile = FileUtils.downloadTempFile('https://www.google.com/', `${tmpFolder}/${folderPath}/${fileName}` )
    expect(downloadTempFile).toBeTruthy;
  });
  it('testing if a temp folder is created if not create new one', () => {
    const ensureFolder = FileUtils.createTempFolder(`${tmpFolder}/${folderPath}`)
    expect(ensureFolder).toBe(undefined);
  });
  it( 'testing if a folder path of content.txt exit', () => {
    const getFolderPath = FileUtils.getFolderPath(`${tmpFolder}/${folderPath}/${fileName}`)
    expect(getFolderPath).toBe(`${tmpFolder}/${folderPath}`);
  });
  it( 'testing if New Text Document exit in the Temp file directory', () => {
    const getFileName = FileUtils.getFileName(`${tmpFolder}/${folderPath}/${newDocument}`)
    expect(getFileName).toBe('New Text Document.txt');
  });
  it( 'testing if New Text Document was removed from the file path', () => {
    const removeTempFile = FileUtils.removeTempFile(`${tmpFolder}/${folderPath}/${newDocument}`)
    expect(removeTempFile).toBe(undefined);
  });
  it('testing if the folderpath exit, if it exit remove the file inside it and if it does not exit do notting', () => {
    const removeDir =  FileUtils.removeDir(`${tmpFolder}/${folderPath}`)
    expect(removeDir).toBeTruthy;
  });
})