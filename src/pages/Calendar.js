import React from "react";
import Nav from "../components/Navbar";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useEvents } from "../components/EventsContext";
// import { materii_1_1 } from "../components/data";

import "../styles/calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Initialize the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const { events } = useEvents();

  // Reload events from local storage without refreshing the page
  // const reloadEvents = () => {
  //   const storedEvents = loadEventsFromLocalStorage();
  //   setEvents(storedEvents);
  // };

  // Clear local storage and refresh events
  const clearLocalStorage = () => {
    localStorage.clear();
    console.log("Local storage cleared!");
    // reloadEvents();
  };

  return (
    <div>
      <Nav />
      <div style={{ padding: "10px" }}>
        <button className="button-style"
          // onClick={reloadEvents}
        >
          Reimprospateaza Calendar
        </button>
        <button
          className="button-style"
          onClick={clearLocalStorage}
        >
          Curata Storage Local
        </button>
      </div>
      <div className="calendar-container-style ">
        <div className="agenda-style">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="agenda"
            views={["agenda"]}
            style={{ height: "100%" }}
            min={new Date(new Date().getFullYear(), new Date().getMonth(), 27, 7, 0)}
          />
        </div>
        <div className="week-style">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            views={["day", "week", "month"]}
            style={{ height: "100%" }}
            min={new Date(new Date().getFullYear(), new Date().getMonth(), 27, 7, 0)}
            max={new Date(new Date().getFullYear(), new Date().getMonth(), 27, 21, 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;