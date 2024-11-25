// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBe3gchiK5iLWIzO2DOyecTUFpyygrBvsU",
  authDomain: "blogs-3c962.firebaseapp.com",
  projectId: "blogs-3c962",
  storageBucket: "blogs-3c962.firebasestorage.app",
  messagingSenderId: "610991509902",
  appId: "1:610991509902:web:608b18c42b5bc2724854df",
  measurementId: "G-M0YQELF4WY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)