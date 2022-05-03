import ZipUtils from '../zip';
import {Logger} from '../logger';
import * as fs from 'fs-extra';
import {hashElement} from 'folder-hash';
jest.useFakeTimers();

const os = require('os');
const JSZip = require('jszip');
const zip = new JSZip();
const tempDir = os.tmpdir();
const newTempDir = tempDir + '\\testFolder';
          
describe('zipUtil', () => {
    describe('zipFolder', () => {
        it('check if folder compressed succsesfully', () => {

            if (!fs.existsSync(newTempDir)){
              fs.mkdirSync(newTempDir);
            }   

            const createDummyFile = (fileName: string, size: number) => {
                return new Promise((resolve, reject) => {
                    const fh = fs.openSync(fileName, 'w');
                    fs.writeSync(fh, 'ok', Math.max(0, size - 2));
                    fs.closeSync(fh);
                    resolve(true);
                });
            };

            const listOfFiles: string[] = ['/video.mp4', '/video2.mp4', '/audio1.mp3', '/dummyImage.jpg']

            for (const file of listOfFiles) {
                createDummyFile(newTempDir + file, 1024 * Math.floor(Math.random() * 1000));
            }
            const options = {
                files: { include: ['*'] },
              };

            let hashInformation;

            hashElement(newTempDir, options).then(hash => {
                if (hash) {
                    hashInformation = hash.toString();
                }
            }).catch(err => console.log(err))

            ZipUtils.zipFolder(newTempDir, newTempDir + '\\files.zip', new Logger);
        })
    })
    describe('unzipFile', () => {
        it('check if zip folder is unzip', () => {

            zip.file("Textfile.txt", "Hello World!\n");
            zip.generateNodeStream({type: 'nodebuffer', streamFiles: true})
            .pipe(fs.createWriteStream(newTempDir + '\\sample.zip'))
            .on('finish', function(){
              console.log("sample.zip written")
            })

            ZipUtils.unzipFile( newTempDir + '\\sample.zip', newTempDir, new Logger);
        })
    })
})