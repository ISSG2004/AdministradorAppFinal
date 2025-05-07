// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDPHBDFYyQ-6QRULG8lnMdQyxVZo_at2q8",
  authDomain: "appo-8d144.firebaseapp.com",
  databaseURL: "https://appo-8d144-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "appo-8d144",
  storageBucket: "appo-8d144.firebasestorage.app",
  messagingSenderId: "237782310317",
  appId: "1:237782310317:web:920c263dd754df27c85524",
  measurementId: "G-9W21S1H82Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
