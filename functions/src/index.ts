//import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import { initializeApp } from 'firebase/app';
const firebaseConfig = {
      apiKey: "AIzaSyCQo925lNcuyxh55whdwSl0CVAH5pvlaqs",
      authDomain: "co-unitest.firebaseio.com",
      databaseURL: "http://localhost:9000/?ns=co-unittest",
      projectId: "co-unittest",
      storageBucket: "co-unittest.appspot.com",
      messagingSenderId: "",
      appId: "1:468871978549:ios:7c1fe358edced3affa9b7c",
      measurementId: ""
    };

const app = initializeApp(firebaseConfig)

import { getDatabase, ref, set } from "firebase/database";
function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
writeUserData(2, 'sodiq', 'sod', 'good')