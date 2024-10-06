import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { Link } from 'react-router-dom';

const sentimentData = [
  { name: 'Happy', value: 75 },
  { name: 'Stressed', value: 70 },
  { name: 'Sad', value: 65 },
  { name: 'Tired', value: 60 },
  { name: 'Neutral', value: 55 },
];

const trendData = [
  { name: 'Item 1', value: 18 },
  { name: 'Item 2', value: 27 },
  { name: 'Item 3', value: 23 },
  { name: 'Item 4', value: 34 },
  { name: 'Item 5', value: 38 },
];

export default function EmployeeDashboard() {
  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <h1 className="text-4xl mb-6 text-center font-edu">October</h1>

      <nav className="flex justify-center space-x-6 mb-8">
        <Link to="/" className="text-orange-500 hover:underline">home</Link>
        <Link to="/manage-accounts" className="hover:underline">manage accounts</Link>
        <Link to="/calendar-view" className="hover:underline">calendar</Link>
      </nav>

      <h2 className="text-2xl mb-4 font-edu">Your employees are feeling...</h2>
      <p className="mb-6">Your paragraph text</p>

      <div className="flex space-x-8">
        <div className="w-1/2">
          <BarChart width={400} height={300} data={sentimentData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="w-1/2">
          <LineChart width={400} height={300} data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
          </LineChart>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <span className="text-xl font-edu">Employer view</span>
        <button className="bg-gray-200 p-2 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
