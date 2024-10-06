import React, { useState } from 'react';
import { db } from '../firebase';  // Import Firebase Firestore
import { setDoc, doc } from 'firebase/firestore';
import mockMoods from './MOCK_MOODS.json';  // Import your mock moods JSON file

export default function MockAddMoods() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleImportMoods = async () => {
    try {
      const moodEntries = Object.entries(mockMoods);
      
      for (const [key, moodEntry] of moodEntries) {
        const docId = `${moodEntry.employeeId}_${moodEntry.timestamp}`;
        const moodDocRef = doc(db, 'moods', docId);  // Use mood document reference with unique docId
        
        await setDoc(moodDocRef, {
          department: moodEntry.department,
          email: moodEntry.email,
          employeeId: moodEntry.employeeId,
          insight: moodEntry.insight,
          mood: moodEntry.mood,
          timestamp: new Date(moodEntry.timestamp)  // Convert timestamp to Date object
        });
      }

      setSuccess(true);
      setError(null);
    } catch (err) {
      setError('Failed to import moods');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto font-edu bg-white p-6 rounded-lg shadow-md mt-20">
      <h2 className="text-2xl font-bold mb-6">Import Moods</h2>
      {success && <p className="text-green-500">Moods added successfully!</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <button onClick={handleImportMoods} className="w-full py-2 bg-[#db6a59] text-white rounded-lg">
        Import Moods
      </button>
    </div>
  );
}
