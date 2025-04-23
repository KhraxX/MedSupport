// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzWHPXzNhRlqDVGwa3heaUD46yoqw9MnQ",
  authDomain: "gsb-support-4f8a5.firebaseapp.com",
  projectId: "gsb-support-4f8a5",
  storageBucket: "gsb-support-4f8a5.firebasestorage.app",
  messagingSenderId: "654204441817",
  appId: "1:654204441817:web:be417b5e6b9c58190d9ac8",
  measurementId: "G-P0KC5YDXD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;