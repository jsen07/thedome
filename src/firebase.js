import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database"
import { getFirestore } from "firebase/firestore";


const app = firebase.initializeApp ({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  });
  
export const auth = app.auth();
export const db = app.database();
export const dbf = getFirestore(app);
export default app