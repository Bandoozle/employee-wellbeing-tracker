import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { db } from '../firebase'; // Ensure this points to your firebase.js file
import { collection, getDocs } from 'firebase/firestore';

const sentimentDataTemplate = [
  { name: 'Happy', value: 0, color: '#FFD700' },
  { name: 'Stressed', value: 0, color: '#FF6347' },
  { name: 'Sad', value: 0, color: '#1E90FF' },
  { name: 'Tired', value: 0, color: '#FF4500' },
  { name: 'Neutral', value: 0, color: '#32CD32' },
];

export default function EmployerHomePage() {
  const [sentimentData, setSentimentData] = useState(sentimentDataTemplate);
  const [timeFrame, setTimeFrame] = useState('Today');

  useEffect(() => {
    const fetchMoodData = async () => {
      const moodsCollection = collection(db, 'moods');
      const moodsSnapshot = await getDocs(moodsCollection);
      const moodsList = moodsSnapshot.docs.map(doc => doc.data());

      // Log the fetched moods data
      console.log('Fetched moods data:', moodsList);

      // Get today's date and the beginning of the time frames
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      // Calculate start of the week (Tuesday)
      const startOfWeek = new Date(now);
      const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      
      // Adjust for week start on Tuesday
      if (dayOfWeek >= 2) { // Tuesday or later
        startOfWeek.setDate(now.getDate() - (dayOfWeek - 2)); // Move back to last Tuesday
      } else { // Sunday or Monday
        startOfWeek.setDate(now.getDate() - (dayOfWeek + 5)); // Move back to last Tuesday
      }

      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfYear = new Date(now.getFullYear(), 0, 1);

      // Process mood data to count occurrences based on the selected time frame
      const moodCounts = {
        Happy: 0,
        Stressed: 0,
        Sad: 0,
        Tired: 0,
        Neutral: 0,
      };

      moodsList.forEach(mood => {
        const moodDate = new Date(mood.timestamp.seconds * 1000); // Convert Firestore timestamp to Date

        // Log the mood date for debugging
        console.log('Mood date:', moodDate);

        // Check if the mood date falls within the selected time frame
        if (timeFrame === 'Today' && moodDate >= startOfDay) {
          moodCounts[mood.mood]++;
        } else if (timeFrame === 'This Week' && moodDate >= startOfWeek && moodDate <= now) {
          moodCounts[mood.mood]++;
        } else if (timeFrame === 'This Month' && moodDate >= startOfMonth) {
          moodCounts[mood.mood]++;
        } else if (timeFrame === 'This Year' && moodDate >= startOfYear) {
          moodCounts[mood.mood]++;
        }
      });

      // Log the mood counts for debugging
      console.log('Mood counts:', moodCounts);

      // Map the counts to the sentiment data structure
      const updatedSentimentData = sentimentDataTemplate.map(emotion => ({
        name: emotion.name,
        value: moodCounts[emotion.name],
        color: emotion.color,
      }));

      setSentimentData(updatedSentimentData);
    };

    fetchMoodData();
  }, [timeFrame]); // Run effect whenever timeFrame changes

  const handleTimeFrameChange = (direction) => {
    const timeFrames = ['Today', 'This Week', 'This Month', 'This Year'];
    const currentIndex = timeFrames.indexOf(timeFrame);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % timeFrames.length;
    } else {
      newIndex = (currentIndex - 1 + timeFrames.length) % timeFrames.length;
    }

    setTimeFrame(timeFrames[newIndex]);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <Link to="/" className="absolute top-4 right-4 font-edu text-gray-900 ">
        Login Page
      </Link>
      <h1 className="text-5xl mb-6 text-center font-edu">October 6, 2024</h1>

      <nav className="flex font-edu justify-center space-x-6 mb-8">
        <Link to="/employer-home-page" className="text-orange-500 hover:underline text-2xl">home</Link>
        <Link to="/manage-accounts" className="hover:underline text-2xl">manage accounts</Link>
        <Link to="/calendar-view" className="hover:underline text-2xl">calendar</Link>
      </nav>

      <div className="flex justify-center items-center mt-4 mb-4 space-x-4">
        <button 
          onClick={() => handleTimeFrameChange('prev')} 
          className={`focus:outline-none transition-opacity duration-300`}
        >
          <ChevronLeft className="h-6 w-6 text-gray-500" />
        </button>
        <span className="font-edu text-xl">{timeFrame}</span>
        <button 
          onClick={() => handleTimeFrameChange('next')} 
          className={`focus:outline-none transition-opacity duration-300`}
        >
          <ChevronRight className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <h2 className="mt-4 flex justify-center text-2xl -mb-14 font-edu">Your Employees Are Feeling...</h2>

      <div className="flex justify-center mt-0">
        {sentimentData && sentimentData.some(data => data.value > 0) ? (
          <PieChart width={600} height={600}>
          <Tooltip />
          <Pie
            data={sentimentData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={170}
            fill="#8884d8"
            label
          >
            {sentimentData.map((entry) => (
              <Cell 
                key={entry.name} 
                fill={entry.color} 
                style={{ outline: 'none' }} // Disable the default outline on hover
              />
            ))}
          </Pie>
        </PieChart>
        
        ) : (
          <div>No mood data available for the selected time frame.</div>
        )}
      </div>
    </div>
  );
}
