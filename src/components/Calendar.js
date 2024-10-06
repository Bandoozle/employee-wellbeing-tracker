import React, { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import { Link } from 'react-router-dom';
import dayGridPlugin from '@fullcalendar/daygrid';
// import '@fullcalendar/core/main.min.css';    // Import FullCalendar base styles
// import '@fullcalendar/daygrid/main.min.css';    // Import DayGrid styles

function CalendarView() {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarEl = calendarRef.current;

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: async function (fetchInfo, successCallback, failureCallback) {
        const start = fetchInfo.startStr;
        try {
          const response = await fetch(`/api/getMoodForDate?date=${start}`);
          const data = await response.json();

          const moodColorMap = {
            happy: 'yellow',
            sad: 'blue',
            neutral: 'gray',
            angry: 'red'
          };

          successCallback([
            {
              title: data.majorityMood || 'No Data',
              start: start,
              backgroundColor: moodColorMap[data.majorityMood || 'neutral'],
              display: 'background'
            }
          ]);
        } catch (error) {
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
      <h1 className="text-4xl mb-6 text-center font-edu">October 6, 2024</h1>

      <nav className="flex justify-center font-edu space-x-6 mb-8">
        <Link to="/employer-home-page" className="text-orange-500 hover:underline">home</Link>
        <Link to="/manage-accounts" className="hover:underline">manage accounts</Link>
        <Link to="/calendar-view" className="hover:underline">calendar</Link>
      </nav>

      {/* Add margin to push the calendar down */}
      <div className="mt-12">
        <div ref={calendarRef} className="bg-white shadow-lg p-6 rounded-lg"></div>
      </div>
    </div>
  );
}

export default CalendarView;
