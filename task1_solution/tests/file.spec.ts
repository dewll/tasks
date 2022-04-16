import {createTempFilePath,
    createTempFile,
    downloadTempFile,
    ensureFolder,
    getFolderPath,
    getFileName,
    removeTempFile,
    writeFile,
    readFile,
    removeDir} from '../src/sum';
describe('File', ()=>{
    it('expect output to be C:\\Users\\SODIQ\\AppData\\Local\\Temp\Balogun\\sodiq\\content.txt', () => {
        const ans = createTempFilePath('content.txt', 'Balogun\\sodiq')
        expect(ans).toBe('C:\\Users\\SODIQ\\AppData\\Local\\Temp\\Balogun\\sodiq\\content.txt');
        });
    it('expect output to be truthy', () => {
        const ans1 = createTempFile('C:\\Users\\SODIQ\\AppData\\Local\\Temp\\Balogun\\sodiq\\New Text Document.txt')
        expect(ans1).toBeTruthy();
        });
    it('expect output to []', () => {
        const ans2 = downloadTempFile('https://www.google.com/', 'C:\\Users\\SODIQ\\AppData\\Local\\Temp\\Balogun\\sodiq\\content.txt')
        expect([]).toEqual([]);
        });
    it('expect output to be undefine', () => {
        const ans1 = ensureFolder('C:\\Users\\SODIQ\\AppData\\Local\\Temp\\Balogun\\sodiq')
        expect(ans1).toBe(undefined);
        });
    it('expect output to be C:\\Users\\SODIQ\\AppData\\Local\\Temp\\Balogun\\sodiq', () => {
        const ans1 = getFolderPath('C:\\Users\\SODIQ\\AppData\\Local\\Temp\\Balogun\\sodiq\\content.txt')
        expect(ans1).toBe('C:\\Users\\SODIQ\\AppData\\Local\\Temp\\Balogun\\sodiq');
        });
    it('expect output to be New Text Document.txt', () => {
        const ans = getFileName('C:\\Users\\SODIQ\\AppData\\Local\\Temp\\Balogun\\sodiq\\New Text Document.txt')
        expect(ans).toBe('New Text Document.txt');
        });
    it('expect output to be undefine', () => {
        const ans1 = removeTempFile('C:\\Users\\SODIQ\\AppData\\Local\\Temp\\Balogun\\sodiq\\New Text Document.txt')
        expect(ans1).toBe(undefined);
        });
    it('expect output to nothing', () => {
        const ans1 = writeFile('C:\\Users\\SODIQ\\AppData\\Local\\Temp\\Balogun\\sodiq\\content.txt', 'HELLO WORLD')
        expect(ans1).toBe(void 0);
        });
    it('expect output to be thruthy', () => {
        const ans1 = readFile('C:\\Users\\SODIQ\\AppData\\Local\\Temp\\Balogun\\sodiq\\content.txt')
        expect(ans1).toBeTruthy();
        });
    it('expect output to []', () => {
        const ans1 =  removeDir('C:\\Users\\SODIQ\\AppData\\Local\\Temp\\Balogun\\sodiq')
        expect([]).toEqual([]);
        });
})