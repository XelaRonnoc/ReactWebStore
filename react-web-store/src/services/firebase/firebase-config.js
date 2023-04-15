// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyB4G1DeSow1RFFlC5qrC7pe1QPgsXDZEIg",

    authDomain: "web-store-db-1907d.firebaseapp.com",

    projectId: "web-store-db-1907d",

    storageBucket: "web-store-db-1907d.appspot.com",

    messagingSenderId: "488762458712",

    appId: "1:488762458712:web:09b6f6d2dcf6d467e2c02d",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);
