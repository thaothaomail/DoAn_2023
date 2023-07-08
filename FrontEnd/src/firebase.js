import firebase from "firebase";
// import { getStorage } from "firebase/storage";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDgNeSyjYVrGXPzruAS6tojBgi_VUamhig",
  authDomain: "translate-app-5e443.firebaseapp.com",
  projectId: "translate-app-5e443",
  storageBucket: "translate-app-5e443.appspot.com",
  messagingSenderId: "1010964978359",
  appId: "1:1010964978359:web:8fb0e3b0d92583e7354b32",
  measurementId: "G-MDH42VTFSH",
};

firebase.initializeApp(firebaseConfig);
// export const storage = getStorage(app)
const storage = firebase.storage();

export { storage, firebase as default };
