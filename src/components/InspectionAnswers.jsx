import React, { forwardRef } from 'react';

const InspectionAnswers = forwardRef(({ label }, ref) => {
  return (
    <div className='inspection-answers'>
      <h3>{label}</h3>
      <select ref={ref}>
        <option value='good'>Good</option>
        <option value='monitor'>Monitor</option>
        <option value='repair'>Repair</option>
        <option value='reject'>Reject</option>
      </select>
    </div>
  );
});

export default InspectionAnswers;
