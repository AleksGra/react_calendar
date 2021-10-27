import React, { useState, useEffect } from 'react';
import './common.scss';
import Calendar from './components/calendar/Calendar.jsx';
import Header from './components/header/Header.jsx';
import { deleteEvent, createEvent, fetchEvents } from './gateway/events';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const handleToday = () => {
    setWeekStartDate(new Date());
  };

  const handleNextWeek = () => {
    setWeekStartDate(
      new Date(weekStartDate.setDate(weekStartDate.getDate() + 7))
    );
  };

  const handlePrevWeek = () => {
    setWeekStartDate(
      new Date(weekStartDate.setDate(weekStartDate.getDate() - 7))
    );
  };

  const eventsList = () => {
    fetchEvents().then((response) => {
      setEvents(
        response.map((el) => ({
          ...el,
          dateFrom: new Date(el.dateFrom),
          dateTo: new Date(el.dateTo),
        }))
      );
    });
  };

  const handleCreateEvent = (event) =>
    createEvent(event).then(() => {
      eventsList();
    });

  const handleDeleteEvent = (eventId) =>
    deleteEvent(eventId).then(() => {
      eventsList();
    });

  useEffect(() => {
    eventsList();
  }, []);

  return (
    <>
      <Header
        weekDates={weekDates}
        onToday={handleToday}
        onNextWeek={handleNextWeek}
        onPrevWeek={handlePrevWeek}
        onCreateEvent={handleCreateEvent}
      />
      <Calendar
        onDeleteEvent={handleDeleteEvent}
        events={events}
        weekDates={weekDates}
      />
    </>
  );
};

export default App;
