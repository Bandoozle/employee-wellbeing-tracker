import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const sentimentDataTemplate = [
  { name: 'Happy', value: 0, color: '#FFD700' },
  { name: 'Stressed', value: 0, color: '#FF6347' },
  { name: 'Sad', value: 0, color: '#1E90FF' },
  { name: 'Tired', value: 0, color: '#FF4500' },
  { name: 'Neutral', value: 0, color: '#32CD32' },
];

export default function EmployeeDashboard() {
  const [moodData, setMoodData] = useState([]);
  const [sentimentData, setSentimentData] = useState(sentimentDataTemplate);
  const [timeFrame, setTimeFrame] = useState('Today');

  useEffect(() => {
    const fetchMoodData = async () => {
      const moodsCollection = collection(db, 'moods');
      const moodsSnapshot = await getDocs(moodsCollection);
      const moodsList = moodsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const moodCounts = {};
      moodsList.forEach(mood => {
        const date = new Date(mood.timestamp);
        const day = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        if (!moodCounts[day]) {
          moodCounts[day] = { Happy: 0, Neutral: 0, Stressed: 0, Tired: 0, Sad: 0 };
        }

        if (mood.mood in moodCounts[day]) {
          moodCounts[day][mood.mood]++;
        }
      });

      const formattedMoodData = Object.entries(moodCounts).map(([day, counts]) => ({
        day,
        ...counts,
      }));

      setMoodData(formattedMoodData);
      updateSentimentData(moodCounts);
    };

    const updateSentimentData = (moodCounts) => {
      const totalCounts = sentimentDataTemplate.map(emotion => {
        const total = Object.values(moodCounts).reduce((acc, curr) => acc + curr[emotion.name], 0);
        return { name: emotion.name, value: total, color: emotion.color };
      });

      setSentimentData(totalCounts);
    };

    fetchMoodData();
  }, []);

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

  const isLeftDisabled = timeFrame === 'Today';
  const isRightDisabled = timeFrame === 'This Year';

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <h1 className="text-5xl mb-6 text-center font-edu">October 6, 2024</h1>

      <nav className="flex font-edu justify-center space-x-6 mb-8">
        <Link to="/employer-home-page" className="text-orange-500 hover:underline text-2xl">home</Link>
        <Link to="/manage-accounts" className="hover:underline text-2xl">manage accounts</Link>
        <Link to="/calendar-view" className="hover:underline text-2xl">calendar</Link>
      </nav>

      <div className="flex justify-center items-center mt-4 mb-4 space-x-4">
        <button 
          onClick={() => handleTimeFrameChange('prev')} 
          className={`focus:outline-none transition-opacity duration-300 ${isLeftDisabled ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
          disabled={isLeftDisabled}
        >
          <ChevronLeft className="h-6 w-6 text-gray-500" />
        </button>
        <span className="font-edu text-xl">{timeFrame}</span>
        <button 
          onClick={() => handleTimeFrameChange('next')} 
          className={`focus:outline-none transition-opacity duration-300 ${isRightDisabled ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
          disabled={isRightDisabled}
        >
          <ChevronRight className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <h2 className="mt-4 flex justify-center text-2xl -mb-14 font-edu">Your employees are feeling...</h2>

      <div className="flex justify-center mt-0">
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
            {
              sentimentData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))
            }
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}