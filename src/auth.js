import firebase from "firebase/app";
import "firebase/auth";
import convex from "./convex";

// Initialize Firebase (example)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Handle login with Google
export async function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;

    // Call Convex function to log the user in (backend)
    const convexUser = await convex.mutation('auth/login')({
      provider: 'google',
      userId: user.uid,
      userInfo: {
        name: user.displayName,
        email: user.email,
      },
    });

    // Display user information
    document.getElementById("userInfo").innerText = `Logged in as: ${convexUser.name}`;
  } catch (error) {
    console.error("Login error:", error);
  }
}
