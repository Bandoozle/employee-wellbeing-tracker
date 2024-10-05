import React, { useState } from 'react';
import { Smile, Frown, Meh, Zap, Coffee, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const emojis = [
  { icon: Smile, mood: 'Happy', color: 'text-yellow-500' },
  { icon: Meh, mood: 'Neutral', color: 'text-gray-500' },
  { icon: Frown, mood: 'Sad', color: 'text-blue-500' },
  { icon: Zap, mood: 'Energetic', color: 'text-purple-500' },
  { icon: Coffee, mood: 'Tired', color: 'text-brown-500' },
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
      x: i * 100 - 200, // Spread out horizontally more
      y: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 500,
        damping: 30,
      },
    }),
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className={`text-6xl font-semibold text-gray-900 ${showEmojis ? 'mb-20' : 'mb-10'}`}>
        How do you feel today?
      </h1>

      {/* Emoji Buttons with Fan-Out Animation */}
      {showEmojis && (
        <div className="relative flex items-center justify-center mb-16"> {/* Increased margin when pressed */}
          {emojis.map((emoji, i) => (
            <motion.button
              key={emoji.mood}
              onClick={() => handleMoodClick(emoji.mood)}
              className="absolute flex flex-col items-center p-2 rounded-full"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={emojiVariants}
            >
              <emoji.icon className={`h-16 w-16 ${emoji.color}`} />
              <span className="mt-2 text-lg text-gray-600">{emoji.mood}</span>
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
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-400 to-orange-500 text-white transition-transform duration-300"
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
