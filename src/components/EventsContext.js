import React, { createContext, useContext, useState, useCallback } from "react";

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  // Memoize the fetchEvents function to avoid re-creating it on each render
  const fetchEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch("http://localhost:8000/exams/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.statusText}`);
      }

      const data = await response.json();

      const formattedEvents = data.map((exam) => ({
        id: exam.id,
        title: `${exam.name} (${exam.exam_type})`,
        start: new Date(`${exam.scheduled_date}T${exam.scheduled_time}`),
        end: new Date(`${exam.scheduled_date}T${exam.scheduled_time}`),
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }, []); // Empty dependency array means this function will be memoized and not recreated on every render

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
    <EventsContext.Provider value={{ events, setEvents, removeEvent, fetchEvents }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
