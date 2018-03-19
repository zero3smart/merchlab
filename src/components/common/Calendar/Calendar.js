import React from 'react';
// import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';

import './Calendar.scss';
import 'rc-calendar/assets/index.css';

export default function Calendar(props) {
  return(
    <RangeCalendar
      onChange={(e) => props.onChange(e)} />
  );
}