import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { db, auth } from '../firebase';  // Firebase imports
import { collection, query, where, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';  // For formatting date

// Define mood colors
const moodColors = {
  Happy: 'bg-yellow-200',
  Stressed: 'bg-red-200',
  Neutral: 'bg-green-200',
  Sad: 'bg-blue-400',
  Tired: 'bg-yellow-600',
};

// Format the date to display
const formatDate = (timestamp) => {
  if (timestamp) {
    return format(new Date(timestamp.seconds * 1000), 'yyyy-MM-dd');  // Format Firestore timestamp
  }
  return 'No date available';
};

export default function MoodLog() {
  const [moodEntries, setMoodEntries] = useState([]);
  const [expandedEntry, setExpandedEntry] = useState(null);
  const [filterMood, setFilterMood] = useState('All');

  // Toggle expanded state for mood details
  const toggleExpand = (index) => {
    setExpandedEntry(expandedEntry === index ? null : index);
  };

  // Fetch mood entries from Firestore
  useEffect(() => {
    const fetchMoodEntries = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const moodsQuery = query(
            collection(db, 'moods'), 
            where('email', '==', user.email)  // Assuming moods are tied to user email
          );
          const moodSnapshot = await getDocs(moodsQuery);
          const moodData = moodSnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            date: formatDate(doc.data().timestamp),  // Format the timestamp
          }));
          setMoodEntries(moodData);
        } catch (error) {
          console.error('Error fetching mood data:', error);
        }
      } else {
        console.error('No authenticated user.');
      }
    };

    fetchMoodEntries();
  }, []);

  // Filter moods
  const filteredEntries = filterMood === 'All' 
    ? moodEntries 
    : moodEntries.filter(entry => entry.mood === filterMood);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start p-4 pt-12">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-edu mb-8 text-center">Your Mood Log</h1>

        <div className="mb-6">
          <label htmlFor="mood-filter" className="block text-sm font-medium font-edu  text-gray-700 mb-2">
            Filter by mood:
          </label>
          <select
            id="mood-filter"
            value={filterMood}
            onChange={(e) => setFilterMood(e.target.value)}
            className="block w-full px-3 py-2 bg-white border font-edu border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="All">All Moods</option>
            <option value="Happy">Happy</option>
            <option value="Stressed">Stressed</option>
            <option value="Neutral">Neutral</option>
            <option value="Sad">Sad</option>
            <option value="Tired">Tired</option>
          </select>
        </div>

        <ul className="space-y-4">
          {filteredEntries.map((entry, index) => (
            <motion.li
              key={entry.id}  // Use unique id from Firestore
              className={`bg-white border border-gray-200 font-edu rounded-lg shadow-sm overflow-hidden ${moodColors[entry.mood]}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div 
                className="px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="font-medium">{entry.date}</span>  {/* Display the formatted date */}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">{entry.mood}</span>
                  {expandedEntry === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </div>
              {expandedEntry === index && (
                <div className="px-4 py-3 font-edu bg-white">
                  <p className="text-gray-700">{entry.insight || 'No additional notes.'}</p>
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
