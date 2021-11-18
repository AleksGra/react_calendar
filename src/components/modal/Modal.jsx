import React, { useState } from 'react';
import moment from 'moment';

import './modal.scss';

const Modal = ({ onCloseModal, onCreateEvent }) => {
  const CurrentDate = moment(new Date()).format('YYYY-MM-DD');
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: CurrentDate,
    startTime: '00:00',
    endTime: '00:00',
  });

  const { title, description, date, startTime, endTime } = eventData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData({ ...eventData, [name]: value });
  };
  return (
    <div className='modal overlay'>
      <div className='modal__content'>
        <div className='create-event'>
          <button className='create-event__close-btn' onClick={onCloseModal}>
            +
          </button>
          <form
            onSubmit={(e) => {
              onCreateEvent(e, eventData);
              onCloseModal();
            }}
            className='event-form'
          >
            <input
              type='text'
              name='title'
              placeholder='Title'
              className='event-form__field'
              onChange={handleChange}
              value={title}
            />
            <div className='event-form__time'>
              <input
                onChange={handleChange}
                value={date}
                type='date'
                name='date'
                className='event-form__field'
                onChange={handleChange}
                value={date}
              />
              <input
                type='time'
                name='startTime'
                className='event-form__field time__from'
                onChange={handleChange}
                value={startTime}
              />
              <span>-</span>
              <input
                onChange={handleChange}
                value={endTime}
                type='time'
                name='endTime'
                className='event-form__field time__to'
                onChange={handleChange}
                value={endTime}
              />
            </div>
            <textarea
              name='description'
              placeholder='Description'
              className='event-form__field'
              onChange={handleChange}
              value={description}
            ></textarea>
            <button type='submit' className='event-form__submit-btn'>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
