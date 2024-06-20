import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "clean-architecture-todoapp.firebaseapp.com",
  projectId: "clean-architecture-todoapp",
  storageBucket: "clean-architecture-todoapp.appspot.com",
  messagingSenderId: "698447677811",
  appId: "1:698447677811:web:c0db685f83868c31799d06",
};
console.log(process.env.FIREBASE_APIKEY);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
