import React from 'react';

import DayListItem from "components/DayListItem";
import classnames from 'classnames';

export default function DayList(props) {
  const daysList = props.days.map(day => {
    return <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay} />
  })

  return <ul>{daysList}</ul>;
}