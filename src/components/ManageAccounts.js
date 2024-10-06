// npm install react-router-dom recharts

import React from 'react';
import { Link } from 'react-router-dom';

const accountsData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Sales' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Engineering' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'Marketing' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', department: 'Customer Support' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', department: 'HR' },
  { id: 6, name: 'Eva Wilson', email: 'eva@example.com', department: 'Sales' },
  { id: 7, name: 'Frank Miller', email: 'frank@example.com', department: 'Engineering' },
  { id: 8, name: 'Grace Lee', email: 'grace@example.com', department: 'Marketing' },
  { id: 9, name: 'Henry Taylor', email: 'henry@example.com', department: 'Customer Support' },
  { id: 10, name: 'Ivy Chen', email: 'ivy@example.com', department: 'HR' },
];

export default function ManageAccounts() {
  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <h1 className="text-4xl mb-6 text-center font-edu">Manage Accounts</h1>
      
      <nav className="flex justify-center space-x-6 mb-8">
        <Link to="/" className="hover:underline">home</Link>
        <Link to="/manage-accounts" className="text-orange-500 hover:underline">manage accounts</Link>
        <Link to="/calendar-view" className="hover:underline">calendar</Link>
      </nav>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar" style={{ maxHeight: '400px' }}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accountsData.map((account) => (
                <tr key={account.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{account.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <span className="text-xl font-edu">Back to Overview</span>
        <Link to="/" className="bg-gray-200 p-2 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}