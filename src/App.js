import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoodSelection from './components/MoodSelection';
import MoodInput from './components/MoodInput';
import { AnimatePresence } from 'framer-motion';  // For animations
import LoginPage from './components/LoginPage';  // Ensure LoginPage is the default export if not named
import './App.css';  // Custom CSS
import ProtectedRoute from './components/ProtectedRoute';
import AddEmployee from './components/AddEmployee';
import EmployerHomePage from './components/EmployerHomePage';
import CalendarView from './components/Calendar';
import ManageAccounts from './components/ManageAccounts';
import MoodResult from './components/MoodResult';
import MoodLog from './components/MoodLog';
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
          <Route path="/manage-accounts" element={<ManageAccounts />} /> 

          <Route path="/employer-home-page" element={<EmployerHomePage />} />   

          {/* Route to mood selection page */}
          <Route path="/calendar-view" element={<CalendarView />} />  

          {/* Route to mood selection page */}
          <Route path="/mood-selection" element={<MoodSelection />} /> 
          
          {/* Route for mood input, with the selected mood passed as a parameter */}
          <Route path="/input/:mood" element={<MoodInput />} /> 

          <Route path="/mood-result/:mood" element={<MoodResult />} />

          <Route path="/mood-log/" element={<MoodLog />} />
      
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
