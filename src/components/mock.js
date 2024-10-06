import React, { useState } from 'react'; 
import { createUserWithDetails } from '../firebaseAuth';  // Function to create user and store details in Firestore
import mockData from './MOCK_DATA(2).json';  // Import your mock data JSON file

export default function MockAdd() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleImport = async () => {
    try {
      const employeeEntries = Object.entries(mockData);
      for (const [key, employee] of employeeEntries) {
        await createUserWithDetails(
          employee.email,
          employee.password,
          employee.name,
          employee.department,
          employee.id,           // Pass employee id
          employee.employeeType  // Pass employee type
        );
      }
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError('Failed to import employees');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto font-edu bg-white p-6 rounded-lg shadow-md mt-20">
      <h2 className="text-2xl font-bold mb-6">Import Employees</h2>
      {success && <p className="text-green-500">Employees added successfully!</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <button onClick={handleImport} className="w-full py-2 bg-[#db6a59] text-white rounded-lg">
        Import Employees
      </button>
    </div>
  );
}
