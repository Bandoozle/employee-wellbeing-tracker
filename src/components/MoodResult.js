import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import happyImage from '../components/icons/happy.png';
import neutralImage from '../components/icons/neutral.png';
import sadImage from '../components/icons/sad.png';
import stressedImage from '../components/icons/stressed.png';
import tiredImage from '../components/icons/tired.png';

const moodImages = {
  happy: happyImage,
  neutral: neutralImage,
  sad: sadImage,
  stressed: stressedImage,
  tired: tiredImage,
};

const moodMessages = {
  happy: "It's great to feel happy!",
  neutral: "It's okay to feel neutral.",
  sad: "It's okay to be sad sometimes.",
  stressed: "It's okay to take a rest...",
  tired: "It's okay to take a rest...",
};

export default function MoodResult() {
  const { mood } = useParams();
  const navigate = useNavigate();

  // After 3 seconds, navigate to the next page (e.g., homepage or another page)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/mood-log');
    }, 3000);

    return () => clearTimeout(timer);  // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-edu font-handwriting mb-8">You're feeling..</h1>
        <div className="w-41 h-40">
          {/* Display the correct mood image */}
          <img
            src={moodImages[mood.toLowerCase()]}
            alt={mood}
            className="w-full h-full rounded-full object-contain"
          />
        </div>
        <p className="mt-6 text-3xl font-edu text-center text-black px-8 py-4 rounded-full font-handwriting">
          {moodMessages[mood.toLowerCase()] || "How are you feeling?"}
        </p>
      </motion.div>
    </div>
  );
}
