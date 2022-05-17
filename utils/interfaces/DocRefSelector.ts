import { getFirestore,connectFirestoreEmulator, getDocs } from "firebase/firestore";
import { collection, doc, setDoc,getDoc } from "firebase/firestore"; 
import { initializeApp } from 'firebase/app';

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
const docRef = doc(db, "cities", "SF");

const workerUtils = {
  data
}
export default workerUtils;

 async function data(){
  const docSnap =  await getDoc(docRef);
  if (docSnap.exists()) {
    //console.log("Document data:", docSnap.data());
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}





















// const solution1 = async () => {
//   const querySnapshot = await getDocs(collection(db, "cities"));
//    querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   //console.log(doc.id, " => ", doc.data());
//   //return doc.data()
//   return (doc.data())
// })
// }


//  const ans = async () => {
//   const dataOutput = await solution1()
//   console.log(dataOutput)
//   return dataOutput
//  }
//  console.log(ans())