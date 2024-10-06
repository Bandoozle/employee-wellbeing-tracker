import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // Ensure Firebase is configured
import { collection, getDocs } from 'firebase/firestore';

// Updated sentiment data template with corresponding colors
const sentimentDataTemplate = [
  { name: 'Happy', value: 0, color: '#FFD700' }, // Yellow for Happy
  { name: 'Stressed', value: 0, color: '#FF6347' }, // Red for Stressed
  { name: 'Sad', value: 0, color: '#1E90FF' }, // Blue for Sad
  { name: 'Tired', value: 0, color: '#FF4500' }, // Orange for Tired
  { name: 'Neutral', value: 0, color: '#32CD32' }, // Green for Neutral
];

export default function EmployeeDashboard() {
  const [moodData, setMoodData] = useState([]);
  const [sentimentData, setSentimentData] = useState(sentimentDataTemplate);

  useEffect(() => {
    const fetchMoodData = async () => {
      const moodsCollection = collection(db, 'moods'); // Fetch moods from Firebase
      const moodsSnapshot = await getDocs(moodsCollection);
      const moodsList = moodsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Process moods data to get counts for each mood per day
      const moodCounts = {};
      moodsList.forEach(mood => {
        const date = new Date(mood.timestamp); // Ensure correct date parsing
        const day = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); // Get formatted day of the week

        if (!moodCounts[day]) {
          moodCounts[day] = { Happy: 0, Neutral: 0, Stressed: 0, Tired: 0, Sad: 0 };
        }

        // Increment the count based on the mood
        if (mood.mood in moodCounts[day]) {
          moodCounts[day][mood.mood]++;
        }
      });

      // Convert the object into an array for the PieChart
      const formattedMoodData = Object.entries(moodCounts).map(([day, counts]) => ({
        day,
        ...counts,
      }));

      setMoodData(formattedMoodData);
      updateSentimentData(moodCounts);
    };

    const updateSentimentData = (moodCounts) => {
      // Calculate total counts for each sentiment
      const totalCounts = sentimentDataTemplate.map(emotion => {
        const total = Object.values(moodCounts).reduce((acc, curr) => acc + curr[emotion.name], 0);
        return { name: emotion.name, value: total, color: emotion.color }; // Include color in return
      });

      setSentimentData(totalCounts);
    };

    fetchMoodData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <h1 className="text-4xl mb-6 text-center font-edu">October 6, 2024</h1>

      <nav className="flex  font-edu justify-center space-x-6 mb-8">
        <Link to="/employer-home-page" className="text-orange-500 hover:underline">home</Link>
        <Link to="/manage-accounts" className="hover:underline">manage accounts</Link>
        <Link to="/calendar-view" className="hover:underline">calendar</Link>
      </nav>

      <h2 className="mt-20 flex justify-center text-2xl mb-0 font-edu">Your employees are feeling...</h2>

      <div className="flex justify-center">
        <PieChart width={600} height={600}> {/* Increased the size of the PieChart */}
          <Tooltip />
          <Pie
            data={sentimentData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150} // Increased outer radius for bigger sections
            fill="#8884d8"
            label
          >
            {
              sentimentData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} /> // Use color from sentiment data
              ))
            }
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}
