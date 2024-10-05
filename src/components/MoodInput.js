import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function MoodInput() {
  const { mood } = useParams(); // Get mood from URL params
  const [insight, setInsight] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mood:', mood, 'Insight:', insight);
    navigate('/'); // Navigate back after submission
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">You're feeling {mood}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="insight" className="block text-sm font-medium text-gray-700">
              Tell us more about why you're feeling {mood.toLowerCase()}:
            </label>
            <textarea
              id="insight"
              rows={4}
              value={insight}
              onChange={(e) => setInsight(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Share your thoughts..."
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
