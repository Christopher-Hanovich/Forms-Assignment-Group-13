import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Not sure if we are using firestore, but adding it just in case
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration note the env variable details are saved elsewhere
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
// Not sure if we are using firestore, but adding it just in case
export const db = getFirestore(app)