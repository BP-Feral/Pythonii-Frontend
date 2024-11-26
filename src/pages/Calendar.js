import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Nav from "../components/Navbar";
import "../styles/calendar.css";
import { useEvents, loadEventsFromLocalStorage } from "../components/EventsContext";

// Initialize the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const { events, setEvents } = useEvents();

  // Reload events from local storage without refreshing the page
  const reloadEvents = () => {
    const storedEvents = loadEventsFromLocalStorage();
    setEvents(storedEvents);
  };

  // Clear local storage and refresh events
  const clearLocalStorage = () => {
    localStorage.clear();
    console.log("Local storage cleared!");
    reloadEvents();
  };

  return (
    <div>
      <Nav />
      <div style={{ padding: "10px" }}>
        <button
          style={buttonStyle}
          onClick={reloadEvents}
        >
          Refresh Calendar
        </button>
        <button
          style={{ ...buttonStyle, marginLeft: "10px" }}
          onClick={clearLocalStorage}
        >
          Clear Local Storage
        </button>
      </div>
      <div style={calendarContainerStyle}>
        <div style={agendaStyle}>
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
        <div style={weekStyle}>
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

// Styling
const buttonStyle = {
  padding: "10px 15px",
  marginBottom: "10px",
  backgroundColor: "#192041",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const calendarContainerStyle = {
  height: "80vh",
  margin: "20px",
};

const agendaStyle = {
  position: "absolute",
  left: "2%",
  width: "13%",
  height: "80vh",
};

const weekStyle = {
  position: "absolute",
  right: "2%",
  width: "82%",
  height: "80vh",
};

export default CalendarView;
