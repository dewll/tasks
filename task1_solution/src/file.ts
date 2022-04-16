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

export function createTempFilePath(fileName: string, folderPath?: string): string {
  const components = folderPath ? [...folderPath.split('/'), fileName] : [fileName];
  const tempFilePath = path.join(os.tmpdir(), ...components);

  return tempFilePath;
}

export function createTempFile(tempFilePath: string): WriteStream {
  if (!tempFilePath.includes(os.tmpdir())) {
    throw new Error('Path should be inside tmp directory');
  }
  return fs.createWriteStream(tempFilePath);
}

export async function downloadTempFile(url: string, destinationPath: string): Promise<void> {
  const file = createTempFile(destinationPath);
  https.get(url, (result) => {
    result.pipe(file);
  });

  await new Promise((resolve, reject) => {
    file.on('finish', resolve);
    file.on('error', reject);
  });
}

export function ensureFolder(tempFolderPath: string): void {
  if (!fs.existsSync(tempFolderPath)) {
    fs.mkdirSync(tempFolderPath, { recursive: true });
  }
}

export function getFolderPath(filePath: string): string {
  return path.dirname(filePath);
}

export function getFileName(filePath: string): string {
  return path.basename(filePath);
}


export function removeTempFile(tempFilePath: string) {
  fs.unlinkSync(tempFilePath);
}

export function writeFile(fileNamePath: string, data: any) {
  const dirname = path.dirname(fileNamePath);
  if (dirname) {
    ensureFolder(dirname);
  }

  fs.writeFile(fileNamePath, JSON.stringify(data), function (err) {
    if (err) throw err;
  });
}

export function readFile(fileNamePath: string): Buffer {
  return fs.readFileSync(fileNamePath);
}
export function removeDir(dirPath: string): Promise<void> {
  return fs.emptyDir(dirPath);
}
