// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJ7Q248lmzaK0q5Lns2iU6fI0feDocbXE",
    authDomain: "property-search-3033e.firebaseapp.com",
    projectId: "property-search-3033e",
    storageBucket: "property-search-3033e.appspot.com",
    messagingSenderId: "1010962302023",
    appId: "1:1010962302023:web:5baf4c694ef3a945c39d62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);