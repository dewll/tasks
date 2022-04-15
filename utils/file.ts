import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as https from 'https';
import { WriteStream } from 'fs';

const FileUtils = {
  createTempFilePath,
  createTempFile,
  removeTempFile,
  downloadTempFile,
  removeDir,
  getFileName,
  getFolderPath,
  ensureFolder,
  writeFile,
  readFile,
};

export default FileUtils;

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

function createTempFilePath(fileName: string, folderPath?: string): string {
  const components = folderPath ? [...folderPath.split('/'), fileName] : [fileName];
  const tempFilePath = path.join(os.tmpdir(), ...components);

  return tempFilePath;
}

function createTempFile(tempFilePath: string): WriteStream {
  if (!tempFilePath.includes(os.tmpdir())) {
    throw new Error('Path should be inside tmp directory');
  }
  return fs.createWriteStream(tempFilePath);
}

function ensureFolder(tempFolderPath: string): void {
  if (!fs.existsSync(tempFolderPath)) {
    fs.mkdirSync(tempFolderPath, { recursive: true });
  }
}

function getFileName(filePath: string): string {
  return path.basename(filePath);
}

function getFolderPath(filePath: string): string {
  return path.dirname(filePath);
}

function removeTempFile(tempFilePath: string) {
  fs.unlinkSync(tempFilePath);
}

function removeDir(dirPath: string): Promise<void> {
  return fs.emptyDir(dirPath);
}

function writeFile(fileNamePath: string, data: any) {
  const dirname = path.dirname(fileNamePath);
  if (dirname) {
    ensureFolder(dirname);
  }

  fs.writeFile(fileNamePath, JSON.stringify(data), function (err) {
    if (err) throw err;
  });
}

function readFile(fileNamePath: string): Buffer {
  return fs.readFileSync(fileNamePath);
}
