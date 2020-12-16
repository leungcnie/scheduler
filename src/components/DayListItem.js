import React from "react";

import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  const listClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = (spots) => {
    switch (spots) {
      case 0:
        return "no spots remaining";
      case 1:
        return "1 spot remaining";
      default:
        return `${spots} spots remaining`;
    }
  };

  return (
    <li
      className={listClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
