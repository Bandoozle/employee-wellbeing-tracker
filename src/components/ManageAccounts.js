import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Ensure Firebase is configured
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';

export default function ManageAccounts() {
  const [accountsData, setAccountsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      const accountsCollection = collection(db, 'users'); // Firebase collection
      const accountsSnapshot = await getDocs(accountsCollection);
      const accountsList = accountsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAccountsData(accountsList);
    };

    fetchAccounts();
  }, []);

  // Filter accounts based on the search term
  const filteredAccounts = accountsData.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this account?");
    if (confirmDelete) {
      try {
        const accountDoc = doc(db, 'users', id); // Use 'users' collection
        const docSnapshot = await getDoc(accountDoc);

        if (docSnapshot.exists()) {
          await deleteDoc(accountDoc);
          console.log("Document deleted successfully.");

          // Update state to remove the deleted account
          setAccountsData(prevAccounts => 
            prevAccounts.filter(account => account.id !== id)
          );
        } else {
          console.log("No such document exists.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <h1 className="text-4xl mb-6 text-center font-edu">October 6, 2024</h1>

      <nav className="flex justify-center font-edu space-x-6 mb-8">
        <Link to="/employer-home-page" className="hover:underline">home</Link>
        <Link to="/manage-accounts" className="text-orange-500 hover:underline">manage accounts</Link>
        <Link to="/calendar-view" className="hover:underline">calendar</Link>
      </nav>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>

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
              {filteredAccounts.map((account) => (
                <tr key={account.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{account.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                    <button 
                      className="text-red-600 hover:text-red-900" 
                      onClick={() => handleDelete(account.id)} // Call handleDelete on button click
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        {/* Add Employee Button */}
        <button
          onClick={() => navigate('/add-employee')}
          className=" text-white  font-edu p-1.5 rounded bg-[#db6a59] hover:bg-[#c66152]"
        >
          Add Employee
        </button>

        {/* Back Button */}
        <Link to="/" className="bg-gray-200 p-2 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
