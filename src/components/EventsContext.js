import React, { createContext, useContext, useState } from "react";

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  // Initialize events as an empty array
  const [events, setEvents] = useState([]);

  const removeEvent = (eventToRemove) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter(
        (event) =>
          event.title !== eventToRemove.title ||
          event.start.toISOString() !== new Date(eventToRemove.start).toISOString() ||
          event.end.toISOString() !== new Date(eventToRemove.end).toISOString()
      );
      return updatedEvents;
    });
  };

  return (
    <EventsContext.Provider value={{ events, setEvents, removeEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
