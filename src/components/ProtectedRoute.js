import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isEmployer } from '../firebaseAuth';  // Import the function that checks if user is employer

const ProtectedRoute = ({ children }) => {
  const [isAllowed, setIsAllowed] = useState(null);  // State to check if the user is allowed access

  useEffect(() => {
    async function checkAccess() {
      const allowed = await isEmployer();  // Check if the user is an employer
      setIsAllowed(allowed);
    }

    checkAccess();
  }, []);

  if (isAllowed === null) {
    return <div>Loading...</div>;  // Show a loading state while checking
  }

  return isAllowed ? children : <Navigate to="/unauthorized" />;  // Redirect if not authorized
};

export default ProtectedRoute;
