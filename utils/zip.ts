import * as fs from 'fs-extra';
import * as unzipper from 'unzipper';
import FileUtils from './file';
import archiver from 'archiver';
import { Logger } from './logger';

const ZipUtils = {
  zipFolder,
  unzipFile,
};
export default ZipUtils;

function zipFolder(folderPath: string, fileOutputPath: string, logger?: Logger): Promise<void> {
  const options = { zlib: { level: 9 } };
  const archive = archiver.create('zip',options);

  return new Promise((resolve, reject) => {
    const fileOutputStream = fs.createWriteStream(fileOutputPath);
    archive.on('warning', (err) => logger?.logWarning('warning', err));
    archive.on('end', () => {
      logger?.logInfo(`Archive wrote ${archive.pointer()} bytes`);
      fileOutputStream.end();
      resolve();
    });
    archive.on('error', (err) => {
      logger?.logError('zip failed', err);
      fileOutputStream.end();
      reject(err);
    });
    archive.pipe(fileOutputStream);
    archive.directory(folderPath, false);

    archive.finalize();
  });
}

function unzipFile(zipFilePath: string, outputFolder: string, logger?: Logger): Promise<void> {
  logger?.logInfo('start unzipping', { zipFilePath, outputFolder });
  return new Promise((resolve, reject) => {
    fs.createReadStream(zipFilePath)
      .pipe(unzipper.Parse())
      .on('entry', (entry) => {
        if (entry.type === 'Directory') {
          logger?.logInfo(`log entry folder ${outputFolder}/${entry.path}`);
          FileUtils.ensureFolder(`${outputFolder}/${entry.path}`);
          entry.autodrain();
        } else {
          logger?.logInfo(`log entry file ${outputFolder}/${entry.path}`);
          const fileOutputStream = FileUtils.createTempFile(`${outputFolder}/${entry.path}`);
          entry.pipe(fileOutputStream).on('error', (error) => {
            logger?.logError('unzip failed', error);
            fileOutputStream.end();
            reject(error);
          });
        }
      })
      .on('close', resolve)
      .on('error', (error) => {
        logger?.logError('unzip failed', error);
        reject(error);
      });
  });
}
