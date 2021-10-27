import React from 'react';

const RedLine = ({ style }) => {
  return (
    <div style={style} className='time-line'>
      <div className='time-line__circle'></div>
      <div className='time-line__line'></div>
    </div>
  );
};

export default RedLine;
