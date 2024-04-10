import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-SfpBZZ_JSsDLalR--E2QG_l9Vw91NjU",
  authDomain: "portant-d3b85.firebaseapp.com",
  projectId: "portant-d3b85",
  storageBucket: "portant-d3b85.appspot.com",
  messagingSenderId: "1001917297335",
  appId: "1:1001917297335:web:b1ffc7e5b4288078739332",
  measurementId: "G-BWS3MCF0KJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);

export const db = getFirestore(app);;
export const storage =getStorage(app);

