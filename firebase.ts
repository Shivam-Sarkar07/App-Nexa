import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// ------------------------------------------------------------------
// FIREBASE CONFIGURATION
// IMPORTANT: Replace the values below with your own Firebase Project configuration.
// If you do not have your own project, the app will run in "Demo Mode" with mock data,
// but authentication and cloud features will likely fail.
// ------------------------------------------------------------------

const firebaseConfig = {
  // TODO: Replace with your actual Firebase config keys
  apiKey: "AIzaSyAuxngWCstIiQ_u1wOG67CrLeVYMwTNv3g",
  authDomain: "app-nexa.firebaseapp.com",
  projectId: "app-nexa",
  storageBucket: "app-nexa.firebasestorage.app",
  messagingSenderId: "946201764254",
  appId: "1:946201764254:web:9b70c6b97a8e03f9e3f68f",
  measurementId: "G-ZF2FW3HEM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup, signOut, analytics };