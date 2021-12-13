import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getDatabase, ref, set,push ,onValue} from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBomc2k_47p5ksM8-_OdGqwXfz8rNrUlU8",
  authDomain: "bizcon-c47c6.firebaseapp.com",
  databaseURL: "https://bizcon-c47c6-default-rtdb.firebaseio.com",
  projectId: "bizcon-c47c6",
  storageBucket: "bizcon-c47c6.appspot.com",
  messagingSenderId: "672104642834",
  appId: "1:672104642834:web:888b0e854fbebdad2a5bcb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, getDatabase, ref, set, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut, getAuth,push,onValue };

