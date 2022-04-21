import {FileUtils} from '../src/file';

const fileName = 'content.txt';
const newDocument = 'New Text Document.txt'
const folderPath = 'Balogun';

describe('FileUtils', ()=>{
  it('testing if  temp file path was craeted and contain content.txt', () => {
    const createTempFilePath = FileUtils.createTempFilePath(fileName,folderPath)
    expect(createTempFilePath).toBeTruthy();
  });
  it('testing if  a new text document is created for writeStream in the temp file directory', () => {
    const createTempFile = FileUtils.createTempFile(`${FileUtils.tempFileFinder()}/${folderPath}/${newDocument}`)
    expect(createTempFile).toBeTruthy();
  });
  it(' testing if a file is downloaded and written to  New Text Document', () => {
    const downloadTempFile = FileUtils.downloadTempFile('https://www.google.com/', `${FileUtils.tempFileFinder()}/${folderPath}/${fileName}`)
    expect(downloadTempFile).toBeTruthy;
  });
  it('testing if a temp folder is created if not create new one', () => {
    const ensureFolder = FileUtils.ensureFolder(`${FileUtils.tempFileFinder()}/${folderPath}`)
    expect(ensureFolder).toBe(undefined);
  });
  it('testing if folder path of content.txt exit', () => {
    const getFolderPath = FileUtils.getFolderPath(`${FileUtils.tempFileFinder()}/${folderPath}/${fileName}`)
    expect(getFolderPath).toBe(`${FileUtils.tempFileFinder()}/${folderPath}`);
  });
  it('testing if New Text Document exit in the Temp file directory', () => {
    const getFileName = FileUtils.getFileName(`${FileUtils.tempFileFinder()}/${folderPath}/${newDocument}`)
    expect(getFileName).toBe('New Text Document.txt');
  });
  it('testing if New Text Document was removed the file path', () => {
    const removeTempFile = FileUtils.removeTempFile(`${FileUtils.tempFileFinder()}/${folderPath}/${newDocument}`)
    expect(removeTempFile).toBe(undefined);
  });
  it('testing if "HELLO WORLD" was written to content.txt', () => {
    const writeFile = FileUtils.writeFile(`${FileUtils.tempFileFinder()}/${folderPath}/${fileName}`, 'HELLO WORLD')
    expect(writeFile).toBe(void 0);
  });
  it('testing if file was read from content.txt', () => {
    const readFile = FileUtils.readFile(`${FileUtils.tempFileFinder()}/${folderPath}/${fileName}`)
    expect(readFile).toBeTruthy();
  });
  it('testing if the folderpath exit, if it exit remove the file inside it and if it does not exit do notting', () => {
    const removeDir =  FileUtils.removeDir(`${FileUtils.tempFileFinder()}/${folderPath}`)
    expect(removeDir).toBeTruthy;
  });
})