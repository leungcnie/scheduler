// import React from 'react';

// import "components/InterviewerListItem.scss"
// import classnames from 'classnames';

// export default function InterviewListItem(props) {
//   const listClass = classnames("interviewers__item", {
//     "interviewers__item--selected": props.selected
//   });

//   return (
//     <li className={listClass} onClick={() => props.setInterviewer(props.name)}>
//       <img
//         className="interviewers__item-image"
//         src={props.avatar}
//         alt={props.name}
//       />
//       {props.selected && props.name}
//     </li>
//   );
// };

import React, { useState } from 'react';

import "components/InterviewerListItem.scss"
import classnames from 'classnames';

export default function InterviewListItem(props) {
  const [selected, setSelected] = useState(props.selected);

  const listClass = classnames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  const selectInterviewer = () => {
    props.setInterviewer(props.id);
    setSelected(true);
  }

  return (
    <li className={listClass} onClick={selectInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {selected && props.name}
    </li>
  );
};