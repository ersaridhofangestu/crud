import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const meta = import.meta.env
const firebaseConfig = {
  apiKey: meta.VITE_API_KEY,
  authDomain: meta.VITE_AUTH_DOMAIN,
  projectId: meta.VITE_PROJECT_ID,
  storageBucket: meta.VITE_STORAGE_BUCKET,
  messagingSenderId: meta.VITE_MESSAGING_SENDER_ID,
  appId: meta.VITE_APP_ID,
};

export const db = getFirestore(initializeApp(firebaseConfig));
export const auth = getAuth(initializeApp(firebaseConfig));
