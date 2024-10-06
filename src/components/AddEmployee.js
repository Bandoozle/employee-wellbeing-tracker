import React, { useState } from 'react';
import { createUserWithDetails } from '../firebaseAuth';  // Function to create user and store details in Firestore

export default function AddEmployee() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState('');
  const [employeeType, setEmployeeType] = useState('employee');  // Default is 'employee'
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create user in Firebase Auth and Firestore
      await createUserWithDetails(email, password, name, department, employeeId, employeeType);
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError('Failed to add employee');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      {success && <p className="text-green-500">Employee added successfully!</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">Employee ID</label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="employeeType" className="block text-sm font-medium text-gray-700">Employee Type</label>
          <select
            id="employeeType"
            value={employeeType}
            onChange={(e) => setEmployeeType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="employee">Employee</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg">Add Employee</button>
      </form>
    </div>
  );
}
