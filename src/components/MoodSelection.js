import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import your images
import happyImage from '../components/icons/happy.png';
import neutralImage from '../components/icons/neutral.png';
import sadImage from '../components/icons/sad.png';
import stressedImage from '../components/icons/stressed.png';
import tiredImage from '../components/icons/tired.png';

// Update the emojis array with image references
const emojis = [
  { icon: happyImage, mood: 'Happy', color: 'text-yellow-400' },
  { icon: neutralImage, mood: 'Neutral', color: 'text-green-600' },
  { icon: sadImage, mood: 'Sad', color: 'text-blue-400' },
  { icon: stressedImage, mood: 'Stressed', color: 'text-red-400' },
  { icon: tiredImage, mood: 'Tired', color: 'text-yellow-600' },
];

export default function MoodSelection() {
  const [showEmojis, setShowEmojis] = useState(false);
  const navigate = useNavigate();

  const handleMoodClick = (mood) => {
    navigate(`/input/${mood}`);
  };

  // Animation settings for emoji fan-out
  const emojiVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      x: i * 60 - 120, // Reduce horizontal spread to make emojis even closer
      y: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 500,
        damping: 30,
      },
    }),
    hover: {
      y: -10, // Move emoji up slightly on hover
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Link to Mood Log */}
      <Link to="/mood-log" className="absolute top-4 right-4 font-edu text-gray-900 ">
        View Mood Log
      </Link>

      <h1 className={`text-8xl font-edu text-gray-900 ${showEmojis ? 'mb-8' : 'mb-10'}`}>
        How do you feel today?
      </h1>

      {/* Emoji Buttons with Fan-Out Animation */}
      {showEmojis && (
        <div className="relative flex items-center justify-center mb-16 max-w-screen-md">
          {emojis.map((emoji, i) => (
            <motion.button
              key={emoji.mood}
              onClick={() => handleMoodClick(emoji.mood)}
              className="flex flex-col items-center p-2 rounded-full mx-0.25"
              custom={i}
              initial="hidden"
              animate="visible"
              whileHover="hover" // Add hover state using framer-motion's `whileHover`
              variants={emojiVariants}
            >
              <img
                src={emoji.icon}
                alt={emoji.mood}
                className={`h-40 w-40 rounded-full object-contain ${emoji.color}`}
              />
              <span className={`mt-1 text-lg font-edu font-semibold ${emoji.color}`}>
                {emoji.mood}
              </span>
            </motion.button>
          ))}
        </div>
      )}

      {/* Plus/X Button to Show Emojis */}
      <motion.div
        className={`flex items-center justify-center transition-all duration-300 ${showEmojis ? 'mt-0' : 'mt-6'}`}
        initial={{ scale: 1 }}
      >
        <button
          onClick={() => setShowEmojis(!showEmojis)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#db6a59] text-white transition-transform duration-300"
          style={{
            transform: showEmojis ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          {showEmojis ? <X className="h-8 w-8" /> : <Plus className="h-8 w-8" />}
        </button>
      </motion.div>
    </motion.div>
  );
}
