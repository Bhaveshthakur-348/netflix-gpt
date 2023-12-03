// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7V4JfEhQj_6mP9xpMgrmqg74OHcgTvUc",
  authDomain: "netflixgpt-eafcc.firebaseapp.com",
  projectId: "netflixgpt-eafcc",
  storageBucket: "netflixgpt-eafcc.appspot.com",
  messagingSenderId: "852983374031",
  appId: "1:852983374031:web:0a2faf946390185a7f97ba",
  measurementId: "G-6EJJRYGMKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();