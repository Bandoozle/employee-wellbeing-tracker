import React, { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import { Link } from 'react-router-dom';
import dayGridPlugin from '@fullcalendar/daygrid';
import { db } from '../firebase';  // Import Firestore
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

function CalendarView() {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarEl = calendarRef.current;

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: async function (fetchInfo, successCallback, failureCallback) {
        const startDate = fetchInfo.startStr;
        const endDate = fetchInfo.endStr;  // The end date of the visible range
        console.log(`Fetching events from ${startDate} to ${endDate}`);

        try {
          // Convert start and end dates to Firestore Timestamps for accurate querying
          const startOfDay = new Date(startDate);
          startOfDay.setHours(0, 0, 0, 0); // Start at midnight
          
          const endOfDay = new Date(endDate);
          endOfDay.setHours(23, 59, 59, 999); // End of the last visible day

          // Query Firestore for moods submitted between the start and end date
          const moodsQuery = query(
            collection(db, 'moods'),
            where('timestamp', '>=', Timestamp.fromDate(startOfDay)),
            where('timestamp', '<=', Timestamp.fromDate(endOfDay))
          );

          const querySnapshot = await getDocs(moodsQuery);

          // Initialize a map to track mood counts for each date
          const dailyMoodCounts = {};

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const moodDate = data.timestamp.toDate().toISOString().split('T')[0]; // Extract date portion only
            if (!dailyMoodCounts[moodDate]) {
              dailyMoodCounts[moodDate] = { Happy: 0, Sad: 0, Neutral: 0, Stressed: 0, Tired: 0 };
            }
            if (data.mood && dailyMoodCounts[moodDate].hasOwnProperty(data.mood)) {
              dailyMoodCounts[moodDate][data.mood]++;
            }
          });

          // Log the mood counts for all dates
          console.log("Mood counts for each date:", dailyMoodCounts);

          // Define mood to color mapping
          const moodColorMap = {
            Happy: 'yellow',
            Sad: 'blue',
            Neutral: 'gray',
            Stressed: 'red',
            Tired: 'purple',
          };

          // Create calendar events for each day based on the majority mood
          const events = Object.keys(dailyMoodCounts).map((date) => {
            const moodCount = dailyMoodCounts[date];
            let majorityMood = 'neutral';
            let maxCount = 0;

            Object.keys(moodCount).forEach((mood) => {
              if (moodCount[mood] > maxCount) {
                majorityMood = mood;
                maxCount = moodCount[mood];
              }
            });

            return {
              title: majorityMood.charAt(0).toUpperCase() + majorityMood.slice(1),
              start: date,
              backgroundColor: moodColorMap[majorityMood],
              display: 'background'
            };
          });

          successCallback(events);
        } catch (error) {
          console.error('Error fetching mood data:', error);
          failureCallback(error);
        }
      }
    });

    calendar.render();

    return () => {
      calendar.destroy(); // Clean up calendar instance on component unmount
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <Link to="/" className="absolute top-4 right-4 font-edu text-gray-900 ">
        Login Page
      </Link>
      <h1 className="text-5xl mb-6 text-center font-edu">Calendar View</h1>

      <nav className="flex font-edu justify-center space-x-6 mb-8">
        <Link to="/employer-home-page" className="hover:underline text-2xl">home</Link>
        <Link to="/manage-accounts" className="hover:underline text-2xl">manage accounts</Link>
        <Link to="/calendar-view" className=" text-orange-500 hover:underline text-2xl">calendar</Link>
      </nav>

      <div className="mt-12">
        <div ref={calendarRef} className="bg-white shadow-lg p-6 rounded-lg"></div>
      </div>
    </div>
  );
}

export default CalendarView;
