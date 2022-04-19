import * as os from 'os';
import {FileUtils} from '../src/file';

const fileName = 'content.txt';
const folderPath = 'Balogun';
const newDocument = 'New Text Document.txt'

    
describe('File', ()=>{
    it('testing if  temp file path was craeted and contain content.txt', () => {
        const createTempFilePath = FileUtils.createTempFilePath(fileName, folderPath)
        expect(createTempFilePath).toBeTruthy();
        
        });
    it('testing if  a new text document is created for writeStream in the temp file directory', () => {
        const createTempFile = FileUtils.createTempFile(`${os.tmpdir()}/${folderPath}/${newDocument}`)
        expect(createTempFile).toBeTruthy();
        });
    it(' testing if a file is downloaded and written to  New Text Document', () => {
        const downloadTempFile = FileUtils.downloadTempFile('https://www.google.com/', `${os.tmpdir()}/${folderPath}/${fileName}`)
        expect([]).toEqual([]);
        });
    it('testing if a temp folder is created if not create new one', () => {
        const ensureFolder = FileUtils.ensureFolder(`${os.tmpdir()}/${folderPath}`)
        expect(ensureFolder).toBe(undefined);
        });
    it('testing if folder path of content.txt exit', () => {
        const getFolderPath = FileUtils.getFolderPath(`${os.tmpdir()}/${folderPath}/${fileName}`)
        expect(getFolderPath).toBe(`${os.tmpdir()}/${folderPath}`);
        });
    it('testing if New Text Document exit in the Temp file directory', () => {
        const getFileName = FileUtils.getFileName(`${os.tmpdir()}/${folderPath}/${newDocument}`)
        expect(getFileName).toBe('New Text Document.txt');
        });
    it('testing if New Text Document was removed the file path', () => {
        const removeTempFile = FileUtils.removeTempFile(`${os.tmpdir()}/${folderPath}/${newDocument}`)
        expect(removeTempFile).toBe(undefined);
        });
    it('testing if "HELLO WORLD" was written to content.txt', () => {
        const writeFile = FileUtils.writeFile(`${os.tmpdir()}/${folderPath}/${fileName}`, 'HELLO WORLD')
        expect(writeFile).toBe(void 0);
        });
    it('testing if file was read from content.txt', () => {
        const readFile = FileUtils.readFile(`${os.tmpdir()}/${folderPath}/${fileName}`)
        expect(readFile).toBeTruthy();
        });
    it('testing if content.txt was remove from the file path', () => {
        const removeDir =  FileUtils.removeDir(`${os.tmpdir()}/${folderPath}`)
        expect([]).toEqual([]);
        });
})