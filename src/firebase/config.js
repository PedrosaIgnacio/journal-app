// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBM2kaJ_ZDM4zhcuYtEiHOltHH_YUOh45c",
    authDomain: "react-journal-d0e4c.firebaseapp.com",
    projectId: "react-journal-d0e4c",
    storageBucket: "react-journal-d0e4c.appspot.com",
    messagingSenderId: "523108179502",
    appId: "1:523108179502:web:474735b4afd327816449bf",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const CloudFirestore = getFirestore(FirebaseApp);
