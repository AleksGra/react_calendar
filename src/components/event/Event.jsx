import React, { useState } from 'react';
import './event.scss';
import DeleteEvent from './DeleteEvent.jsx';

const Event = ({
  onDeleteEvent,
  eventId,
  height,
  marginTop,
  title,
  time,
  description,
}) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const [isShowModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!isShowModal);
  };

  return (
    <div style={eventStyle} className='event' onClick={toggleModal}>
      <div className='event__title'>{title}</div>
      <div className='event__time'>{time}</div>
      <div className='event__description'>{description}</div>

      {isShowModal && (
        <DeleteEvent onDeleteEvent={onDeleteEvent} eventId={eventId} />
      )}
    </div>
  );
};

export default Event;
