import ZipUtils from '../zip';
import FileUtils from '../file';
//import { BaseCommandWorker } from '../../../base';
import { addDaysInDate } from '../time';
//import { DatabaseReference } from '../../../../core/firebase/rtdb/rtdb';
//import { DocRefSelector } from '../../../../core/firebase/firestore/firestore-repo';
import {BaseCommandWorker} from '../interfaces/BaseCommandWorker';
import DatabaseReference from '../interfaces/DatabaseReference';
import DocRefSelector from '../interfaces/DocRefSelector';



export class ExportArchiverWorker implements BaseCommandWorker {
  storage
  async generateArchive(
    userId: string,
    refs:DatabaseReference[],
    docs:DocRefSelector[],
    folders: string[]
  ): Promise<string> {
    const tempExportFolder = FileUtils.createTempFilePath(`export-${userId}`);
    FileUtils.ensureFolder(tempExportFolder);
    {
      
     const promises = refs.map(async (ref, index) => {
        const snapshot =   await ref.get();
        const data =    snapshot.val();
        if (data) {
          FileUtils.writeFile(`${tempExportFolder}/allObjects/objects-${index}.txt`, data);
        }
      });
      await Promise.all(promises);
    }
    {
      const promises = docs.map(async (doc) => {
        const data =   await doc.get();
        return data;
      });
      const allData =  await Promise.all(promises);
      if (allData) {
        FileUtils.writeFile(`${tempExportFolder}/allDocuments.txt`, allData);
      }
    }
    {
      const promises = folders.map(async (folderPath, index) => {
      const files = await this.storage.fetchFilesFromFolder(folderPath);
      const expireDate = addDaysInDate(new Date(), 30);
      const links = await this.storage.getDownloadingLinks(files, expireDate);
       if (links) {
         FileUtils.writeFile(`${tempExportFolder}/allImages/images-${index}.txt`, { links });
       }
      });
      await Promise.all(promises);
    }
    const tempExportZipName = `${tempExportFolder}.zip`;
    await  ZipUtils.zipFolder(tempExportFolder, tempExportZipName );
    FileUtils.removeDir(tempExportFolder);
    return tempExportZipName;
  }
}

