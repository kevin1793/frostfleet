// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGfqz7RAD1KucJYfRMj8MxUtyPW1sjaek",
  authDomain: "frostfleet-60d77.firebaseapp.com",
  projectId: "frostfleet-60d77",
  storageBucket: "frostfleet-60d77.firebasestorage.app",
  messagingSenderId: "940006154754",
  appId: "1:940006154754:web:36a50ba479b4b9eb54bd1b",
  measurementId: "G-8P7W8X8RQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);