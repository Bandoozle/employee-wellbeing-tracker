import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';

export default function MoodInput() {
  const { mood } = useParams();
  const [insight, setInsight] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mood:', mood, 'Insight:', insight);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-edu mb-12 text-center">How do you feel today?</h1>

        <div className="flex mb-6">
          <div className="w-20 h-20 bg-black rounded-full mr-6 flex-shrink-0"></div>
          <form onSubmit={handleSubmit} className="flex-1">
            <textarea
              value={insight}
              onChange={(e) => setInsight(e.target.value)}
              className="w-full h-48 bg-gray-200 font-edu text-black rounded-2xl p-6 mb-4 resize-none text-xl"
              placeholder="Share your thoughts..."
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="font-edu text-gray-600 px-6 py-2 text-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-center mt-8">

        </div>
      </motion.div>
    </div>
  );
}