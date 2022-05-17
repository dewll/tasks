import ZipUtils from '../zip';
import FileUtils from '../file';
//import { BaseCommandWorker } from '../../../base';
import { addDaysInDate } from '../time';
//import { DatabaseReference } from '../../../../core/firebase/rtdb/rtdb';
//import { DocRefSelector } from '../../../../core/firebase/firestore/firestore-repo';
import {BaseCommandWorker} from '../interfaces/BaseCommandWorker';
import DatabaseReference from '../interfaces/DatabaseReference';
import DocRefSelector from '../interfaces/DocRefSelector';
import firebase from 'firebase/app';
import 'firebase/firestore';
//import firestore from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref,set, onValue } from "firebase/database";
import { collection, doc, setDoc } from "firebase/firestore"; 
import { getFirestore,connectFirestoreEmulator, getDocs } from "firebase/firestore";
import { DocumentReference } from '@firebase/firestore-types';

const firebaseConfig = {
      apiKey: "AIzaSyCQo925lNcuyxh55whdwSl0CVAH5pvlaqs",
      authDomain: "co-unitest.firebaseio.com",
      databaseURL: "http://localhost:8080/emulator/?ns=co-unittest",
      projectId: "co-unittest",
      storageBucket: "co-unittest.appspot.com",
      messagingSenderId: "",
      appId: "1:468871978549:ios:7c1fe358edced3affa9b7c",
      measurementId: ""
    };

const app = initializeApp(firebaseConfig)
//const db = getDatabase(app);
const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

const citiesRef = collection(db, "cities");
const test = async () => {
  await setDoc(doc(citiesRef, "SF"), {
    name: "San Francisco", state: "CA", country: "USA",
    capital: true, population: 90000,
    regions: ["west_coast", "norcal"] });
    await setDoc(doc(citiesRef, "LA"), {
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"] });
    console.log('wri')
    await setDoc(doc(citiesRef, "DC"), {
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] });
    await setDoc(doc(citiesRef, "TOK"), {
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"] });
    await setDoc(doc(citiesRef, "BJ"), {
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"] });
}

const ans= test()
console.log(ans)







// export class ExportArchiverWorker implements BaseCommandWorker {
//   storage
//   async generateArchive(
//     userId: string,
//     refs:DatabaseReference[],
//     docs:any,
//     folders: string[]
//   ): Promise<string> {
//     const tempExportFolder = FileUtils.createTempFilePath(`export-${userId}`);
//     FileUtils.ensureFolder(tempExportFolder);
//     {
      
//      const promises = refs.map(async (ref, index) => {
//         //const snapshot =   await ref.get();
//         //const data =    snapshot.val();
//         const data = 'good'
//         //console.log(data)
//         if (data) {
//           FileUtils.writeFile(`${tempExportFolder}/allObjects/objects-${index}.txt`, data);
//         }
//       });
//       await Promise.all(promises);
//     }
//     {
//       const promises = docs.map(async (doc) => {
//         const data =   await doc.get();
//         //const data = 'docS'
//         return data;
//       });
//       const allData =  await Promise.all(promises);
//       if (allData) {
//         FileUtils.writeFile(`${tempExportFolder}/allDocuments.txt`, allData);
//       }
//     }
//     {
//       const promises = folders.map(async (folderPath, index) => {
//       const files = await this.storage.fetchFilesFromFolder(folderPath);
//       const expireDate = addDaysInDate(new Date(), 30);
//       const links = await this.storage.getDownloadingLinks(files, expireDate);
//       //const links = ['http','www']
//        if (links) {
//          FileUtils.writeFile(`${tempExportFolder}/allImages/images-${index}.txt`, { links });
//        }
//       });
//       await Promise.all(promises);
//     }
//     const tempExportZipName = `${tempExportFolder}.zip`;
//     await  ZipUtils.zipFolder(tempExportFolder, tempExportZipName );
//     //FileUtils.removeDir(tempExportFolder);
//     return tempExportZipName;
//   }
// }

// //const name = ['']
// const dbReference1 = (collection(db, "cities"));
// const cityRef = collection(db, "cities")
// const ans =  new ExportArchiverWorker().generateArchive('1',[],cityRef,['',''])
// console.log(ans)


// function writeUserData(userId, name, email, imageUrl) {
//   set(ref(db, 'users/' + userId), {
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }
// writeUserData(3, 'sodiq', 'sod', 'good')

// const starCountRef = ref(db, 'users/' + 1);
// onValue(starCountRef, (snapshot) => {
//   const output = snapshot.val();
//   return output
//   //console.log(data)
//   //updateStarCount(postElement, data);
// });