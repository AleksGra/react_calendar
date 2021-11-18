import React, { useState, useEffect } from 'react';
import './common.scss';
import Calendar from './components/calendar/Calendar.jsx';
import Header from './components/header/Header.jsx';
import { deleteEvent, fetchEvents, postEventData } from './gateway/events';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [eventsList, setEventsList] = useState([]);
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

  const getEventsList = () => {
    fetchEvents().then((response) => {
      const newEventsList = response.map((event) => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo),
      }));
      setEventsList(newEventsList);
    });
  };

  const createEvent = (e, eventData) => {
    e.preventDefault();
    const { date, description, endTime, startTime, title } = eventData;
    const newEvent = {
      title,
      description,
      dateFrom: new Date(`${date} ${startTime}`),
      dateTo: new Date(`${date} ${endTime}`),
    };

    postEventData(newEvent).then(() => getEventsList());
  };

  const handleDeleteEvent = (eventId) =>
    deleteEvent(eventId).then(() => {
      getEventsList();
    });

  useEffect(() => {
    getEventsList();
  }, []);

  return (
    <>
      <Header
        weekDates={weekDates}
        onToday={handleToday}
        onNextWeek={handleNextWeek}
        onPrevWeek={handlePrevWeek}
        onCreateEvent={createEvent}
      />
      <Calendar
        onDeleteEvent={handleDeleteEvent}
        events={eventsList}
        weekDates={weekDates}
      />
    </>
  );
};

export default App;
