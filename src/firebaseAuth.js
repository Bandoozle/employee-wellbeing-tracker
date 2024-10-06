import { auth, db } from './firebase';  // Import Firebase auth and Firestore
import { doc, getDoc, setDoc } from 'firebase/firestore';  // Firestore methods
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Function to create a new user in Firebase Authentication and store additional details in Firestore
export async function createUserWithDetails(email, password, name, department, employeeId, employeeType) {
  try {
    // Create the user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store the user details in Firestore under the 'users' collection
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      name,
      department,
      employeeId,
      employeeType,
      createdAt: new Date(),
    });

    console.log('User successfully added to Firestore with email:', user.email);
    return user;
  } catch (error) {
    console.error('Error creating user and storing in Firestore:', error);
    throw error;
  }
}

// Function to check if the current user is an employer
export async function isEmployer() {
  const user = auth.currentUser;  // Get the currently authenticated user

  if (user) {
    // Reference to the user's document in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.employeeType === 'employer';  // Return true if the role is 'employer'
    }
  }
}