import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';
import { getFunctions } from 'firebase/functions';

export const firebaseConfig = {
 apiKey: "AIzaSyCglU69joF_vomVDOG_vnNe8UYHsnPWjxE",
  authDomain: "rent-111e2.firebaseapp.com",
  projectId: "rent-111e2",
  storageBucket: "rent-111e2.firebasestorage.app",
  messagingSenderId: "146472004635",
  appId: "1:146472004635:web:0881ef09fcb373f5fb5cbe",
  measurementId: "G-2YS9K9QG7Q"
};

// export const firebaseApp = initializeApp(config);
export const app = initializeApp(firebaseConfig);
// export const storage = getStorage(firebaseApp);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
// export const analytics = getAnalytics(app);
// export const analytics = getAnalytics(firebaseApp);
export const functions = getFunctions(app);
// export const functions = getFunctions(firebaseApp);
