import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import '../styles/calendar.css';

// Initialize the localizer for react-big-calendar
const localizer = momentLocalizer(moment);
const today = new Date();

// Sample events array
// TODO: Remove STUBS
const events = [
  {
    title: 'All-Hands Company Meeting',
    start: new Date(2025, 1, 27, 8, 30), // Feb 27, 2025, 8:30 AM
    end: new Date(2025, 1, 27, 9, 30),   // Feb 27, 2025, 9:30 AM
    allDay: false,
  },
  {
    title: 'Design Review',
    start: new Date(2025, 1, 27, 13, 0), // Feb 27, 2025, 1:00 PM
    end: new Date(2025, 1, 27, 14, 0),   // Feb 27, 2025, 2:00 PM
    allDay: false,
  },
  {
    title: 'Morning Standup',
    start: new Date(2025, 1, 27, 9, 0),
    end: new Date(2025, 1, 27, 9, 30),
  },
  {
    title: 'Weekly Sync',
    start: new Date(2025, 1, 28, 11, 0),
    end: new Date(2025, 1, 28, 12, 0),
  },
];

const MyCalendar = () => {
  return (
    <div style={{ height: '80vh', margin: '20px'}}>
      <div style={{position: 'absolute', left: '2%', width: "13%", height: '80vh'}}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="agenda" // Start with the week view
          views={['agenda']} // Allow switching between views
          style={{ height: '100%'}}
          min={new Date(today.getFullYear(), today.getMonth(), 27, 7, 0)}
        />
      </div>
      <div style={{position: 'absolute', right: '2%', width: "82%", height: '80vh'}}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week" // Start with the week view
          views={['day', 'week', 'month']} // Allow switching between views
          style={{ height: '100%' }}
          min={new Date(today.getFullYear(), today.getMonth(), 27, 7, 0)}
          max={new Date(today.getFullYear(), today.getMonth(), 27, 21, 0)}
        />
      </div>
    </div>
  );
};

export default MyCalendar;