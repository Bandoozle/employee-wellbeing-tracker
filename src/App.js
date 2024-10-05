import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoodSelection from './components/MoodSelection';
import MoodInput from './components/MoodInput';
import { AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<MoodSelection />} />
          <Route path="/input/:mood" element={<MoodInput />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
