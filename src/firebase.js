// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA67o0KB-OvVIe10yIq4LOkBFPx-wHy9TA",
  authDomain: "careconnect-be5cd.firebaseapp.com",
  projectId: "careconnect-be5cd",
  storageBucket: "careconnect-be5cd.appspot.com",
  messagingSenderId: "623736306570",
  appId: "1:623736306570:web:93a163f4303d3332c22673",
  measurementId: "G-2D1KBFFJ4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { signInWithEmailAndPassword };
