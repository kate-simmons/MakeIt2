// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0P3aP-cyYumcjIHNdjN77EPAb95hFmKQ",
  authDomain: "fir-9b982.firebaseapp.com",
  projectId: "fir-9b982",
  storageBucket: "fir-9b982.appspot.com",
  messagingSenderId: "230948116212",
  appId: "1:230948116212:web:636ab560d607dbfbf870a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export default db;
