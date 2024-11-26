import React, { createContext, useContext, useState, useEffect } from "react";

// Create the EventsContext
const EventsContext = createContext();

// Helper to load events from localStorage
export const loadEventsFromLocalStorage = () => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents
      ? JSON.parse(storedEvents).map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }))
      : [];
  };
// EventsProvider Component
export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState(loadEventsFromLocalStorage);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Remove an event by matching its unique properties
  const removeEvent = (eventToRemove) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter(
        (event) =>
          event.title !== eventToRemove.title ||
          event.start.toISOString() !== new Date(eventToRemove.start).toISOString() ||
          event.end.toISOString() !== new Date(eventToRemove.end).toISOString()
      );
      localStorage.setItem("events", JSON.stringify(updatedEvents)); // Update localStorage
      return updatedEvents;
    });
  };

  return (
    <EventsContext.Provider value={{ events, setEvents, removeEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

// Custom hook to use the EventsContext
export const useEvents = () => useContext(EventsContext);
