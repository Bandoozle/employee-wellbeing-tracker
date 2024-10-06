import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoodSelection from './components/MoodSelection';
import MoodInput from './components/MoodInput';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import CalendarView from './components/Calendar'; 

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<MoodSelection />} />
          <Route path="/input/:mood" element={<MoodInput />} />
          <Route path="/calendar" element={<CalendarView />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
