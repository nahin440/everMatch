// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYR8qQliKF-sFZP3tThuu7nDy1oYJNvJ4",
  authDomain: "simple-firebase-2-4c91f.firebaseapp.com",
  projectId: "simple-firebase-2-4c91f",
  storageBucket: "simple-firebase-2-4c91f.firebasestorage.app",
  messagingSenderId: "680444079594",
  appId: "1:680444079594:web:c6e72dbef8409ab6a15693"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth