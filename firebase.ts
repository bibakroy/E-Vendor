import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBKkkoZztFQXp7LeqhK-HJl4dUJTiiaBVo",
  authDomain: "e-vendor-347019.firebaseapp.com",
  projectId: "e-vendor-347019",
  storageBucket: "e-vendor-347019.appspot.com",
  messagingSenderId: "868478622401",
  appId: "1:868478622401:web:5f8cc9286aae54622a1240",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBKkkoZztFQXp7LeqhK-HJl4dUJTiiaBVo",
//   authDomain: "e-vendor-347019.firebaseapp.com",
//   projectId: "e-vendor-347019",
//   storageBucket: "e-vendor-347019.appspot.com",
//   messagingSenderId: "868478622401",
//   appId: "1:868478622401:web:5f8cc9286aae54622a1240",
// };

// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);
// export default db;
