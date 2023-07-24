import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider} from "firebase/auth";
import { getStorage} from "firebase/storage";
import { collection, getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAxkiY34mC-RPa2wDm9xrCkNzOuxB31HQs",
  authDomain: "social-d02f5.firebaseapp.com",
  projectId: "social-d02f5",
  storageBucket: "social-d02f5.appspot.com",
  messagingSenderId: "96610354082",
  appId: "1:96610354082:web:bc44f6a12a4a5b09b968fb"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
export const provider = new GoogleAuthProvider();

export const postCollection=collection(db,'posts')
