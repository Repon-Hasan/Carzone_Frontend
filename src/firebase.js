// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  //   apiKey: "AIzaSyAoMxfAQjCfPFvv66pvzpmWEgj74FzACo0",
  // authDomain: "assignment-10-f3bf9.firebaseapp.com",
  // projectId: "assignment-10-f3bf9",
  // storageBucket: "assignment-10-f3bf9.firebasestorage.app",
  // messagingSenderId: "574414215522",
  // appId: "1:574414215522:web:a29390f5d86bfd8a0eb43b"

  //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_FIREBASE_APP_ID


    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)