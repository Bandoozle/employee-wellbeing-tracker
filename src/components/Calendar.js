import React, { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
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
      calendar.destroy();  // Clean up calendar instance on component unmount
    };
  }, []);

  return <div ref={calendarRef} />;
}

export default CalendarView;
