import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as https from 'https';
import { WriteStream } from 'fs';

export const FileUtils = {
  createTempFilePath,
  createTempFile,
  removeTempFile,
  downloadTempFile,
  removeDir,
  getFileName,
  getFolderPath,
  createTempFolder,
  tmpFolder,
};

function tmpFolder(){
  return os.tmpdir();
}

function createTempFilePath(fileName: string, folderPath?: string): string {
  const components = folderPath ? [...folderPath.split('/'), fileName] : [fileName];
  const tempFilePath = path.join(tmpFolder(), ...components);

  return tempFilePath;
}

function createTempFile(tempFilePath: string): WriteStream {
  if (!tempFilePath.includes(tmpFolder())) {
    throw new Error('Path should be inside tmp directory');
  }
  return fs.createWriteStream(tempFilePath);
}

async function downloadTempFile(url: string, destinationPath: string): Promise<void> {
  const file = createTempFile(destinationPath);
  https.get(url, (result) => {
    result.pipe(file);
  });

  await new Promise((resolve, reject) => {
    file.on('finish', resolve);
    file.on('error', reject);
  });
}


function createTempFolder(tempFolderPath: string): void {
  if (!fs.existsSync(tempFolderPath)) {
    fs.mkdirSync(tempFolderPath, { recursive: true });
  }
}

function getFolderPath(filePath: string): string {
  return path.dirname(filePath);
}

function getFileName(filePath: string): string {
  return path.basename(filePath);
}


function removeTempFile(tempFilePath: string) {
  fs.unlinkSync(tempFilePath);
}


function removeDir(dirPath: string): Promise<void> {
  if (dirPath.includes(tmpFolder())){
  return fs.emptyDir(dirPath);
}
}


