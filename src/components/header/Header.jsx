import React, { useState } from 'react';
import './header.scss';
import { months } from '../../utils/dateUtils.js';
import Modal from '../modal/Modal.jsx';

const Header = ({
  weekDates,
  onNextWeek,
  onPrevWeek,
  onToday,
  onCreateEvent,
}) => {
  const [isHideModal, setHideModal] = useState(false);

  let displayedMonth;
  weekDates[0].getMonth() === weekDates[weekDates.length - 1].getMonth()
    ? (displayedMonth = months[weekDates[0].getMonth()])
    : (displayedMonth = `${months[weekDates[0].getMonth()]} - ${
        months[weekDates[weekDates.length - 1].getMonth()]
      }`);

  return (
    <>
      {!isHideModal ? null : (
        <Modal
          onCreateEvent={onCreateEvent}
          onCloseModal={() => setHideModal(false)}
        />
      )}

      <header className='header'>
        <button
          className='button create-event-btn'
          onClick={() => setHideModal(true)}
        >
          <i className='fas fa-plus create-event-btn__icon'></i>Create
        </button>

        <div className='navigation'>
          <button className='navigation__today-btn button' onClick={onToday}>
            Today
          </button>

          <button
            className='icon-button navigation__nav-icon'
            onClick={onPrevWeek}
          >
            <i className='fas fa-chevron-left'></i>
          </button>

          <button
            className='icon-button navigation__nav-icon'
            onClick={onNextWeek}
          >
            <i className='fas fa-chevron-right'></i>
          </button>

          <span className='navigation__displayed-month'>{displayedMonth}</span>
        </div>
      </header>
    </>
  );
};

export default Header;
