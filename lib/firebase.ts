import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Not sure if we are using firestore, but adding it just in case
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration note the env variable details are saved elsewhere
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
// Not sure if we are using firestore, but adding it just in case
export const db = getFirestore(app)