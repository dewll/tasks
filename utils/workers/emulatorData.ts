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
