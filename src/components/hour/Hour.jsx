import React from 'react';
import RedLine from './RedLine.jsx';
import './hour.scss';

import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({
  onDeleteEvent,
  isCurrentHour,
  dataHour,
  hourEvents,
  weekDay,
}) => {
  return (
    <div className='calendar__time-slot' data-time={dataHour + 1}>
      {isCurrentHour && <RedLine />}

      {hourEvents.map(({ id, dateFrom, dateTo, title, description }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(
          dateFrom.getMinutes()
        )}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(
          dateTo.getMinutes()
        )}`;

        return (
          <Event
            onDeleteEvent={onDeleteEvent}
            key={id}
            eventId={id}
            weekDay={weekDay}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            description={description}
          />
        );
      })}
    </div>
  );
};

export default Hour;
