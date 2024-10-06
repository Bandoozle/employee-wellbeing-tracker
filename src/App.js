import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoodSelection from './components/MoodSelection';
import MoodInput from './components/MoodInput';
import { AnimatePresence } from 'framer-motion';  // For animations
import LoginPage from './components/LoginPage';  // Ensure LoginPage is the default export if not named
import './App.css';  // Custom CSS
import ProtectedRoute from './components/ProtectedRoute';
import AddEmployee from './components/AddEmployee';

function App() {
  return (
    <Router>
      {/* AnimatePresence allows for animations when components are added or removed */}
      <AnimatePresence mode="wait">
        <Routes>
          {/* Route to the login page */}
          <Route path="/" element={<LoginPage />} />

          {/* Route to mood selection page */}
          <Route path="/add-employee" element={<AddEmployee />} />  
          
          {/* Route to mood selection page */}
          <Route path="/mood-selection" element={<MoodSelection />} /> 
          
          {/* Route for mood input, with the selected mood passed as a parameter */}
          <Route path="/input/:mood" element={<MoodInput />} /> 
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
