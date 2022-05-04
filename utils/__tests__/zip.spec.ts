import zip from '../zip';
import { ZipUtils } from '../zip'
import {Logger} from '../logger';
import * as fs from 'fs-extra'
const path = require('path');
const os = require('os');
import {hashElement} from 'folder-hash';
jest.useFakeTimers()

describe('zipUtil', () => {
    describe('zipFolder', () => {
        it('check if folder compressed succsesfully', () => {

            const tempDir = os.tmpdir();
            const newTempDir = tempDir + '\\testFolder';
          
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

            zip.zipFolder(newTempDir, newTempDir + `/file.zip`, new Logger);
        })
    })
})