import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAiJ4znjIGbmUADlerFnRW31XdHfnzYztI",
  authDomain: "whatsapp-clone-805ff.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-805ff.firebaseio.com",
  projectId: "whatsapp-clone-805ff",
  storageBucket: "whatsapp-clone-805ff.appspot.com",
  messagingSenderId: "76196096445",
  appId: "1:76196096445:web:e976582bed8cb3cf9a0ad4",
  measurementId: "G-706TGH0VL1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
