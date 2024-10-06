import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';  // Using the custom Button component

import happyImage from '../components/icons/happy.png';
import neutralImage from '../components/icons/neutral.png';
import sadImage from '../components/icons/sad.png';
import stressedImage from '../components/icons/stressed.png';
import tiredImage from '../components/icons/tired.png';

export default function MoodInput() {
  const { mood } = useParams();
  const [insight, setInsight] = useState('');
  const navigate = useNavigate();

  // Mapping mood to images
  const moodImages = {
    happy: happyImage,
    neutral: neutralImage,
    sad: sadImage,
    stressed: stressedImage,
    tired: tiredImage,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mood:', mood, 'Insight:', insight);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/mood-selection');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-edu mb-12 text-center">
          {`Tell me why you're feeling ${mood} today.`}
        </h1>

        <div className="flex items-center mb-6">
          <img
            src={moodImages[mood.toLowerCase()]}
            alt={mood}
            className="w-41 h-40 rounded-full mr-8 mb-20"
          />
          <form onSubmit={handleSubmit} className="flex-1">
            <textarea
              value={insight}
              onChange={(e) => setInsight(e.target.value)}
              className="w-full h-64 bg-gray-200 font-edu text-black rounded-2xl p-6 mb-4 resize-none text-xl"
              placeholder="Share your thoughts..."
            />
            <div className="flex justify-between gap-4 mt-4">
              <Button
                onClick={handleCancel}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white" // Updated: Cancel button with gray background and hover effect
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
